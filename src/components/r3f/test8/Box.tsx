import { Geometry, Base, Subtraction } from "@react-three/csg";
import { BoxBlendGeometry } from "./BoxBlendGeometry";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo } from "react";

// boxの作成
export default function WhiteShape(props) {
  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: "lime" },
    };
  }, []);

  const { depth, sub_rotation, sub_sizeX, sub_sizeY, sub_sizeZ } = useControls({
    depth: 0.5,
    sub_rotation: { value: Math.PI / 10, min: -Math.PI / 2, max: Math.PI / 2 },
    sub_sizeX: { value: 0, min: 0, max: 1 },
    sub_sizeY: { value: 0.5, min: 0, max: 1 },
    sub_sizeZ: { value: 0.5, min: 0, max: 1 },
  });

  const pA = useControls("Base", options);
  const pB = useControls("Subtraction", options);

  return (
    <mesh castShadow receiveShadow {...props}>
      <Geometry>
        <Base rotation={[0, -Math.PI / 2, 0]}>
          <BoxBlendGeometry depth={depth} />
        </Base>

        {/* 下が切り抜き */}
        <Subtraction
          position={[sub_sizeX, sub_sizeY, sub_sizeZ]}
          rotation={[0, sub_rotation, 0]}
        >
          <BoxBlendGeometry />
        </Subtraction>
      </Geometry>
      <MeshTransmissionMaterial
        color={"orange"}
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={1}
      />
    </mesh>
  );
}
