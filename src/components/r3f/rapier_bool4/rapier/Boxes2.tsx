/** 物理演算を使ったboxの作成
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
  const sMax = 2;
  const sSmall = 0.3;

  return (
    <>
      <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2}>
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
            <Subtraction scale={[sSmall / 1.2, sSmall / 1.2, sSmall * 2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[sSmall / 1.2, sSmall * 2, sSmall / 1.2]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            {/* 十字くり抜き */}
            <Subtraction scale={[sSmall * sMax, sSmall / 1.2, sSmall * sSmall]}>
              <boxGeometry args={[1, 1, 1]} />
            </Subtraction>

            <Subtraction scale={[sSmall * sMax, sSmall * sSmall, sSmall / 1.2]}>
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
