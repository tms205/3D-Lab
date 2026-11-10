import { RealisticPiaCake } from './RealisticPiaCake';

interface DiyCakeBuilder3DProps {
  crustColor: string;
  fillingColor: string;
  coreColor: string;
  stampText: string;
  isCutaway: boolean;
  isExploded: boolean;
  separationFactor?: number;
}

export function DiyCakeBuilder3D({
  crustColor,
  fillingColor,
  coreColor,
  stampText,
  isCutaway,
  isExploded,
  separationFactor = 1.5,
}: DiyCakeBuilder3DProps) {
  return (
    <group position={[0, 0.05, 0]}>
      {/* 3D Realistic Cake with current customized specs */}
      <RealisticPiaCake
        crustColor={crustColor}
        fillingColor={fillingColor}
        coreColor={coreColor}
        stampText={stampText}
        isCutaway={isCutaway}
        isExploded={isExploded}
        separationFactor={separationFactor}
        scale={isExploded ? 0.90 : 1.12}
        autoRotate={false}
      />
    </group>
  );
}
