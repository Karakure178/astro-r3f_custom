/** 物理演算を使ったboxの作成
 * scaleの数値で形が変わってしまう失敗パターン
 */

import { RigidBody } from "@react-three/rapier";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import Glass from "../mat/Glass";
import { useRef } from "react";
import MatJotai from "../mat/MatJotai";

const Boxes = ({ colors, jotai = 1, size = [1, 1, 1], ...props }) => {
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

            {/* 以下ブーリアン処理 */}
            <Subtraction scale={[size[0] / 1.2, size[1] / 1.2, size[2] * 2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[size[0] / 1.2, size[1] * 2, size[2] / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            {/* 十字くり抜き */}
            <Subtraction
              scale={[size[0] * sMax, size[1] / 1.2, size[2] * sSmall]}
            >
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction
              scale={[size[0] * sMax, size[1] * sSmall, size[2] / 1.2]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <MatJotai jotai={jotai} color={colors} />
            </Subtraction>
          </Geometry>
          <Glass />
        </mesh>
      </RigidBody>
    </>
  );
};
export default Boxes;
