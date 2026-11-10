import { Suspense, ReactNode, Component, ErrorInfo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { Sparkles, AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / R3F Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center p-6 text-center bg-pia-surface/60 border border-pia-gold/20 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-pia-gold mb-3 animate-pulse" />
            <h4 className="font-serif text-lg font-bold text-pia-cream mb-1">
              Chế Độ Xem 3D Cần Trình Duyệt Hỗ Trợ WebGL
            </h4>
            <p className="text-pia-muted text-sm max-w-sm">
              Bạn vẫn có thể trải nghiệm toàn bộ hình ảnh và tương tác sản phẩm mượt mà tại đây.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface PiaCanvasProps {
  children: ReactNode;
  className?: string;
  enableOrbit?: boolean;
  autoRotate?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
  showShadows?: boolean;
}

export function PiaCanvas({
  children,
  className = 'w-full h-full min-h-[420px]',
  enableOrbit = true,
  cameraPosition = [0, 1.8, 4.6],
  fov = 42,
  showShadows = true,
}: PiaCanvasProps) {
  return (
    <WebGLErrorBoundary>
      <div className={`relative ${className}`}>
        <Canvas
          camera={{ position: cameraPosition, fov }}
          dpr={[1, 2]} // Performance: limit max DPR to 2 to prevent mobile stutter
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.85} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.6}
            color="#FFF4D6"
            castShadow
          />
          <directionalLight
            position={[-5, 3, -3]}
            intensity={0.6}
            color="#FFAB91"
          />
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#E5A93C" />

          <Suspense fallback={null}>
            <Float
              speed={1.6}
              rotationIntensity={0.2}
              floatIntensity={0.3}
            >
              {children}
            </Float>

            {showShadows && (
              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.55}
                scale={5}
                blur={2.4}
                far={3}
                color="#000000"
              />
            )}
          </Suspense>

          {enableOrbit && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.8}
              maxDistance={7.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
              dampingFactor={0.06}
            />
          )}
        </Canvas>

        {/* 3D Interaction Badge */}
        <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-pia-charcoal/70 backdrop-blur-md border border-pia-gold/20 text-[11px] text-pia-goldLight">
          <Sparkles className="w-3.5 h-3.5 text-pia-gold animate-spin-slow" />
          <span>Kéo xoay 360° • Cuộn để phóng to</span>
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}
