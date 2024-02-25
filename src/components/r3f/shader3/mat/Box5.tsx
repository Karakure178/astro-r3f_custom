/** boxを使ったシェーダーテスト関数5
 * 実装参考：
 * 公式のサンプルコードを参考にした
 * このboxに使ったシェーダー回り：
 * https://twitter.com/0xca0a/status/1618265163995709440
 * https://codesandbox.io/p/sandbox/meshepoxymaterial-forked-247izq?file=%2Fsrc%2FApp.js%3A61%2C100-61%2C158
 *
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
      <MeshTransmissionMaterial
        transmissionSampler={false}
        backside={true}
        backsideThickness={2}
        samples={10}
        resolution={1024}
        backsideResolution={512}
        transmission={1}
        roughness={0.0}
        ior={1.5}
        thickness={0.25}
        chromaticAberration={0.4}
        anisotropy={0.3}
        distortion={0.0}
        distortionScale={0.3}
        temporalDistortion={0.65}
        attenuationDistance={0.5}
        clearcoat={0}
        attenuationColor={"#ffffff"}
        color={"white"}
      />
    </mesh>
  );
}
