/** 物理演算を使ったboxの作成
 * 実装参考：
 * propsで渡す値の調整回り(object rest spread)：
 * https://zenn.dev/ynakamura/articles/e562376735d398
 */

import { MeshTransmissionMaterial } from "@react-three/drei";

const TestObj = ({ props }) => {
  return (
    <>
      <mesh {...props} castShadow scale={100} renderOrder={100}>
        <boxGeometry args={[0.8, 0.8, 0.07]} />
        <MeshTransmissionMaterial
          resolution={1024}
          samples={16}
          roughness={0.5}
          envMapIntensity={1}
          metalness={0}
          color={"orange"}
          backside={false}
          transmission={0.95}
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
          attenuationColor={"#ffffff"}
          toneMapped={false}
        />
      </mesh>
    </>
  );
};
export default TestObj;
