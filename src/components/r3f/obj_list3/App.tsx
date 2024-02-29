/**
 * ただ立方体をグリッド上に配置するだけのコンポーネント
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame, Canvas, useThree, extend } from "@react-three/fiber";
import { useControls, Leva } from "leva";

import { CameraControls, Environment, SoftShadows } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { map } from "@assets/ts/libs/map";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import RandomObj from "./obj/RandomObj";

extend({ OrbitControls });
// camera control
// https://codesandbox.io/p/sandbox/r3f-orbit-controls-un2oh?file=%2Fsrc%2Findex.js%3A9%2C1-14%2C2
function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
}

// シーンを設定する
const Scene = () => {
  const { enabled, ...config } = useControls({
    enabled: true,
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 },
  });

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
      ></directionalLight>
      <pointLight position={[-10, 0, -20]} color="#BBE2EC" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />

      <Controls />

      {enabled && <SoftShadows {...config} />}
      <fog attach="fog" args={["#EE4266", 0, 100]} />
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
  const colorBox = ["#116D6E", "#DDE6ED", "#FB8B24", "#CD1818"];
  const colorBox2 = ["#DCF2F1", "#7FC7D9", "#365486", "#0F1035"];

  const colors = [];
  const colors2 = [];

  const positions = [];
  const jotais = [];
  const scales = [];
  const num = 3;

  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    colors2.push([]);
    scales.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([]);
      colors[i].push([]);
      colors2[i].push([]);
      scales[i].push([]);
      for (let k = 0; k < num; k++) {
        positions[i][j].push([i, 0.5 + k, j]);
        const scale = map(Math.random(), 0, 1, 0.7, 1);
        scales[i][j].push([scale, scale, scale]);
        colors[i][j].push(
          colorBox[Math.floor(Math.random() * colorBox.length)]
        );
        colors2[i][j].push(
          colorBox2[Math.floor(Math.random() * colorBox2.length)]
        );
      }
    }
  }
  // reactだと三次元配列は扱えないらしい
  // そんなことはなく、return 書いていないためだった
  // const list = positions.flatMap((position, i) =>
  //   position.flatMap((pos, j) =>
  //     pos.map((p, k) => {
  //       return (
  //         <BoxBool3
  //           position={[i, j, k]}
  //           color={colors[i][j][k]}
  //           scale={scales[i][j][k]}
  //         />
  //       );
  //     })
  //   )
  // );
  const list = positions.map((position, i) =>
    position.map((pos, j) =>
      pos.map((p, k) => {
        return (
          <RandomObj
            jotai={Math.floor(Math.random() * 2) + 1}
            position={p}
            colors={colors[i][j][k]}
            colors2={colors2[i][j][k]}
            scale={scales[i][j][k]}
          />
        );
      })
    )
  );

  return (
    <div className="container">
      {/*   位置を変えられる
      https://github.com/pmndrs/leva/issues/302#issuecomment-1033904324
      https://github.com/pmndrs/leva/discussions/353
            非表示
      https://github.com/pmndrs/leva/issues/440
      */}
      <Leva titleBar={{ position: { x: -100, y: 100 } }} hidden />
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
