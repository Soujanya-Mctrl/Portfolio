declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                meshLineGeometry: any;
                meshLineMaterial: any;
                mesh: any;
                ambientLight: any;
                group: any;
                meshPhysicalMaterial: any;
                primitive: any;
                pointLight: any;
                spotLight: any;
            }
        }
    }
}

declare module 'meshline';
declare module '*.glb';
declare module '*.png';
