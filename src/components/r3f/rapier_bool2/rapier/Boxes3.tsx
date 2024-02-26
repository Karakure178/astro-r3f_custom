/** 物理演算を使ったboxの作成3
 * 実装参考：
 * propsで渡す値の調整回り(object rest spread)：
 * https://zenn.dev/ynakamura/articles/e562376735d398
 */

import { RigidBody } from "@react-three/rapier";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import Glass from "../mat/Glass";
import { useRef, useEffect } from "react";
import { ratioCalculation } from "@assets/ts/libs/ratioCalculation";

const Boxes = ({ colors, size = [1, 1, 1], ...props }) => {
  const meshRef = useRef();
  const sMax = 2;
  const sSmall = 0.3;

  return (
    <>
      <RigidBody mass={1}>
        <mesh
          {...props}
          castShadow
          ref={meshRef}
          scale={[size[0], size[1], size[2]]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <Geometry>
            <Base>
              <boxGeometry args={[1, 1, 1]} />
            </Base>

            {/* 以下ブーリアン処理 
            TODO 拡大縮小として比率計算を用いる必要あり
            */}
            {/* ratioCalculation(1/1.2,size[0],1) */}
            <Subtraction
              scale={[
                ratioCalculation(1 / 1.2, size[0], 1),
                ratioCalculation(1 / 1.2, size[1], 1),
                ratioCalculation(1 * 2, size[2], 1),
              ]}
            >
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction
              scale={[
                ratioCalculation(1 / 1.2, size[0], 1),
                ratioCalculation(1 * 2, size[1], 1),
                ratioCalculation(1 / 1.2, size[2], 1),
              ]}
            >
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            {/*  */}
            {/* <Subtraction scale={[size[0] / 1.2, size[1] / 1.2, size[2] * 2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[size[0] / 1.2, size[1] * 2, size[2] / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[size[0] * 2, size[1] / 1.2, size[2] / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction> */}
          </Geometry>
          <Glass />
        </mesh>
      </RigidBody>
    </>
  );
};
export default Boxes;
