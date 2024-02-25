/** boxのくり抜きオブジェクトを作成する
 * 実装参考
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 *
 */

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useControls } from "leva";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";

export default function boxBool({
  position = [0, 0, 0],
  size = 1,
  objectName = "Sphere",
}) {
  // leva処理(全体)
  const options = useMemo(() => {
    return {
      x: { value: position[0], min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: position[1], min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: position[2], min: 0, max: Math.PI * 2, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: size, min: 0, max: 100, step: 0.01 },
      color: { value: "black" },
    };
  }, [position, size]);
  const pBase = useControls(objectName, options);

  // leva処理(くり抜き部分、部分的編)
  const options2 = useMemo(() => {
    return {
      x: { value: position[0], min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: position[1], min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: position[2], min: 0, max: Math.PI * 2, step: 0.01 },
      sx: { value: 2, min: 0, max: 100, step: 0.01 },
      sy: { value: 2, min: 0, max: 100, step: 0.01 },
      sz: { value: 0.4, min: 0, max: 100, step: 0.01 },
    };
  }, [position]);
  const pSub = useControls("subBox", options2);

  return (
    <mesh castShadow receiveShadow>
      <Geometry>
        <Base
          position={[pBase.x, pBase.y, pBase.z]}
          rotation={[pBase.rx, pBase.ry, pBase.rz]}
          scale={[pBase.size, pBase.size, pBase.size]}
        >
          <sphereGeometry args={[1, 1, 1]} />
        </Base>

        <Subtraction
          position={[pBase.x, pBase.y, pBase.z]}
          rotation={[pBase.rx, pBase.ry, pBase.rz]}
          scale={[pBase.size / 1.2, pBase.size / 1.2, pBase.size / 1.2]}
        >
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        {/* scale={[2, 2, 0.1]} position={[0, 0.5, 0]} */}

        <Subtraction
          position={[pSub.x, pSub.y, pSub.z]}
          scale={[pSub.sx, pSub.sy, pSub.sz]}
        >
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
        color={pBase.color}
      />
    </mesh>
  );
}
