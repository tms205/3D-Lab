import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RealisticPiaCake } from './RealisticPiaCake';
import { ParticleDust } from './ParticleDust';

interface DiyCakeBuilder3DProps {
  crustColor: string;
  fillingColor: string;
  coreColor: string;
  stampText: string;
  isCutaway: boolean;
  isExploded: boolean;
}

export function DiyCakeBuilder3D({
  crustColor,
  fillingColor,
  coreColor,
  stampText,
  isCutaway,
  isExploded,
}: DiyCakeBuilder3DProps) {
  const pedestalRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (pedestalRef.current) {
      pedestalRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 3D Cake with current customized specs */}
      <RealisticPiaCake
        crustColor={crustColor}
        fillingColor={fillingColor}
        coreColor={coreColor}
        stampText={stampText}
        isCutaway={isCutaway}
        isExploded={isExploded}
        scale={1.15}
        autoRotate={false}
      />

      {/* Floating Laboratory Measurement Rings & Pedestal */}
      <group ref={pedestalRef} position={[0, -1.0, 0]}>
        {/* Main circular marble & gold pedestal */}
        <mesh receiveShadow position={[0, -0.1, 0]}>
          <cylinderGeometry args={[2.2, 2.4, 0.2, 48]} />
          <meshStandardMaterial
            color="#221812"
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Outer Gold Trim Ring */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.1, 2.25, 48]} />
          <meshStandardMaterial
            color="#E5A93C"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Inner Lab Radial Degree Markings */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.74, 36]} />
          <meshBasicMaterial
            color="#F7CE78"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Floating golden measurement dots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 1.95;
          const z = Math.sin(angle) * 1.95;
          return (
            <mesh key={i} position={[x, 0.05, z]}>
              <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
              <meshStandardMaterial
                color="#FFA000"
                emissive="#FFA000"
                emissiveIntensity={0.6}
              />
            </mesh>
          );
        })}
      </group>

      {/* Ambient Flour and Gold Dust Particles */}
      <ParticleDust count={70} color="#F7CE78" spread={8} speed={0.2} />
    </group>
  );
}
