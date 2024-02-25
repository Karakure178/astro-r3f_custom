/** boxのくり抜きオブジェクトを作成する6
 * 実装参考
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 *
 * マテリアル回り
 * https://codesandbox.io/p/sandbox/spline-glass-shapes-forked-vml2hk?file=%2Fsrc%2FApp.js%3A81%2C12
 *
 */

import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useControls } from "leva";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function boxBool6({
  position = [0, 0, 0],
  size = 1,
  objectName = "box6",
  subName = "subBox6",
}) {
  // leva処理(全体)
  const options = useMemo(() => {
    return {
      x: { value: position[0], min: 0, max: 100, step: 0.01 },
      y: { value: position[1], min: 0, max: 100, step: 0.01 },
      z: { value: position[2], min: 0, max: 100, step: 0.01 },
      rx: {
        value: 0,
        min: -Math.PI / 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      ry: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      rz: { value: 0, min: -Math.PI / 2, max: Math.PI * 2, step: 0.01 },
      size: { value: size, min: 0, max: 100, step: 0.01 },
      color: { value: "black" },
    };
  }, [position, size]);
  const pBase = useControls(objectName, options);

  // leva処理(くり抜き部分、部分的編)
  const options2 = useMemo(() => {
    return {
      sMax: { value: 2, min: 0, max: 100, step: 0.01 },
      sSmall: { value: 0.3, min: 0, max: 100, step: 0.01 },
    };
  }, []);
  const pSub = useControls(subName, options2);

  const config = useControls({
    backside: false,
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 256, min: 64, max: 2048, step: 64 },
    transmission: { value: 0.95, min: 0, max: 1 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 200, min: 0, max: 200, step: 0.01 },
    backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 1, min: 0, max: 1 },
    anisotropy: { value: 1, min: 0, max: 10, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
  });

  return (
    <RigidBody type="fixed">
      <mesh renderOrder={100} castShadow receiveShadow>
        <Geometry>
          <Base
            position={[pBase.x, pBase.y, pBase.z]}
            scale={[pBase.size, pBase.size, pBase.size]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Base>

          {/* 以下ブーリアン処理 */}
          {/* 十字くり抜き1 */}
          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pBase.size / 1.2, pSub.sSmall, pSub.sMax]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>

          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pSub.sSmall, pBase.size / 1.2, pSub.sMax]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>

          {/* 十字くり抜き2 */}
          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pBase.size / 1.2, pSub.sMax, pSub.sSmall]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>

          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pSub.sSmall, pSub.sMax, pBase.size / 1.2]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>

          {/* 十字くり抜き2 */}
          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pSub.sMax, pBase.size / 1.2, pSub.sSmall]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>

          <Subtraction
            position={[pBase.x, pBase.y, pBase.z]}
            rotation={[pBase.rx, pBase.ry, pBase.rz]}
            scale={[pSub.sMax, pSub.sSmall, pBase.size / 1.2]}
          >
            <boxGeometry args={[100, 100, 100]} />
          </Subtraction>
        </Geometry>

        {/* <MeshTransmissionMaterial
          resolution={1024}
          samples={16}
          roughness={0.5}
          envMapIntensity={1}
          metalness={0}
          color={"fff"}
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
        /> */}
        <MeshTransmissionMaterial {...config} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}
