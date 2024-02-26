/**曇りガラステスト
 * box2とbox5の設定のあいのこ
 */

import { MeshTransmissionMaterial } from "@react-three/drei";

export default function Glass({ color = "#ffffff" }) {
  return (
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
      color={color}
      samples={10}
      thickness={0.5}
      roughness={0.2}
      envMapIntensity={1}
    />
  );
}
