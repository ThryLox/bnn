"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useGLTF, Center } from '@react-three/drei';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from 'three';

// === THEME CONFIGURATION ===
const THEMES = {
    indigo: {
        primary: "#3730a3",
        secondary: "#1e1b4b",
        accent: "#818cf8",
        nebula1: "#1e1b4b",
        nebula2: "#4f46e5",
        nebula3: "#818cf8",
        bg1: "#0a0a1a",
        bg2: "#1e1b4b"
    },
    cyan: {
        primary: "#0891b2", // Cyan-600
        secondary: "#164e63", // Cyan-900
        accent: "#22d3ee", // Cyan-400
        nebula1: "#083344", // Cyan-950
        nebula2: "#06b6d4", // Cyan-500
        nebula3: "#67e8f9", // Cyan-300
        bg1: "#020617", // Slate-950
        bg2: "#0e7490"  // Cyan-700
    },
    purple: {
        primary: "#7c3aed", // Violet-600
        secondary: "#4c1d95", // Violet-900
        accent: "#a78bfa", // Violet-400
        nebula1: "#2e1065", // Violet-950
        nebula2: "#8b5cf6", // Violet-500
        nebula3: "#c4b5fd", // Violet-300
        bg1: "#0f0518", // Deep Purple Black
        bg2: "#581c87"  // Purple-900
    }
};

const ACTIVE_THEME = THEMES.purple; // Switch to 'indigo' or 'cyan' to revert

function BackgroundGradient() {
    const gradientMaterial = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const gradient = ctx.createLinearGradient(0, 0, 0, 128);
        gradient.addColorStop(0, ACTIVE_THEME.bg1);
        gradient.addColorStop(1, ACTIVE_THEME.bg2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        const tex = new THREE.CanvasTexture(canvas);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        return new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide });
    }, []);

    if (!gradientMaterial) return null;

    return (
        <mesh scale={[80, 80, 1]} position={[0, 0, -10]}>
            <planeGeometry args={[1, 1]} />
            <primitive object={gradientMaterial} />
        </mesh>
    );
}

