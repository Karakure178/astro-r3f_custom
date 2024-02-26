/** 物理演算を使ったboxの作成
 * 実装参考：
 * propsで渡す値の調整回り(object rest spread)：
 * https://zenn.dev/ynakamura/articles/e562376735d398
 */

import { RigidBody } from "@react-three/rapier";
import { MeshTransmissionMaterial } from "@react-three/drei";

const Boxes = ({ colors = "orange", ...props }) => {
  // console.log(colors);
  // console.log(props);
  return (
    <>
      <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2}>
        <group scale={[0.3, 0.3, 0.3]}>
          <mesh {...props} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <MeshTransmissionMaterial transmissionSampler />
          </mesh>

          <mesh {...props} receiveShadow castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <MeshTransmissionMaterial
              color={colors}
              resolution={1024}
              samples={16}
              thickness={1}
              roughness={0.5}
              envMapIntensity={1}
              transmission={1}
            />
          </mesh>
        </group>
      </RigidBody>
    </>
  );
};
export default Boxes;
