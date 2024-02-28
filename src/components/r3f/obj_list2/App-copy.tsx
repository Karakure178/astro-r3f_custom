/**
 * ただ立方体をグリッド上に配置するだけのコンポーネント
 * カメラ実装のアンチパターン
 */

import { useEffect, useMemo } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { CameraControls, Environment, SoftShadows } from "@react-three/drei";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";

import BoxBool3 from "./obj/BoxBool3";

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
      <color attach="background" args={["#50C4ED"]} />
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
      <pointLight position={[-10, 0, -20]} color="#BBE2EC" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />
      <CameraControls makeDefault />

      {enabled && <SoftShadows {...config} />}
      <fog attach="fog" args={["#EE4266", 0, 40]} />
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
  const colorBox = ["#FFE6E6", "#E1AFD1", "#AD88C6", "#7469B6"];

  const colors = [];
  const positions = [];
  const num = 5;
  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([i, 0.5, j]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
    }
  }

  const list = positions.map((position, index) =>
    position.map((pos, index2) => (
      <BoxBool3 position={pos} color={colors[index][index2]} />
    ))
  );

  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: 100, step: 0.01 },
      y: { value: 5, min: 0, max: 100, step: 0.01 },
      z: { value: 10, min: 0, max: 100, step: 0.01 },
    };
  }, []);
  const pBase = useControls("camera", options);

  return (
    <div className="container">
      <Canvas
        shadows
        camera={{
          fov: 50,
          aspect: 1,
          near: 0.01,
          far: 1000,
          position: [0, 5, 10],
        }}
      >
        <Scene />

        {/* 以下  通常の配置計算 */}
        <World />
        {list}
      </Canvas>
    </div>
  );
}
