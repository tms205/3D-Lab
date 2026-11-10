import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface PiaCakeProps {
  crustColor?: string;
  fillingColor?: string;
  coreColor?: string;
  stampText?: string;
  isCutaway?: boolean;
  isExploded?: boolean;
  scale?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  onHover?: (hovered: boolean) => void;
}

export function RealisticPiaCake({
  crustColor = '#E5A93C',
  fillingColor = '#D4AC0D',
  coreColor = '#FF6F00',
  stampText = '福',
  isCutaway = false,
  isExploded = false,
  scale = 1.0,
  autoRotate = true,
  interactive = true,
  onHover,
}: PiaCakeProps) {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });

  // Generate procedural texture for the top red traditional stamp
  const stampTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, 512, 512);

    // Outer double circle stamp ring in vermilion red
    ctx.strokeStyle = '#B71C1C';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 200, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(256, 256, 175, 0, Math.PI * 2);
    ctx.stroke();

    // Chinese/Vietnamese traditional stamp character
    ctx.fillStyle = '#B71C1C';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 150px "Cinzel", "Playfair Display", "Times New Roman", serif';
    ctx.fillText(stampText, 256, 256);

    // Decorative dots
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const x = 256 + Math.cos(angle) * 188;
      const y = 256 + Math.sin(angle) * 188;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }, [stampText]);

  // Procedural bump map for flaky crust texture
  const flakyCrustBump = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);

    // Horizontal layered rings
    for (let y = 0; y < 256; y += 8) {
      const val = Math.floor(128 + (Math.sin(y * 0.4) * 40));
      ctx.fillStyle = `rgb(${val},${val},${val})`;
      ctx.fillRect(0, y, 256, 4);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 4);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!cakeGroupRef.current) return;

    // Levitation floating effect
    const t = state.clock.getElapsedTime();
    cakeGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08;

    // Auto slow rotation if enabled
    if (autoRotate && !isExploded) {
      cakeGroupRef.current.rotation.y += delta * 0.35;
    }

    // Interactive mouse damping
    if (interactive) {
      pointerTarget.current.x = state.pointer.x * 0.45;
      pointerTarget.current.y = -state.pointer.y * 0.3;

      cakeGroupRef.current.rotation.x = THREE.MathUtils.damp(
        cakeGroupRef.current.rotation.x,
        pointerTarget.current.y + 0.35, // default viewing tilt down
        4,
        delta
      );
    }

    // Molten core pulsing glow
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.03;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      ref={cakeGroupRef}
      scale={scale}
      onPointerOver={() => onHover?.(true)}
      onPointerOut={() => onHover?.(false)}
    >
      {/* 
        WHOLE CAKE OR CUTAWAY BACK HALF
      */}
      {!isCutaway ? (
        // Complete Intact Bánh Pía
        <group>
          {/* Main Rounded Cake Body */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.45, 0.9, 48, 12]} />
            <meshStandardMaterial
              color={crustColor}
              roughness={0.48}
              metalness={0.12}
              bumpMap={flakyCrustBump || undefined}
              bumpScale={0.03}
            />
          </mesh>

          {/* Domed Top Crust */}
          <mesh castShadow position={[0, 0.45, 0]}>
            <sphereGeometry args={[1.5, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
            <meshStandardMaterial
              color={crustColor}
              roughness={0.42}
              metalness={0.15}
            />
          </mesh>

          {/* Bottom Rounded Base */}
          <mesh receiveShadow position={[0, -0.45, 0]}>
            <sphereGeometry args={[1.45, 36, 16, 0, Math.PI * 2, Math.PI * 0.7, Math.PI * 0.3]} />
            <meshStandardMaterial
              color={crustColor}
              roughness={0.6}
              metalness={0.05}
            />
          </mesh>

          {/* Top Traditional Red Seal Stamp */}
          <mesh position={[0, 0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.2, 1.2]} />
            <meshStandardMaterial
              map={stampTexture || undefined}
              transparent
              opacity={0.88}
              roughness={0.3}
              depthWrite={false}
            />
          </mesh>

          {/* Toasted Golden Egg Wash Center Highlight */}
          <mesh position={[0, 0.74, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.1, 32]} />
            <meshBasicMaterial
              color="#A0522D"
              transparent
              opacity={0.18}
              blending={THREE.MultiplyBlending}
            />
          </mesh>
        </group>
      ) : (
        // CUTAWAY CROSS-SECTION VIEW (Showing internal culinary architecture!)
        <group>
          {/* Back half: Outer crust */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.45, 0.9, 36, 8, false, Math.PI, Math.PI]} />
            <meshStandardMaterial
              color={crustColor}
              roughness={0.5}
              bumpMap={flakyCrustBump || undefined}
              bumpScale={0.03}
            />
          </mesh>

          {/* Back half: Top dome */}
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[1.5, 36, 16, Math.PI, Math.PI, 0, Math.PI * 0.3]} />
            <meshStandardMaterial color={crustColor} roughness={0.45} />
          </mesh>

          {/* Cross-section cut surface (Flat exposed face) */}
          {/* Layer 1: Outer Flaky Pastry Border */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.0, 0.9, 0.05]} />
            <meshStandardMaterial
              color={crustColor}
              roughness={0.7}
              bumpMap={flakyCrustBump || undefined}
              bumpScale={0.08}
            />
          </mesh>

          {/* Layer 2: Velvety Filling Core (Durian / Taro / Matcha paste) */}
          <mesh
            position={[0, 0, isExploded ? 0.4 : 0.02]}
            castShadow
          >
            <cylinderGeometry args={[1.32, 1.3, 0.78, 32, 4, false, Math.PI, Math.PI]} />
            <meshStandardMaterial
              color={fillingColor}
              roughness={0.35}
              metalness={0.08}
            />
          </mesh>

          {/* Layer 3: Central Molten Golden Yolk / Lava Core */}
          <mesh
            ref={coreRef}
            position={[0, 0, isExploded ? 0.8 : 0.06]}
            castShadow
          >
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial
              color={coreColor}
              emissive={coreColor}
              emissiveIntensity={0.65}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>

          {/* Dripping Lava Liquid Beads */}
          <mesh position={[0, -0.32, isExploded ? 0.8 : 0.08]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color={coreColor}
              emissive={coreColor}
              emissiveIntensity={0.7}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0.22, -0.42, isExploded ? 0.8 : 0.08]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={coreColor}
              emissive={coreColor}
              emissiveIntensity={0.7}
              roughness={0.15}
            />
          </mesh>

          {/* Cutaway front half pushed forward when exploded */}
          {isExploded && (
            <group position={[0, 0, 1.2]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.45, 0.9, 36, 8, false, 0, Math.PI]} />
                <meshStandardMaterial
                  color={crustColor}
                  roughness={0.5}
                  wireframe
                />
              </mesh>
            </group>
          )}

          {/* Half Stamp on remaining back dome */}
          <mesh position={[0, 0.75, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.2, 0.6]} />
            <meshStandardMaterial
              map={stampTexture || undefined}
              transparent
              opacity={0.9}
              roughness={0.3}
            />
          </mesh>
        </group>
      )}

      {/* Warm Point Light radiating from the cake */}
      <pointLight
        color={coreColor}
        intensity={0.8}
        distance={3.5}
        decay={2}
        position={[0, 0.2, 0.5]}
      />
    </group>
  );
}
