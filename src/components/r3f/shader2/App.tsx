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
 *
 * オブジェクトに対する配列回り：
 * https://devsakaso.com/react-control-syntax/
 *
 */

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";

import { useControls } from "leva";
import { CameraControls, Environment, SoftShadows } from "@react-three/drei";

import "./Fragments.scss";

import Box1 from "./mat/Box1";
import Box2 from "./mat/Box2";

// シーンを設定する
const Scene = () => {
  const { controls } = useThree();
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

  useEffect(() => {
    if (controls) {
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }
  }, [controls]);

  useFrame(({ clock }) => {});

  return (
    <>
      {/* 背景色を決める */}
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />
      <CameraControls makeDefault />

      {enabled && <SoftShadows {...config} />}
      <fog attach="fog" args={["black", 0, 40]} />
      {/* <Environment preset="city" /> */}
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        background
        blur={1}
      />
    </>
  );
};

// 本体
export default function App() {
  const opsions = "orange";
  const num = 1;
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

  //const list = positions.map((position, index) => ());

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
        <Scene />
        {/* 以下  通常の配置計算 */}

        {/* 反射強め系 */}
        <Box1 position={[0, 0, 0]} objectName={{ name: "box1" }}></Box1>

        {/* すりガラス系 */}
        <Box2 position={[1.5, 0, 0]} objectName={{ name: "box2" }} />
      </Canvas>
    </div>
  );
}
