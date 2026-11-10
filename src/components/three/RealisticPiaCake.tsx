import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  getArtisanStampTexture,
  getTraditionalEmbossTexture,
} from '@/utils/cakeTextures';

export interface PiaCakeProps {
  crustColor?: string;
  fillingColor?: string;
  coreColor?: string;
  stampText?: string;
  cakeType?: 'pia' | 'traditional';
  isCutaway?: boolean;
  isExploded?: boolean;
  separationFactor?: number;
  scale?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  onHover?: (hovered: boolean) => void;
}

export function RealisticPiaCake({
  crustColor = '#E5A93C',
  fillingColor = '#E0A82E',
  coreColor = '#FF5722',
  stampText = '福',
  cakeType = 'pia',
  isCutaway = false,
  isExploded = false,
  separationFactor = 1.5,
  scale = 1.0,
  autoRotate = true,
  interactive = true,
  onHover,
}: PiaCakeProps) {
  const rootGroupRef = useRef<THREE.Group>(null);

  // 4 Exploded View Tier Refs (Từ trên xuống dưới theo đúng yêu cầu)
  const tier1WireframeRef = useRef<THREE.Group>(null); // Tầng 1: Lưới toàn bánh
  const tier2CrustRef = useRef<THREE.Group>(null);     // Tầng 2: Vỏ bánh
  const tier3PasteRef = useRef<THREE.Group>(null);     // Tầng 3: Thịt bánh
  const tier4CoreRef = useRef<THREE.Group>(null);      // Tầng 4: Nhân bánh

  const pointerTarget = useRef({ x: 0, y: 0 });
  const sep = Math.max(0.6, Math.min(2.5, separationFactor));
  const cakeScale = isExploded ? Math.min(scale, 0.88 / sep) : scale;

  // ---------------------------------------------------------------------
  // 1. ORGANIC PROPORTIONAL PROFILE (BÁNH PÍA TRÒN DẸT HOÀNG KIM)
  // ---------------------------------------------------------------------
  const {
    outerProfilePoints,
    innerFillingPoints,
    crustThicknessBorderShape,
    fillingCutShape,
  } = useMemo(() => {
    // Outer Shell Profile (Lathe X = radius, Y = height)
    // Dáng bánh tròn dẹt, eo cong mềm mại, đỉnh nắp vòm êm, đáy phẳng tự nhiên
    const rawOuter = [
      new THREE.Vector2(0.001, -0.38), // Tâm đáy phẳng
      new THREE.Vector2(1.05, -0.38),  // Độ rộng đáy
      new THREE.Vector2(1.36, -0.33),  // Góc bo dưới
      new THREE.Vector2(1.54, -0.15),  // Má dưới
      new THREE.Vector2(1.60, 0.05),   // Vòng eo phồng đẫy đà
      new THREE.Vector2(1.52, 0.25),   // Thu nhẹ lên vai
      new THREE.Vector2(1.32, 0.38),   // Vai bánh cong mềm
      new THREE.Vector2(0.85, 0.47),   // Nắp vòm êm ái
      new THREE.Vector2(0.001, 0.50),  // Đỉnh trung tâm
    ];
    const outerCurve = new THREE.SplineCurve(rawOuter);
    const outerProfile = outerCurve.getPoints(48);

    // Inner Filling Profile (~65% thể tích, vỏ dày ~12%)
    const rawInner = [
      new THREE.Vector2(0.001, -0.30),
      new THREE.Vector2(0.90, -0.30),
      new THREE.Vector2(1.20, -0.26),
      new THREE.Vector2(1.36, -0.12),
      new THREE.Vector2(1.40, 0.04),
      new THREE.Vector2(1.34, 0.20),
      new THREE.Vector2(1.18, 0.31),
      new THREE.Vector2(0.72, 0.39),
      new THREE.Vector2(0.001, 0.41),
    ];
    const innerCurve = new THREE.SplineCurve(rawInner);
    const innerProfile = innerCurve.getPoints(36);

    // 2D Shapes trên mặt phẳng XY cho mặt cắt:
    // Hình thịt bánh (nhân)
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, innerProfile[0].y);
    for (let i = 0; i < innerProfile.length; i++) {
      innerShape.lineTo(innerProfile[i].x, innerProfile[i].y);
    }
    for (let i = innerProfile.length - 1; i >= 0; i--) {
      innerShape.lineTo(-innerProfile[i].x, innerProfile[i].y);
    }
    innerShape.closePath();

    // Hình viền vỏ bánh (vỏ ngoài có lỗ rỗng nhân)
    const borderShape = new THREE.Shape();
    borderShape.moveTo(0, outerProfile[0].y);
    for (let i = 0; i < outerProfile.length; i++) {
      borderShape.lineTo(outerProfile[i].x, outerProfile[i].y);
    }
    for (let i = outerProfile.length - 1; i >= 0; i--) {
      borderShape.lineTo(-outerProfile[i].x, outerProfile[i].y);
    }
    borderShape.closePath();

    // Lỗ rỗng cho khối thịt bánh
    const holePath = new THREE.Path();
    holePath.moveTo(0, innerProfile[0].y);
    for (let i = 0; i < innerProfile.length; i++) {
      holePath.lineTo(innerProfile[i].x, innerProfile[i].y);
    }
    for (let i = innerProfile.length - 1; i >= 0; i--) {
      holePath.lineTo(-innerProfile[i].x, innerProfile[i].y);
    }
    holePath.closePath();
    borderShape.holes.push(holePath);

    return {
      outerProfilePoints: outerProfile,
      innerFillingPoints: innerProfile,
      crustThicknessBorderShape: borderShape,
      fillingCutShape: innerShape,
    };
  }, []);

  // ---------------------------------------------------------------------
  // 2. TEXTURES
  // ---------------------------------------------------------------------
  const stampTexture = useMemo(() => getArtisanStampTexture(stampText), [stampText]);
  const embossTexture = useMemo(() => getTraditionalEmbossTexture(), []);

  // ---------------------------------------------------------------------
  // 3. PBR MATERIALS
  // ---------------------------------------------------------------------
  // Tầng 1: Lưới vàng kim Hologram phát quang
  const wireframeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#F59E0B',
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      emissive: '#D97706',
      emissiveIntensity: 0.5,
      roughness: 0.25,
    });
  }, []);

  // Tầng 2: Vỏ nướng quét lòng đỏ bóng bẩy
  const crustMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: crustColor,
      roughness: 0.32,
      metalness: 0.03,
      clearcoat: 0.65,
      clearcoatRoughness: 0.22,
      sheen: 0.35,
      sheenColor: new THREE.Color('#FFF8E7'),
      side: THREE.DoubleSide,
    });
  }, [crustColor]);

  // Tầng 3: Thịt bánh sên mịn dẻo
  const fillingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: fillingColor,
      roughness: 0.45,
      metalness: 0.02,
      clearcoat: 0.25,
      clearcoatRoughness: 0.30,
      side: THREE.DoubleSide,
    });
  }, [fillingColor]);

  // ---------------------------------------------------------------------
  // 4. ANIMATION FRAME LOOP
  // ---------------------------------------------------------------------
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Gentle levitation floating
    rootGroupRef.current.position.y = Math.sin(t * 1.4) * 0.045;

    // Căn mặt cắt về phía camera ban đầu khi chuyển chế độ.
    if (isCutaway) {
      rootGroupRef.current.rotation.y = 0;
    } else if (autoRotate && !isExploded) {
      rootGroupRef.current.rotation.y += delta * 0.28;
    }

    // Giảm độ nghiêng khi tách lớp để nhìn thấy tầng nhân và lõi bên dưới.
    if (isExploded || interactive) {
      pointerTarget.current.x = state.pointer.x * 0.42;
      pointerTarget.current.y = -state.pointer.y * 0.26;

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        isExploded ? -0.35 : pointerTarget.current.y + 0.32,
        4.0,
        delta
      );
    }

    // Tầng 1: Lưới toàn bánh (Cao nhất)
    if (tier1WireframeRef.current) {
      const targetY = isExploded ? 1.40 * sep : 0;
      tier1WireframeRef.current.position.y = THREE.MathUtils.damp(
        tier1WireframeRef.current.position.y,
        targetY,
        5.0,
        delta
      );
      if (isExploded) {
        tier1WireframeRef.current.rotation.y += delta * 0.25;
      }
    }

    // Tầng 2: Vỏ bánh
    if (tier2CrustRef.current) {
      const targetY = isExploded ? 0.48 * sep : 0;
      tier2CrustRef.current.position.y = THREE.MathUtils.damp(
        tier2CrustRef.current.position.y,
        targetY,
        5.0,
        delta
      );
    }

    // Tầng 3: Thịt bánh
    if (tier3PasteRef.current) {
      const targetY = isExploded ? -0.42 * sep : 0;
      tier3PasteRef.current.position.y = THREE.MathUtils.damp(
        tier3PasteRef.current.position.y,
        targetY,
        5.0,
        delta
      );
    }

    // Tầng 4: Nhân bánh (Dưới cùng)
    if (tier4CoreRef.current) {
      const targetY = isExploded ? -1.35 * sep : 0;
      tier4CoreRef.current.position.y = THREE.MathUtils.damp(
        tier4CoreRef.current.position.y,
        targetY,
        5.0,
        delta
      );
    }
  });

  return (
    <group
      ref={rootGroupRef}
      scale={cakeScale}
      onPointerOver={() => onHover?.(true)}
      onPointerOut={() => onHover?.(false)}
    >
      {/* 
        =================================================================
        1. NGUYÊN CHIẾC BÁNH (Khi không bổ đôi và không tách lớp)
        =================================================================
      */}
      {!isCutaway && !isExploded && (
        <group>
          {/* Vỏ bánh nguyên khối */}
          <mesh castShadow receiveShadow>
            <latheGeometry args={[outerProfilePoints, 64]} />
            <primitive object={crustMaterial} attach="material" />
          </mesh>

          {/* Dấu mộc son đỏ / Hoa văn truyền thống */}
          {cakeType === 'traditional' ? (
            <mesh position={[0, 0.499, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[1.05, 48]} />
              <meshStandardMaterial
                bumpMap={embossTexture}
                bumpScale={0.08}
                color={crustColor}
                roughness={0.34}
                transparent
                opacity={0.96}
              />
            </mesh>
          ) : (
            <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.72, 48]} />
              <meshBasicMaterial
                map={stampTexture}
                transparent
                opacity={0.94}
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      )}

      {/*
        =================================================================
        2. BỔ ĐÔI BÁNH: CẮT ĐÔI BÁNH THẬT - PHẲNG MỊN & RÕ TẦNG NHÂN
        (Không nhét vật lạ, phẳng hoàn toàn như dao cắt thật)
        =================================================================
      */}
      {isCutaway && !isExploded && (
        <group>
          {/* Nửa vòm cong phía sau (Z <= 0) */}
          <mesh castShadow receiveShadow>
            <latheGeometry args={[outerProfilePoints, 48, Math.PI / 2, Math.PI]} />
            <primitive object={crustMaterial} attach="material" />
          </mesh>

          {/* Mặt cắt viền vỏ bánh nướng vàng (Phẳng hoàn toàn tại Z = 0) */}
          <mesh position={[0, 0, 0.001]} receiveShadow>
            <shapeGeometry args={[crustThicknessBorderShape]} />
            <primitive object={crustMaterial} attach="material" />
          </mesh>

          {/* Mặt cắt thịt bánh sên mịn (Phẳng hoàn toàn tại Z = 0.002) */}
          <mesh position={[0, 0, 0.002]} receiveShadow>
            <shapeGeometry args={[fillingCutShape]} />
            <primitive object={fillingMaterial} attach="material" />
          </mesh>

          {/* Mặt cắt tròn của lõi bánh */}
          <mesh position={[0, 0.04, 0.003]}>
            <circleGeometry args={[0.32, 48]} />
            <meshBasicMaterial color={coreColor} toneMapped={false} />
          </mesh>

          {/* Nửa dấu mộc son trên nắp vòm bán cầu (Z <= 0) */}
          <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.72, 36, 0, Math.PI]} />
            <meshBasicMaterial
              map={stampTexture}
              transparent
              opacity={0.94}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/*
        =================================================================
        3. TÁCH LỚP 3D: CÁC TẦNG CÁCH XA NHAU TỪ TRÊN XUỐNG DƯỚI
        - TẦNG 1: TOÀN BỘ CÁI BÁNH DẠNG LƯỚI
        - TẦNG 2: VỎ BÁNH
        - TẦNG 3: THỊT BÁNH
        - TẦNG 4: NHÂN BÁNH
        (Có thể dùng chuột kéo dãn khoảng cách)
        =================================================================
      */}
      {isExploded && (
        <group>
          {/* -------------------------------------------------------------
              TẦNG 1 (TRÊN CÙNG): TOÀN BỘ CÁI BÁNH DẠNG LƯỚI
          ------------------------------------------------------------- */}
          <group ref={tier1WireframeRef}>
            <mesh>
              <latheGeometry args={[outerProfilePoints, 32]} />
              <primitive object={wireframeMaterial} attach="material" />
            </mesh>
            <Html position={[1.65, 0.05, 0]} center pointerEvents="none" zIndexRange={[10, 0]}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pia-charcoal/90 backdrop-blur-md border border-pia-gold/50 text-[11px] font-bold text-pia-gold shadow-xl tracking-wide select-none whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-pia-gold animate-pulse" />
                <span>TẦNG 1 · TOÀN BÁNH</span>
              </div>
            </Html>
          </group>

          {/* -------------------------------------------------------------
              TẦNG 2: VỎ BÁNH (18 VI TẦNG HOÀNG KIM)
          ------------------------------------------------------------- */}
          <group ref={tier2CrustRef}>
            <mesh castShadow receiveShadow>
              <latheGeometry args={[outerProfilePoints, 64]} />
              <primitive object={crustMaterial} attach="material" />
            </mesh>
            {/* Mộc son đỏ trên nắp vỏ */}
            <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.72, 48]} />
              <meshBasicMaterial
                map={stampTexture}
                transparent
                opacity={0.94}
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
            {/* Vòng hào quang vàng kim vi tầng */}
            {[-0.08, 0.08, 0.22].map((yOffset, idx) => (
              <mesh key={idx} position={[0, yOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.56 + idx * 0.02, 1.59 + idx * 0.02, 48]} />
                <meshBasicMaterial
                  color="#F59E0B"
                  transparent
                  opacity={0.45}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
            <Html position={[1.65, 0.05, 0]} center pointerEvents="none" zIndexRange={[10, 0]}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pia-charcoal/90 backdrop-blur-md border border-amber-500/50 text-[11px] font-bold text-amber-300 shadow-xl tracking-wide select-none whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>TẦNG 2 · VỎ BÁNH</span>
              </div>
            </Html>
          </group>

          {/* -------------------------------------------------------------
              TẦNG 3: THỊT BÁNH (KHỐI NHÂN ĐẬU XANH/SẦU RIÊNG SÊN MỊN)
          ------------------------------------------------------------- */}
          <group ref={tier3PasteRef}>
            <mesh castShadow receiveShadow>
              <latheGeometry args={[innerFillingPoints, 48]} />
              <primitive object={fillingMaterial} attach="material" />
            </mesh>
            <Html position={[1.65, 0.05, 0]} center pointerEvents="none" zIndexRange={[10, 0]}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pia-charcoal/90 backdrop-blur-md border border-yellow-500/50 text-[11px] font-bold text-yellow-200 shadow-xl tracking-wide select-none whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>TẦNG 3 · NHÂN SÊN</span>
              </div>
            </Html>
          </group>

          {/* -------------------------------------------------------------
              TẦNG 4 (DƯỚI CÙNG): LÕI BÁNH
          ------------------------------------------------------------- */}
          <group ref={tier4CoreRef} position={[0, 0.04, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.56, 36, 32]} />
              <meshStandardMaterial color={coreColor} roughness={0.7} />
            </mesh>
            <Html position={[1.65, 0.05, 0]} center pointerEvents="none" zIndexRange={[10, 0]}>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pia-charcoal/90 backdrop-blur-md border border-orange-500/50 text-[11px] font-bold text-orange-300 shadow-xl tracking-wide select-none whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>TẦNG 4 · LÕI BÁNH</span>
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* Warm fill light */}
      <pointLight
        color="#FF5722"
        intensity={0.45}
        distance={3.5}
        decay={2}
        position={[0, 0.1, 0.5]}
      />
    </group>
  );
}
