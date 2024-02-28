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
import BoxBool3 from "./obj/BoxBool3";

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
const Scene = ({ cameraState }) => {
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
  const scales = [];
  const num = 5;
  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    scales.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([i, 0.5, j]);

      const scale = map(Math.random(), 0, 1, 0.5, 1);
      scales[i].push([scale, scale, scale]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
    }
  }

  const list = positions.map((position, i) =>
    position.map((pos, j) => (
      <BoxBool3 position={pos} color={colors[i][j]} scale={scales[i][j]} />
    ))
  );

  // const options = useMemo(() => {
  //   return {
  //     x: { value: 0, min: 0, max: 100, step: 0.01 },
  //     y: { value: 5, min: 0, max: 100, step: 0.01 },
  //     z: { value: 10, min: 0, max: 100, step: 0.01 },
  //   };
  // }, []);
  // const pBase = useControls("camera", options);

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
