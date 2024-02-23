/** boxを使ったシェーダーテスト関数1
 * 実装参考：
 * このboxに使ったシェーダー回り：
 * https://codesandbox.io/p/sandbox/meshtransmissionmaterial-hmgdjq?
 * https://codesandbox.io/p/sandbox/multi-select-edges-ny3p4?file=%2Fsrc%2FApp.js%3A22%2C56
 */

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo } from "react";

// boxの作成
export default function Box1({ props, objectName }) {
  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      color: { value: "lime" },
    };
  }, []);

  const pBase = useControls(objectName.name, options);

  return (
    <mesh
      castShadow
      receiveShadow
      {...props}
      rotation={[pBase.rx, pBase.ry, pBase.rz]}
      scale={[pBase.size, pBase.size, pBase.size]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        color={color}
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={1}
      />
    </mesh>
  );
}
