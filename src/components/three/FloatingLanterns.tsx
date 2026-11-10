import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternProps {
  position: [number, number, number];
  color?: string;
  lightColor?: string;
  speed?: number;
  scale?: number;
  phase?: number;
}

function Lantern({
  position,
  color = '#C0392B',
  lightColor = '#FFA000',
  speed = 1.2,
  scale = 0.5,
  phase = 0,
}: LanternProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed + phase;

    // Bobbing up and down gently
    groupRef.current.position.y = initialY + Math.sin(t) * 0.15;

    // Gentle swaying pendulum motion
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.08;
    groupRef.current.rotation.x = Math.cos(t * 0.7) * 0.05;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Top hanger ring */}
      <mesh position={[0, 1.4, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Top wooden cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.12, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>

      {/* Lantern Main Body (Ribbed Paper Lantern) */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Decorative Gold Rings */}
      <mesh position={[0, 0.5, 0]} scale={[1.02, 0.3, 1.02]}>
        <torusGeometry args={[0.85, 0.03, 8, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Bottom wooden cap */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.45, 0.35, 0.12, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>

      {/* Hanging Silk Tassel */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.16, 0.8, 12]} />
        <meshStandardMaterial color="#FFA000" roughness={0.5} />
      </mesh>

      {/* Soft internal glowing pointlight */}
      <pointLight color={lightColor} intensity={1.8} distance={6} decay={2} />
    </group>
  );
}

export function FloatingLanterns() {
  return (
    <group>
      <Lantern position={[-4.5, 2.5, -3]} color="#C0392B" lightColor="#FF7043" speed={0.9} scale={0.42} phase={0.5} />
      <Lantern position={[4.2, 3.2, -4]} color="#E5A93C" lightColor="#FFA000" speed={0.8} scale={0.48} phase={1.8} />
      <Lantern position={[-3.8, -1.8, -2.5]} color="#D32F2F" lightColor="#FF8A65" speed={1.1} scale={0.35} phase={3.2} />
      <Lantern position={[4.6, -1.2, -3.5]} color="#E5A93C" lightColor="#FFD54F" speed={0.75} scale={0.38} phase={2.4} />
    </group>
  );
}
