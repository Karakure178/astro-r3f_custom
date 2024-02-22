// 実装参考
/**
 * 背景色/シャドウ回り,静的物体(床)の設定
 * https://codesandbox.io/p/sandbox/bruno-simons-20k-challenge-857z1i?file=%2Fsrc%2FApp.js%3A6%2C45-6%2C67
 *
 * シャドウ(結構遅めに反映されるやつ)
 * https://codesandbox.io/p/sandbox/baking-soft-shadows-hxcc1x?file=%2Fsrc%2FApp.js%3A21%2C43
 *
 * マテリアル系
 * https://codesandbox.io/p/sandbox/multi-select-edges-ny3p4?file=%2Fsrc%2FApp.js%3A19%2C57
 */

import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";

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
  // const { name, positionX, positionY, positionZ, boxPosition } = useControls({
  //   name: "World",
  //   positionX: 0,
  //   positionY: 0,
  //   positionZ: 0,
  //   boxPosition: { value: [0.1, 0.1] },
  // });

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
      <RigidBody mass={1}>
        <mesh {...props} ref={meshRef} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <MeshTransmissionMaterial transmissionSampler />
        </mesh>

        <mesh {...props} receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />

          <MeshTransmissionMaterial
            color={"orange"}
            resolution={1024}
            samples={16}
            thickness={1}
            roughness={0.5}
            envMapIntensity={1}
            transmission={1}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

// 本体
export default function Fragments() {
  // const meshRef = useRef();
  const num = 10;
  const positions = [
    [0, 12, 0],
    [2, 9, 0],
    [4, 10, 0],
    [0, 13, 2],
  ];

  // positionsをここで設定する
  for (let i = 0; i < num; i++) {
    positions.push([
      map(Math.random(), 0, 1, 0, 1),
      map(Math.random(), 0, 1, 8, 10),
      Math.random(),
    ]);
  }

  const list = positions.map((position, index) => (
    <Boxes position={position} />
  ));
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
        <directionalLight
          position={[-10, 10, 5]}
          shadow-mapSize={[256, 256]}
          shadow-bias={-0.0001}
          castShadow
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10]}
          />
        </directionalLight>
        {/* 背景色を決める */}
        <color attach="background" args={["#f0f0f0"]} />

        <Scene />

        <Physics gravity={[0, -30, 0]} colliders="cuboid">
          {/* <Boxes position={[0, 10, 0]} /> */}
          {list}

          <RigidBody position={[0, -1, 0]} type="fixed" colliders="false">
            <CuboidCollider restitution={0.01} args={[1000, 1, 1000]} />
          </RigidBody>
        </Physics>

        <AccumulativeShadows
          temporal
          frames={Infinity}
          alphaTest={1}
          blend={200}
          limit={1500}
          scale={25}
          position={[0, -0.05, 0]}
        >
          <RandomizedLight
            amount={1}
            mapSize={512}
            radius={5}
            ambient={0.5}
            position={[-10, 10, 5]}
            size={10}
            bias={0.001}
          />
        </AccumulativeShadows>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
