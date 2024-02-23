/** 物理演算の世界を作る関数
 * 実装参考：
 * 当たり判定固定(静的)回り：
 * https://codesandbox.io/p/sandbox/bruno-simons-20k-challenge-857z1i?file=%2Fsrc%2FApp.js
 * https://codesandbox.io/p/sandbox/pensive-drake-66cd7?
 *
 * vueのslot的なことをやる：
 * https://blog.capilano-fw.com/?p=11118
 *
 *
 */

import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useControls } from "leva";
import { ComponentSlot } from "@components/common/helper/Componentslot";

export default function World(props) {
  const { debug } = useControls({ debug: false });

  const slot = new ComponentSlot(props.children);
  const obj = slot.get("object", "-");

  return (
    <>
      {/* 以下物理演算 */}
      <Physics gravity={[0, -30, 0]} colliders="cuboid" debug={debug}>
        <RigidBody position={[0, -1, 0]} type="fixed" colliders="false">
          <CuboidCollider restitution={0.01} args={[1000, 1, 1000]} />
        </RigidBody>
        {/* ここにslot的なことやりたい */}
        {obj}
      </Physics>

      {/* なぜか以下がないと影が描画されない */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </>
  );
}
