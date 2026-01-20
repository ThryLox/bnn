export const GlowShader = {
    uniforms: {
        glowColor: { value: null },
        viewVector: { value: null },
        c: { value: 1.0 },
        p: { value: 1.4 }
    },
    vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
    `
};
