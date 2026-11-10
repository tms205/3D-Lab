import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function MoonAtmosphere({ position = [5, 4.5, -8], size = 2.4 }: { position?: [number, number, number]; size?: number }) {
  const moonRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Generate procedural canvas texture for lunar craters
  const moonTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Base lunar ivory gradient
    const grad = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
    grad.addColorStop(0, '#FFFDF8');
    grad.addColorStop(0.6, '#F8E9C9');
    grad.addColorStop(1, '#E4C389');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle craters
    ctx.fillStyle = 'rgba(180, 140, 90, 0.15)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 45 + 10;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  useFrame(({ clock }) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
    if (glowRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 1.5) * 0.05 + 1;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position}>
      {/* Harvest Moon Sphere */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial
          map={moonTexture || undefined}
          color="#FFF8E7"
          emissive="#FFE39F"
          emissiveIntensity={0.65}
          roughness={0.9}
        />
      </mesh>

      {/* Atmospheric Moon Glow Halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.15, 32, 32]} />
        <meshBasicMaterial
          color="#FFE082"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Large outer soft glow */}
      <mesh>
        <sphereGeometry args={[size * 1.45, 24, 24]} />
        <meshBasicMaterial
          color="#FFCA28"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Moon radiance directional light */}
      <directionalLight
        color="#FFF1C5"
        intensity={1.2}
        position={[-1, -1, 1]}
      />
    </group>
  );
}
