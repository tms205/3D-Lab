import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleDustProps {
  count?: number;
  color?: string;
  spread?: number;
  speed?: number;
}

export function ParticleDust({
  count = 120,
  color = '#F7CE78',
  spread = 12,
  speed = 0.3,
}: ParticleDustProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.8);

      scl[i] = Math.random() * 0.08 + 0.02;
      spd[i] = (Math.random() * 0.5 + 0.5) * speed;
    }

    return [pos, scl, spd];
  }, [count, spread, speed]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle upwards floating drift with sine sway
      array[i * 3 + 1] += speeds[i] * delta * 0.4;
      array[i * 3 + 0] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;

      // Wrap around vertically
      if (array[i * 3 + 1] > spread / 2) {
        array[i * 3 + 1] = -spread / 2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
