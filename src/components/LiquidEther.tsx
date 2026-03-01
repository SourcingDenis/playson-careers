import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uMouseForce;
  uniform float uCursorSize;
  uniform float uViscosity;
  
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
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
    vec2 uv = vUv;
    
    // Mouse interaction
    float dist = distance(uv, uMouse);
    float mouseEffect = smoothstep(uCursorSize, 0.0, dist) * uMouseForce;
    
    // Liquid distortion
    float noise1 = snoise(uv * 3.0 + uTime * 0.1);
    float noise2 = snoise(uv * 5.0 - uTime * 0.2 + mouseEffect);
    
    vec2 distortedUv = uv + vec2(noise1, noise2) * 0.1;
    
    // Color mixing
    vec3 color = mix(uColor0, uColor1, distortedUv.x + distortedUv.y);
    color = mix(color, uColor2, noise2);
    
    // Add some shine/highlight
    float highlight = smoothstep(0.4, 0.6, noise1);
    color += highlight * 0.1;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  color0?: string;
  color1?: string;
  color2?: string;
}

const Fluid = ({
  color0 = '#5227FF',
  color1 = '#FF9FFC',
  color2 = '#B19EEF',
  mouseForce = 20,
  cursorSize = 100,
  viscous = 30,
}: LiquidEtherProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColor0: { value: new THREE.Color(color0) },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uMouseForce: { value: mouseForce * 0.01 }, // Scale down for shader
      uCursorSize: { value: cursorSize * 0.001 }, // Scale down for shader
      uViscosity: { value: viscous },
    }),
    [color0, color1, color2, mouseForce, cursorSize, viscous, size]
  );

  const time = useRef(0);

  useFrame((state, delta) => {
    if (mesh.current) {
      time.current += delta;
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = time.current;
      
      // Update mouse position (normalized 0-1)
      const mouse = state.pointer; // -1 to 1
      material.uniforms.uMouse.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2);
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const LiquidEther: React.FC<LiquidEtherProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Fluid {...props} />
      </Canvas>
    </div>
  );
};

export default LiquidEther;
