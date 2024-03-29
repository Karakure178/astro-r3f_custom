import { Vector2, ShaderMaterial } from "three";
import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

// boxの作成
export default function Box(props) {
  // repierの設定を記述する

  const meshRef = useRef();
  const { name, positionX, positionY, positionZ, boxPosition } = useControls({
    name: "World",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    boxPosition: { value: [0.1, 0.1] },
  });

  useFrame(({ clock }) => {
    meshRef.current.scale.x = Math.sin(clock.elapsedTime + props.scales);
    meshRef.current.scale.y = Math.sin(clock.elapsedTime + props.scales);
    meshRef.current.scale.z = Math.sin(clock.elapsedTime + props.scales);
  });

  return (
    <>
      <RigidBody colliders={"cuboid"} restitution={2}>
        <mesh {...props} ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </RigidBody>

      <CuboidCollider
        position={[0, -2, 0]}
        args={[20, 0.5, 20]}
        color={"green"}
      />
    </>
  );
}
