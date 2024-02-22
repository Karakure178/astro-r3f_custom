import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";

import { useControls } from "leva";
import { CameraControls, Box, Sphere, Circle } from "@react-three/drei";
import "./Fragments.scss";

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

// box あたり判定
const Boxes = (props) => {
  const meshRef = useRef();
  const ref = useRef();

  useFrame(({ clock }) => {});

  return (
    <>
      <RigidBody {...props.type} {...props.restitution}>
        <mesh {...props} ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </RigidBody>
    </>
  );
};

// 床
const Enemy = ({ position, color }) => (
  <RigidBody
    colliders="cuboid"
    type="fixed"
    position={position}
    restitution={2.1}
  >
    <mesh>
      <boxGeometry args={[10, 0.5, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </RigidBody>
);

export default function Fragments() {
  const meshRef = useRef();
  const positions = [
    [0, 0, 0],
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2],
  ];
  const scales = [0.1, 0.2, 0.3, 0.4];

  // const list = positions.map((position, index) => (
  //   <Box position={position} scales={scales[index]} />
  // ));
  // https://devsakaso.com/react-control-syntax/

  return (
    <div className="container">
      <Canvas
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

        <Physics gravity={[0, -30, 0]} colliders="cuboid" debug>
          <Boxes position={[0, 3, 0]} />
          <Enemy color="hotpink" position={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}
