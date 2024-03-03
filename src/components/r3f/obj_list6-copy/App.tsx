/**
 * ポストプロセッシングの実装
 * https://codesandbox.io/p/sandbox/glitch-i8zzx
 * https://qiita.com/nemutas/items/72ae87d84b4cbc12601c
 * https://codesandbox.io/p/sandbox/session-10-standard-effectcomposer-bloom-hhic2t?file=%2Fsrc%2FApp.js%3A7%2C1
 */

import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { useControls, Leva } from "leva";
import { Environment, SoftShadows, Effects } from "@react-three/drei";
import { Vector2, ShaderMaterial, TextureLoader, DoubleSide } from "three";
import { useRef, useEffect, useMemo } from "react";

import { UnrealBloomPass } from "three-stdlib";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import GridAnime from "./animation/GridAnime";
import Camera from "./background/Camera";
// import Effect from "./shader/Effect";
extend({ UnrealBloomPass });

// シーンを設定する
const Scene = () => {
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

  return (
    <>
      {/* 背景色を決める */}
      <Effects disableGamma>
        <unrealBloomPass threshold={0} strength={intensity} radius={radius} />
      </Effects>
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

// 本体
export default function App() {
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
      <Camera />
      <Scene />
      <World />
      <GridAnime />
      {/* <Effect /> */}
    </Canvas>
  );
}
