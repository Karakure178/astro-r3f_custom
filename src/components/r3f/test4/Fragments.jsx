import { Vector2, ShaderMaterial } from "three";
import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { CameraControls } from "@react-three/drei";
import fs from "./normal.frag";
import vx from "./normal.vert";
import "./Fragments.scss";

const fragmentShader = fs;
const vertexShader = vx;

// マテリアルを設定する
const material = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new Vector2() },
    u_mouse: { type: "v2", value: new Vector2() },
    u_boxPosition: { type: "v2", value: new Vector2() },
    // u_texture: {type: "t", value: useLoader(TextureLoader, img) }
  },
});

// シーンを設定する
const Scene = () => {
  const { controls } = useThree();
  const meshRef = useRef();
  const { name, positionX, positionY, positionZ, boxPosition } = useControls({
    name: "World",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    boxPosition: { value: [0.1, 0.1] },
  });

  useEffect(() => {
    if (controls) {
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }
  }, [controls]);

  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.u_time.value = clock.elapsedTime;
    meshRef.current.material.uniforms.u_boxPosition.value = boxPosition;
  });
  // <CameraControls makeDefault />

  return (
    <>
      <mesh
        ref={meshRef}
        material={material}
        position={[positionX, positionY, positionZ]}
      >
        <boxGeometry args={[5, 5, 0.9]} />
      </mesh>
    </>
  );
};

export default function Fragments() {
  return (
    <div className="container">
      <Canvas
        // onCreated={sceneCreated}
        camera={{
          fov: 50,
          aspect: 1,
          near: 0.01,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
