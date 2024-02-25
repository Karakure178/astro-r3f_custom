/** boxを使ったシェーダーテスト関数2
 * 実装参考：
 * すりガラスっぽい質感を使った
 * このboxに使ったシェーダー回り：
 * https://codesandbox.io/p/sandbox/multi-select-edges-ny3p4?file=%2Fsrc%2FApp.js%3A36%2C7-36%2C84
 */

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef, useEffect } from "react";

// boxの作成
export default function Box2({ objectName, ...props }) {
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
      sx: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      sy: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      sz: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      color: { value: "orange" },
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
      scale={[pBase.sx, pBase.sy, pBase.sz]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        color={pBase.color}
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
