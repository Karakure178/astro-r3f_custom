/** boxのくり抜きオブジェクトを作成する6
 * 実装参考
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 *
 */

import * as THREE from "three";
import { useRef, useMemo, createRef, forwardRef } from "react";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";

const BoxBool6 = forwardRef(({ size = 1, colors = "black", ...props }, ref) => {
  const sMax = 2;
  const sSmall = 0.3;
  return (
    <mesh
      castShadow
      receiveShadow
      scale={[size, size, size]}
      {...props}
      ref={ref}
    >
      <Geometry>
        <Base>
          <boxGeometry args={[1, 1, 1]} />
        </Base>

        {/* 以下ブーリアン処理 */}
        {/* 十字くり抜き1 */}
        <Subtraction scale={[1 / 1.2, sSmall, sMax]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sSmall, size / 1.2, sMax]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        {/* 十字くり抜き2 */}
        <Subtraction scale={[size / 1.2, sMax, sSmall]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sSmall, sMax, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        {/* 十字くり抜き2 */}
        <Subtraction scale={[sMax, size / 1.2, sSmall]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sMax, sSmall, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>
      </Geometry>

      <MeshTransmissionMaterial
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={0}
        metalness={0}
        color={colors}
      />
    </mesh>
  );
});

export default BoxBool6;
