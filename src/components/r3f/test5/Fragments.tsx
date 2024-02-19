import { Vector2, ShaderMaterial } from "three";
import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { CameraControls } from "@react-three/drei";
import fs from "./normal.frag";
import vx from "./normal.vert";
import "./Fragments.scss";
import Box from "./Box";

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

  useFrame(({ clock }) => {});

  return (
    <>
      <CameraControls makeDefault />
    </>
  );
};

export default function Fragments() {
  const positions = [
    [0, 0, 0],
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2],
  ];
  const scales = [0.1, 0.2, 0.3, 0.4];

  const list = positions.map((position, index) => (
    <Box position={position} scales={scales[index]} />
  ));
  // https://devsakaso.com/react-control-syntax/

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
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Scene />
        {list}
      </Canvas>
    </div>
  );
}
