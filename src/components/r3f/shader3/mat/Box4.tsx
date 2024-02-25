/** boxを使ったシェーダーテスト関数4
 * 実装参考：
 * 公式のサンプルコードを参考にした
 * このboxに使ったシェーダー回り：
 * https://github.com/pmndrs/drei?tab=readme-ov-file#meshtransmissionmaterial
 */

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef, useEffect } from "react";

// boxの作成
export default function Box4({ objectName, ...props }) {
  const ref = useRef();
  const options = useMemo(() => {
    return {
      x: {
        value: props.position[0],
        min: 0,
        max: Math.PI * 2,
        step: 0.01,
      },
      y: { value: props.position[1], min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: props.position[2], min: 0, max: Math.PI * 2, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      color: { value: "aquamarine" },
    };
  }, []);

  const pBase = useControls(objectName.name, options);

  return (
    <mesh
      castShadow
      receiveShadow
      {...props}
      ref={ref}
      position={[pBase.x, pBase.y, pBase.z]}
      rotation={[pBase.rx, pBase.ry, pBase.rz]}
      scale={[pBase.size, pBase.size, pBase.size]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial transmissionSampler />
    </mesh>
  );
}
