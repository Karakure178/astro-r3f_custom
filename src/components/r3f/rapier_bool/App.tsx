// 実装参考
/**
 *
 */

import { useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import {
  CameraControls,
  Environment,
  SoftShadows,
  Lightformer,
} from "@react-three/drei";

import "./Fragments.scss";

// 以下、各種オブジェクトのインポート
import World from "./background/World";
import Box6 from "./obj/BoxBool6";
import Boxes from "./obj/Boxes";
import TestObj from "./obj/TestObj";

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
      <color attach="background" args={["#fef4ef"]} />
      <ambientLight />
      <directionalLight castShadow intensity={0.6} position={[0, 0, 0]} />
      <CameraControls makeDefault />

      {enabled && <SoftShadows {...config} />}
      {/* <fog attach="fog" args={["black", 0, 40]} /> */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
    </>
  );
};

// 本体
export default function App() {
  return (
    <div className="container">
      <Canvas
        shadows
        orthographic
        camera={{ position: [6, -5, 10], zoom: 170 }}
      >
        <Scene />

        {/* 物理演算 */}
        <group scale={0.01}>
          <World>
            <template slot="object">
              {/* 反射強め系 */}
              <Box6 position={[0, 10, 0]} />
              <Boxes position={[0, 50, 0]} colors={"orange"} />
            </template>
          </World>
          <TestObj position={[0, 0, 0]} />
        </group>
      </Canvas>
    </div>
  );
}
