// 実装参考
/**
 * 背景色/シャドウ回り,静的物体(床)の設定
 * https://codesandbox.io/p/sandbox/bruno-simons-20k-challenge-857z1i?file=%2Fsrc%2FApp.js%3A6%2C45-6%2C67
 *
 * シャドウ
 * https://codesandbox.io/p/sandbox/baking-soft-shadows-hxcc1x?file=%2Fsrc%2FApp.js%3A21%2C43
 */

import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";

import { useControls } from "leva";
import {
  CameraControls,
  MeshTransmissionMaterial,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
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
      {/* <mesh position={[0.0, 1, 0.0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={"orange"} />
      </mesh> */}
      <RigidBody mass={10}>
        <mesh {...props} ref={meshRef} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <MeshTransmissionMaterial transmissionSampler />
        </mesh>

        <mesh {...props} receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
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
    restitution={0.1}
  >
    <mesh castShadow>
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
        shadows
        camera={{
          fov: 50,
          aspect: 1,
          near: 0.01,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        {/* 背景色を決める */}
        <color attach="background" args={["#f0f0f0"]} />

        <Scene />

        <Physics gravity={[0, -30, 0]} colliders="cuboid">
          <Boxes position={[0, 3, 0]} />
          {/* <Enemy color="hotpink" position={[0, 0, 0]} /> */}

          <RigidBody position={[0, -1, 0]} type="fixed" colliders="false">
            <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
          </RigidBody>
        </Physics>

        <AccumulativeShadows
          temporal
          frames={100}
          color="orange"
          colorBlend={2}
          toneMapped={true}
          alphaTest={0.75}
          opacity={2}
          scale={12}
        >
          <RandomizedLight
            intensity={Math.PI}
            amount={8}
            radius={4}
            ambient={0.5}
            position={[5, 5, -10]}
            bias={0.001}
          />
        </AccumulativeShadows>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
