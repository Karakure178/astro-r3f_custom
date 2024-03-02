// import RandomObj from "../obj/RandomObj";
import { useFrame, Canvas } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";
import { useRef, createRef, useMemo, forwardRef } from "react";
import { Geometry, Base, Subtraction, Addition } from "@react-three/csg";
import { MeshTransmissionMaterial } from "@react-three/drei";

// アニメーション関連
import { motions } from "./motion";

/**
 * grid animation
 */
const GridAnime = () => {
  let oddframe = motions();
  const meshRef = useRef([]);
  meshRef.current[0] = createRef();
  meshRef.current[1] = createRef();

  const colorBox = ["#116D6E", "#DDE6ED", "#FB8B24", "#CD1818"];
  const colorBox2 = ["#DCF2F1", "#7FC7D9", "#365486", "#0F1035"];

  const colors = [];
  const colors2 = [];

  const positions = [];
  const scales = [];
  const num = 3;

  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    colors2.push([]);
    scales.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([i, 0.5, j]);
      const scale = map(Math.random(), 0, 1, 0.7, 1);
      scales[i].push([scale, scale, scale]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
      colors2[i].push(colorBox2[Math.floor(Math.random() * colorBox2.length)]);
    }
  }
  useFrame(({ clock }) => {
    meshRef.current[0].current.position.x = clock.elapsedTime;
    meshRef.current[1].current.position.y = clock.elapsedTime;
  });

  const list = [
    <RandomObj
      jotai={Math.floor(Math.random() * 2) + 1}
      position={positions[0][0]}
      colors={colors[0][0]}
      colors2={colors2[0][0]}
      scale={scales[0][0]}
      ref={meshRef.current[0]}
    />,
    <RandomObj
      jotai={Math.floor(Math.random() * 2) + 1}
      position={positions[0][1]}
      colors={colors[0][1]}
      colors2={colors2[0][1]}
      scale={scales[0][1]}
      ref={meshRef.current[1]}
    />,
  ];

  return list;
};

const BoxBool3 = forwardRef(({ size = 1, colors = "black", ...props }, ref) => {
  return (
    <mesh castShadow receiveShadow {...props} ref={ref}>
      <Geometry>
        <Base scale={[size, size, size]}>
          <boxGeometry args={[1, 1, 1]} />
        </Base>

        <Subtraction scale={[size / 1.2, size / 1.2, size * 2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[size / 1.2, size * 2, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[size * 2, size / 1.2, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>
      </Geometry>

      <MeshTransmissionMaterial
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={0}
        metalness={0}
        color={colors}
      />
    </mesh>
  );
});

/** boxのくり抜きオブジェクトを作成する6
 * 実装参考
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 *
 */
const BoxBool6 = forwardRef(({ size = 1, colors = "black", ...props }, ref) => {
  const sMax = 2;
  const sSmall = 0.3;
  return (
    <mesh
      castShadow
      receiveShadow
      scale={[size, size, size]}
      {...props}
      ref={ref}
    >
      <Geometry>
        <Base>
          <boxGeometry args={[1, 1, 1]} />
        </Base>

        {/* 以下ブーリアン処理 */}
        {/* 十字くり抜き1 */}
        <Subtraction scale={[1 / 1.2, sSmall, sMax]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sSmall, size / 1.2, sMax]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        {/* 十字くり抜き2 */}
        <Subtraction scale={[size / 1.2, sMax, sSmall]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sSmall, sMax, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        {/* 十字くり抜き2 */}
        <Subtraction scale={[sMax, size / 1.2, sSmall]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>

        <Subtraction scale={[sMax, sSmall, size / 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </Subtraction>
      </Geometry>

      <MeshTransmissionMaterial
        resolution={1024}
        samples={16}
        thickness={1}
        roughness={0.5}
        envMapIntensity={1}
        transmission={0}
        metalness={0}
        color={colors}
      />
    </mesh>
  );
});

// 条件分岐するオブジェクト関数
const RandomObj = forwardRef(
  ({ jotai = 1, size = 1, colors = "fff", colors2 = "fff", ...props }, ref) => {
    return (
      <>
        {jotai === 1 ? (
          <BoxBool3 colors={colors} size={size} {...props} ref={ref} />
        ) : (
          <BoxBool6 colors={colors2} size={size} {...props} ref={ref} />
        )}
      </>
    );
  }
);

export default GridAnime;
