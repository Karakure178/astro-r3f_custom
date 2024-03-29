/** boxを使ったシェーダーテスト関数6
 * box2とbox5の設定のあいのこ
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
      sx: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      sy: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      sz: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      color: { value: "#4173c687" },
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
        transmissionSampler={false}
        backside={true}
        backsideThickness={2}
        resolution={1024}
        backsideResolution={512}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.4}
        anisotropy={0.3}
        distortion={0.0}
        distortionScale={0.3}
        temporalDistortion={0.65}
        attenuationDistance={0.5}
        clearcoat={0}
        attenuationColor={"#ffffff"}
        color={pBase.color}
        samples={10}
        thickness={0.5}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
}
