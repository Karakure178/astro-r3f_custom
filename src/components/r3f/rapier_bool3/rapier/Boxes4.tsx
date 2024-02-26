/** 物理演算を使ったboxの作成4
 * 実装参考：
 * propsで渡す値の調整回り(object rest spread)：
 * https://zenn.dev/ynakamura/articles/e562376735d398
 */

import { RigidBody } from "@react-three/rapier";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { useRef } from "react";
import MatJotai from "../mat/MatJotai";

const Boxes = ({ colors, jotai = 1, size = [1, 1, 1], ...props }) => {
  const meshRef = useRef();

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

            <Subtraction scale={[1 / 1.2, 1 / 1.2, 2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[1 / 1.2, 2, 1 / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            {/*  */}
            <Subtraction scale={[1 / 1.2, 1 / 1.2, 2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[1 / 1.2, 2, 1 / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[2, 1 / 1.2, 1 / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>
          </Geometry>
          <MatJotai jotai={jotai} color={colors} />
        </mesh>
      </RigidBody>
    </>
  );
};
export default Boxes;
