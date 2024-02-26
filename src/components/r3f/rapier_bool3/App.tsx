/**
 * たくさんのオブジェクトをランダムに落下させる
 *
 */

import { Perf } from "r3f-perf";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";

import { useControls } from "leva";
import { CameraControls, Environment, SoftShadows } from "@react-three/drei";

import WhiteShape from "./Box";
import World from "./background/World";
import Boxes from "./rapier/Boxes";
import Boxes2 from "./rapier/Boxes2";
import Boxes3 from "./rapier/Boxes3";
import Boxes4 from "./rapier/Boxes4";
import Boxes5 from "./rapier/Boxes5";

import "./Fragments.scss";

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
      <Environment preset="city" />
    </>
  );
};

// 条件分岐するオブジェクト関数
const RandomObj = ({ jotai = 1, color = "fff", ...props }) => {
  return (
    <>
      {jotai === 1 ? (
        <Boxes colors={color} {...props} jotai={2} />
      ) : jotai === 2 ? (
        <Boxes2 colors={color} {...props} jotai={2} />
      ) : jotai === 3 ? (
        <Boxes3 colors={color} {...props} jotai={2} />
      ) : jotai === 4 ? (
        <Boxes4 colors={color} {...props} jotai={2} />
      ) : (
        <Boxes5 colors={color} {...props} jotai={2} />
      )}
    </>
  );
};

// 本体
export default function App() {
  const opsions = "orange";
  const colorBox = ["#F4538A", "#387ADF", "#333A73", "#F4A259", "#F4A259"];
  const colors = [];
  const num = 10;
  const positions = [];
  const scales = [];
  const jotais = []; // どれかのオブジェクトを選択する

  // オブジェクトのposition/scale/jotai/colorをここで設定する
  for (let i = 0; i < num; i++) {
    positions.push([
      map(Math.random(), 0, 1, -3, 3),
      map(Math.random(), 0, 1, 8, 10),
      map(Math.random(), 0, 1, -3, 3),
    ]);

    const scale = map(Math.random(), 0, 1, 0.5, 3);
    positions.push([scale, scale, scale]);

    const jotai = Math.floor(map(Math.random(), 0, 1, 1, 5));
    jotais.push(jotai);

    const color = colorBox[Math.floor(map(Math.random(), 0, 1, 0, 5))];
    colors.push(color);
  }

  const list = positions.map((position, index) => (
    <RandomObj
      position={position}
      color={colors[index]}
      jotai={jotais[index]}
      scale={scales[index]}
    />
  ));

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
        <Perf />
        <Scene />

        {/* 物理演算する場合の記載はこちら(床付き) */}
        <World>
          <template slot="object">
            {list}
            {/* box(boolean使用) */}
            <WhiteShape position={[0, 0.4, 0]} />
          </template>
        </World>

        {/* 以下  通常の配置計算 */}
      </Canvas>
    </div>
  );
}
