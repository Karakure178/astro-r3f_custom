// 実装参考
// https://sbcode.net/react-three-fiber/use-loader/

import { Vector2, ShaderMaterial, TextureLoader } from "three";
import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree, useLoader } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import fs from "./normal.frag";
import vx from "./normal.vert";

const Scene = () => {
  const { controls } = useThree();
  const meshRef = useRef();

  // 以降テクスチャ絡みの設定
  const fragmentShader = fs;
  const vertexShader = vx;
  const img =
    "https://threejsfundamentals.org/threejs/resources/images/wall.jpg";
  const tex = useLoader(TextureLoader, img);

  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new Vector2() },
      u_mouse: { type: "v2", value: new Vector2() },
      u_texture: { type: "t", value: tex },
    },
  });

  useEffect(() => {
    if (controls) {
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }
  }, [controls]);

  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.u_time.value = clock.elapsedTime;
  });
  return (
    <>
      <mesh ref={meshRef} material={material}>
        <boxGeometry args={[2, 2, 0.9]} />
      </mesh>
      <CameraControls makeDefault />
    </>
  );
};

export default function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 3], fov: 100 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
