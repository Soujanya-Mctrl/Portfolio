"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere"; // simplified for now
  fieldStrength?: number;
}

function Particles({
  count = 300,
  magnetRadius = 6,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 0.5,
  lerpSpeed = 0.05,
  color = "#e2e2e4",
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: AntigravityProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { mouse, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initial positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = ringRadius + (Math.random() - 0.5) * particleVariance;
      const x = Math.cos(t) * r;
      const y = (Math.random() - 0.5) * 5; // vertical spread
      const z = Math.sin(t) * r * depthFactor;
      temp.push({ x, y, z, originalX: x, originalY: y, originalZ: z, phase: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, [count, ringRadius, particleVariance, depthFactor]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    
    // Mouse interaction (convert normalized mouse to world space roughly)
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      let { x, y, z, originalX, originalY, originalZ, phase } = particle;

      // Wave animation
      if (autoAnimate) {
        y = originalY + Math.sin(time * waveSpeed + phase) * waveAmplitude;
      }
      
      // Magnet/Field effect
      const dx = mouseX - x;
      const dy = mouseY - y;
      // dz is ignored for 2D mouse interaction, assuming mouse is at z=0 plane
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < magnetRadius) {
        const force = (magnetRadius - dist) / magnetRadius;
        const angle = Math.atan2(dy, dx);
        
        // Push away or pull towards? "Antigravity" implies push or float?
        // Let's make it repel slightly or float around cursor
        x += Math.cos(angle) * force * fieldStrength * 0.01;
        y += Math.sin(angle) * force * fieldStrength * 0.01;
      }

      // Rotation around center
      if (rotationSpeed !== 0) {
          const cos = Math.cos(rotationSpeed * 0.01);
          const sin = Math.sin(rotationSpeed * 0.01);
          const nx = x * cos - z * sin;
          const nz = x * sin + z * cos;
          x = nx;
          z = nz;
      }

      // Update particle position
      particle.x = THREE.MathUtils.lerp(particle.x, x, lerpSpeed);
      particle.y = THREE.MathUtils.lerp(particle.y, y, lerpSpeed);
      particle.z = THREE.MathUtils.lerp(particle.z, z, lerpSpeed);

      dummy.position.set(particle.x, particle.y, particle.z);
      
      // Scale based on particleSize
      dummy.scale.set(particleSize, particleSize, particleSize);
      
      // Rotate capsule to look interesting?
      dummy.rotation.x = Math.sin(time + phase) * 0.5;
      dummy.rotation.y = Math.cos(time + phase) * 0.5;

      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      {particleShape === "capsule" ? (
         <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
      ) : (
         <sphereGeometry args={[0.2, 16, 16]} />
      )}
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
    </instancedMesh>
  );
}

export default function Antigravity(props: AntigravityProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles {...props} />
      </Canvas>
    </div>
  );
}
