// 実装参考
/**
 *
 */

import { useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { CameraControls, Environment, SoftShadows } from "@react-three/drei";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import BoxBool from "./obj/BoxBool";
import BoxBool2 from "./obj/BoxBool2";
import BoxBool3 from "./obj/BoxBool3";
import BoxBool4 from "./obj/BoxBool4";
import BoxBool5 from "./obj/BoxBool5";
import BoxBool6 from "./obj/BoxBool6";

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
        <World />
        {/* 反射強め系 */}
        <BoxBool position={[0, 0.5, 0]} objectName={"box_1"}></BoxBool>
        <BoxBool2
          position={[1.5, 0.5, 0]}
          objectName={"box_2"}
          subName={"box_2sub"}
        ></BoxBool2>
        <BoxBool3
          position={[3, 0.5, 0]}
          objectName={"box_3"}
          subName={"box_3sub"}
        ></BoxBool3>

        <BoxBool4
          position={[4.5, 0.5, 0]}
          objectName={"box_4"}
          subName={"box_4sub"}
        ></BoxBool4>

        <BoxBool5
          position={[6, 0.5, 0]}
          objectName={"box_5"}
          subName={"box_5sub"}
        ></BoxBool5>
        <BoxBool6
          position={[7.5, 0.5, 0]}
          objectName={"box_6"}
          subName={"box_6sub"}
        ></BoxBool6>
      </Canvas>
    </div>
  );
}
