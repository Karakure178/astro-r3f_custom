/** boxのくり抜きオブジェクトを作成する3
 * 実装参考
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 *
 */

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useControls, Leva } from "leva";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";

export default function boxBool3({ size = 0.5, color = "black", ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <Geometry>
        <Base scale={[size, size, size]}>
          <boxGeometry args={[1, 1, 1]} />
        </Base>

        <Subtraction scale={[size / 1.2, size / 1.2, size * 2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[size / 1.2, size * 2, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[size * 2, size / 1.2, size / 1.2]}>
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
        color={color}
      />
    </mesh>
  );
}
