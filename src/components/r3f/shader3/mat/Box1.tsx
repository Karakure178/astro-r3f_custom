/** boxを使ったシェーダーテスト関数
 * 実装参考：
 *
 * 主に骸骨のにじみのやつを参考にした
 * このboxに使ったシェーダー回り：
 * https://codesandbox.io/p/sandbox/meshtransmissionmaterial-hmgdjq?file=%2Fsrc%2FApp.js%3A52%2C1-53%2C33
 * https://codesandbox.io/embed/meshtransmission-vanilla-r3z7nv?codemirror=1
 */

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef, useEffect } from "react";

// boxの作成
export default function Box1({ objectName, ...props }) {
  const ref = useRef();
  // console.log("Box1", props.position);
  // なぜかposition[0]で指定しないといけない
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
      color: { value: "lime" },
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
      <MeshTransmissionMaterial
        transmissionSampler={false}
        backside={false}
        color={pBase.color}
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={4.5}
        envMapIntensity={1}
        transmission={1}
        clearcoat={1}
        clearcoatRoughness={0}
        chromaticAberration={0.03}
        ior={1.5}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.2}
        attenuationDistance={0.5}
        attenuationColor={"#ffffff"}
      />
    </mesh>
  );
}
