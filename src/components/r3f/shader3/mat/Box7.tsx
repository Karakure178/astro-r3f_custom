/** boxを使ったシェーダーテスト関数7
 * 曇りガラステスト
 */

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef } from "react";

// boxの作成
export default function Box7({ objectName, ...props }) {
  const ref = useRef();
  const options = useMemo(() => {
    return {
      x: {
        value: props.position[0],
        min: 0,
        max: Math.PI * 4,
        step: 0.01,
      },
      y: { value: props.position[1], min: 0, max: Math.PI * 4, step: 0.01 },
      z: { value: props.position[2], min: 0, max: Math.PI * 4, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: 0.01, min: 0, max: Math.PI * 2, step: 0.01 },
      color: { value: "fff" },
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
      scale={[0.01, 0.01, 0.01]}
    >
      <boxGeometry args={[5, 100, 100]} />
      <MeshTransmissionMaterial
        color={pBase.color}
        backside={false}
        samples={16}
        resolution={256}
        transmission={0.95}
        roughness={0.5}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        thickness={200}
        backsideThickness={200}
        ior={1.5}
        chromaticAberration={1}
        anisotropy={1}
        distortion={0}
        distortionScale={0.2}
        temporalDistortion={0}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
      />
    </mesh>
  );
}
