// 実装参考
/**
 *
 */

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import {
  CameraControls,
  Environment,
  SoftShadows,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import Box1 from "./mat/Box1";
import Box2 from "./mat/Box2";
import Box3 from "./mat/Box3";
import Box4 from "./mat/Box4";
import Box5 from "./mat/Box5";
import Box6 from "./mat/Box6";
import Box7 from "./mat/Box7";

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
      <color attach="background" args={["#fef4ef"]} />
      <OrbitControls makeDefault />
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

      {/* {enabled && <SoftShadows {...config} />} */}
      {/* <fog attach="fog" args={["black", 0, 40]} /> */}
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
  return (
    <div className="container">
      <Canvas orthographic shadows camera={{ position: [6, -5, 10], zoom: 60 }}>
        <Scene />

        {/* 以下  通常の配置計算 */}
        <World />
        {/* 反射強め系 */}
        <Box1 position={[0, 0.5, 0]} objectName={{ name: "box1" }}></Box1>

        {/* すりガラス系 */}
        <Box2 position={[1.5, 0.5, 0]} objectName={{ name: "box2" }} />

        {/* プラスチック系 */}
        <Box3 position={[3, 0.5, 0]} objectName={{ name: "box3" }} />

        {/* sample系 */}
        <Box4 position={[4.5, 0.5, 0]} objectName={{ name: "box4" }} />

        {/* 反射がきれい系 */}
        <Box5 position={[6, 0.5, 0]} objectName={{ name: "box5" }} />

        {/* box2とbox5のあいのこ系 */}
        <Box6 position={[7.5, 0.5, 0]} objectName={{ name: "box6" }} />
        <Box7 position={[9, 0.5, 0]} objectName={{ name: "box7" }} />
      </Canvas>
    </div>
  );
}
