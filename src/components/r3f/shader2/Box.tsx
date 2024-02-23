import { Geometry, Base, Subtraction } from "@react-three/csg";
import { BoxBlendGeometry } from "./BoxBlendGeometry";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

// boxの作成
export default function WhiteShape(props) {
  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
    };
  }, []);

  const { depth, color } = useControls({
    depth: 0.5,
    color: { value: "lime" },
  });

  const pBase = useControls("Base", options); // size:2.0,
  const pSub = useControls("Subtraction", options); // size:1.8, y:0.7

  return (
    // scale={[pBase.size, pBase.size, pBase.size]}
    // <RigidBody position={[0, -1, 0]} type="fixed" colliders="false">
    <mesh castShadow receiveShadow {...props}>
      <Geometry>
        <Base rotation={[pBase.rx, pBase.ry, pBase.rz]} scale={[2, 2, 2]}>
          <BoxBlendGeometry depth={0.4} />
        </Base>

        {/* 下が切り抜き */}
        {/* position={[pSub.x, pSub.y, pSub.z]} */}
        {/* scale={[pSub.size, pSub.size, pSub.size]} */}
        <Subtraction
          position={[pSub.x, 0.7, pSub.z]}
          rotation={[pSub.rx, pSub.ry, pSub.rz]}
          scale={[1.8, 1.8, 1.8]}
        >
          <BoxBlendGeometry />
        </Subtraction>
      </Geometry>
      <MeshTransmissionMaterial
        color={color}
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={1}
      />
    </mesh>
    // </RigidBody>
  );
}