function Nebula() {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(ACTIVE_THEME.nebula1) },
        uColor2: { value: new THREE.Color(ACTIVE_THEME.nebula2) },
        uColor3: { value: new THREE.Color(ACTIVE_THEME.nebula3) },
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05; // Rotate the whole nebula slowly
        }
    });

    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying vec3 vPos;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            // Use UVs for noise but scale them to wrap better on sphere
            // Ideally we'd use 3D noise, but 2D on UVs is okay for a nebulous look
            float noise1 = snoise(vUv * 6.0 + uTime * 0.05);
            float noise2 = snoise(vUv * 12.0 - uTime * 0.1);
            float combinedNoise = (noise1 + noise2 * 0.5) * 0.5 + 0.5;

            // Color mixing
            vec3 color = mix(uColor1, uColor2, combinedNoise);
            color = mix(color, uColor3, noise2);

            float edgeFade = smoothstep(0.0, 0.8, length(vUv - 0.5) * 2.0);
            float alpha = combinedNoise * 0.15 * (1.0 - edgeFade);

            gl_FragColor = vec4(color, alpha);
        }
    `;

    return (
        <mesh ref={meshRef} scale={[50, 50, 50]}>
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                side={THREE.BackSide} // Render on the inside of the sphere
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

function Starfield() {
    const count = 1600;
    const radius = 60;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = radius * Math.pow(Math.random(), 0.6); // cluster near center
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    const texture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
            context.beginPath();
            context.arc(16, 16, 14, 0, 2 * Math.PI);
            context.fillStyle = 'white';
            context.fill();
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    const matRef = useRef<THREE.PointsMaterial>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (matRef.current)
            matRef.current.size =
                0.2 + 0.1 * Math.sin(state.clock.elapsedTime * 2.0); // twinkle
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0008;
            groupRef.current.rotation.x += 0.0003;
        }
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={positions.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    ref={matRef}
                    map={texture}
                    color={ACTIVE_THEME.accent}
                    size={0.25}
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    sizeAttenuation
                    alphaTest={0.1}
                />
            </points>
        </group>
    );
}

function BrainModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/brain.glb');
    const [targets, setTargets] = useState<THREE.Mesh[]>([]);
    const { viewport } = useThree();

    // Responsive settings
    const isMobile = viewport.width < 5; // Threshold for mobile
    const scale = isMobile ? 14 : 22; // Smaller on mobile, slightly smaller than before on desktop (was 28)
    const positionY = isMobile ? 0.2 : 0.5; // Adjust height for mobile

    useEffect(() => {
        // Collect targets first to avoid infinite recursion during traversal
        const foundTargets: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                // Skip our custom added meshes to prevent re-processing
                if (child.name === "Subsurface" || child.name === "OcclusionCore") return;
                foundTargets.push(child as THREE.Mesh);
            }
        });
        setTargets(foundTargets);

        foundTargets.forEach((mesh) => {
            // Cleanup
            const oldSubsurface = mesh.getObjectByName("Subsurface");
            if (oldSubsurface) mesh.remove(oldSubsurface);
            const oldOcclusion = mesh.getObjectByName("OcclusionCore");
            if (oldOcclusion) mesh.remove(oldOcclusion);

            // === 1. Glassy Main Body (No Wireframe) ===
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: ACTIVE_THEME.primary,
                emissive: ACTIVE_THEME.secondary,
                emissiveIntensity: 0.2,
                transmission: 1.0,
                thickness: 0.6,
                roughness: 0.1,
                metalness: 0.2,
                envMapIntensity: 2.0,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
                transparent: true,
                opacity: 0.95,
                ior: 1.4,
                sheen: 1.0,
                sheenColor: new THREE.Color(ACTIVE_THEME.accent),
            });
            mesh.material = glassMat;

            // === 3. Occlusion Core (Blocks stars) ===
            const occlusion = new THREE.Mesh(
                mesh.geometry,
                new THREE.MeshStandardMaterial({
                    color: ACTIVE_THEME.secondary,
                    roughness: 0.3,
                    metalness: 0.1,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.FrontSide,
                })
            );
            occlusion.name = "OcclusionCore";
            occlusion.scale.setScalar(0.98); // Increased from 0.92 to close the gap
            mesh.add(occlusion);
        });
    }, [scene]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.02;
        }

        // Neural Light Flow (animated rim glow)
        const t = state.clock.elapsedTime;
        targets.forEach((mesh) => {
            if (mesh.material && (mesh.material as THREE.MeshPhysicalMaterial).emissive) {
                const mat = mesh.material as THREE.MeshPhysicalMaterial;
                // Pulse the glass itself
                mat.emissiveIntensity = 0.2 + Math.sin(t * 2.0) * 0.1;
                // Subtle color shift
                mat.color.setHSL(0.65 + Math.sin(t * 0.3) * 0.02, 0.6, 0.4);
            }
        });
    });

    return (
        <group ref={groupRef} position={[0, positionY, 0]}>
            <Center>
                <primitive object={scene} scale={[scale, scale * 0.7, scale * 0.9]} />
            </Center>
        </group>
    );
}

export default function BrainScene() {
    return (
        <div className="w-full h-screen absolute top-0 left-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{
                    antialias: false, // Post-processing handles AA or prefers it off
                    alpha: false,     // Opaque canvas prevents CSS blending/flickering
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
            >
                <fog attach="fog" args={[ACTIVE_THEME.bg1, 5, 15]} />

                {/* === Balanced Lighting Rig === */}
                <ambientLight intensity={0.5} color={ACTIVE_THEME.accent} />

                {/* Key Light (Right) */}
                <directionalLight position={[6, 3, 8]} intensity={1.6} color={ACTIVE_THEME.accent} />

                {/* Rim Light (Back Left) */}
                <directionalLight position={[-6, 0, -8]} intensity={1.2} color={ACTIVE_THEME.primary} />

                {/* Fill Light (Bottom Front — brightens lower folds) */}
                <pointLight position={[0, -3, 3]} intensity={2.0} color={ACTIVE_THEME.secondary} />

                {/* Accent Light (Soft glow from front center) */}
                <pointLight position={[0, 1, 2]} intensity={0.6} color={ACTIVE_THEME.accent} />

                <BackgroundGradient />
                <Nebula />
                <BrainModel />
                <Starfield />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
            </Canvas>
        </div>
    );
}
