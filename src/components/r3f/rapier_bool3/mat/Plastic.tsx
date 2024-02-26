/** プラスチックな質感関数
 */

import { MeshTransmissionMaterial } from "@react-three/drei";

export default function Plastic({ color = "#9195F6" }) {
  return (
    <MeshTransmissionMaterial
      resolution={1024}
      samples={16}
      thickness={1}
      roughness={0.5}
      envMapIntensity={1}
      transmission={1}
      color={color}
    />
  );
}
