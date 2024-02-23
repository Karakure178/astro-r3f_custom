// 物理演算の世界を作る
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";

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
