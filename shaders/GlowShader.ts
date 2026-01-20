export const GlowShader = {
    uniforms: {
        glowColor: { value: null },
        c: { value: 1.0 },
        p: { value: 1.4 }
    },
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vNormal = normalize( normalMatrix * normal );
            vPosition = vec3( modelViewMatrix * vec4( position, 1.0 ) );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vec3 viewDir = normalize( -vPosition );
            float intensity = pow( c - dot(vNormal, viewDir), p );
            gl_FragColor = vec4( glowColor * intensity, 1.0 );
        }
    `
};
