/**
 * 何を血迷ったのかドーナツでドーナツをくり抜いてる
 * 実装参考
 *
 * ドーナツ型のジオメトリを作成する:
 * https://threejs.org/docs/#api/en/geometries/TorusGeometry
 * https://sbcode.net/react-three-fiber/usetrimesh-materials/
 * https://onion2k.github.io/r3f-by-example/examples/materials/glowing-torus/
 */

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useControls } from "leva";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";

export default function Tori({
  args = [1, 0.4, 12, 48],
  position = [0, 0, 0],
  objectName = "Tori",
  ...props
}) {
  const geometry = useMemo(() => new THREE.TorusGeometry(...args), [args]);

  const num = 10;

  // leva処理(全体)
  const options = useMemo(() => {
    return {
      x: { value: position[0], min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: position[1], min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: position[2], min: 0, max: Math.PI * 2, step: 0.01 },
      rx: {
        value: -Math.PI / 2,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: 1, min: 0, max: 100, step: 0.01 },
      color: { value: "lime" },

      radius: { value: args[0], min: 0, max: 100, step: 0.01 },
      tube: { value: args[1], min: 0, max: 100, step: 0.01 },
      radialSegments: { value: args[2], min: 0, max: 100, step: 1 },
      tubularSegments: { value: args[3], min: 0, max: 100, step: 1 },
    };
  }, [position, args]);
  const pBase = useControls("Base", options); // size:2.0,

  return (
    <mesh castShadow receiveShadow {...props}>
      <Geometry>
        <Base
          position={[pBase.x, pBase.y, pBase.z]}
          rotation={[pBase.rx, pBase.ry, pBase.rz]}
          scale={[pBase.size, pBase.size, pBase.size]}
        >
          <torusGeometry
            args={[
              pBase.radius,
              pBase.tube,
              pBase.radialSegments,
              pBase.tubularSegments,
            ]}
          />
        </Base>

        {/* 下が切り抜き */}
        <Subtraction
          position={[pBase.x, pBase.y, pBase.z]}
          rotation={[pBase.rx, pBase.ry, pBase.rz]}
          scale={[pBase.size / 1.1, pBase.size / 1.1, pBase.size / 1.1]}
        >
          <torusGeometry
            args={[
              pBase.radius,
              pBase.tube,
              pBase.radialSegments,
              pBase.tubularSegments,
            ]}
          />
        </Subtraction>
      </Geometry>

      <MeshTransmissionMaterial
        transmissionSampler={false}
        backside={true}
        backsideThickness={2}
        resolution={1024}
        backsideResolution={512}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.4}
        anisotropy={0.3}
        distortion={0.0}
        distortionScale={0.3}
        temporalDistortion={0.65}
        attenuationDistance={0.5}
        clearcoat={0}
        attenuationColor={"#ffffff"}
        color={pBase.color}
        samples={3}
        thickness={0.5}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
}
