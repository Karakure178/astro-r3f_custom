import { Geometry, Base, Subtraction } from "@react-three/csg";
import { BoxBlendGeometry } from "./BoxBlendGeometry";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// boxの作成
export default function WhiteShape({ color = "lime", ...props }) {
  return (
    <RigidBody mass={1} colliders="trimesh">
      <mesh castShadow receiveShadow {...props}>
        <Geometry>
          <Base rotation={[-Math.PI / 2, 0, 0]} scale={[2, 2, 2]}>
            <BoxBlendGeometry depth={0.4} />
          </Base>

          {/* 下が切り抜き */}
          <Subtraction
            position={[0, 0.7, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
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
    </RigidBody>
  );
}
