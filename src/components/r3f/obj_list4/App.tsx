/**
 * ただ立方体をグリッド上に配置するだけのコンポーネント
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { useControls, Leva } from "leva";
import { Environment, SoftShadows } from "@react-three/drei";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import GridAnime from "./animation/GridAnime";

// シーンを設定する
const Scene = () => {
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

  //useFrame(({ clock }) => {});
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
      ></directionalLight>
      <pointLight position={[-10, 0, -20]} color="#BBE2EC" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />

      {enabled && <SoftShadows {...config} />}
      <fog attach="fog" args={["#EE4266", 0, 100]} />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        background
        blur={1}
      />
    </>
  );
};

/**
 *
 */
const Apps = () => {
  //useFrame(({ clock }) => {});

  return (
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
      <World />
      <GridAnime />
    </Canvas>
  );
};

// 本体
export default function App() {
  return <Apps />;
  // return (
  //   // <div className="container">
  //     {/*   位置を変えられる
  //     https://github.com/pmndrs/leva/issues/302#issuecomment-1033904324
  //     https://github.com/pmndrs/leva/discussions/353
  //           非表示
  //     https://github.com/pmndrs/leva/issues/440
  //     */}
  //     // <Leva titleBar={{ position: { x: -100, y: 100 } }} hidden />
  //     <Apps />
  //   // </div>
  // );
}
