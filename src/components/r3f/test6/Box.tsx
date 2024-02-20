import { Vector2, ShaderMaterial } from "three";
import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";

// boxの作成
export default function Box(props) {
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
      <mesh {...props} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
    </>
  );
}
