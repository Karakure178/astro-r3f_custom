import RandomObj from "../obj/RandomObj";
import { useFrame, Canvas } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";
import { useRef, createRef } from "react";

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
  const jotais = [];
  const scales = [];
  const num = 3;

  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    colors2.push([]);
    scales.push([]);
    // meshRef.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([i, 0.5, j]);
      const scale = map(Math.random(), 0, 1, 0.7, 1);
      scales[i].push([scale, scale, scale]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
      colors2[i].push(colorBox2[Math.floor(Math.random() * colorBox2.length)]);
      //meshRef[i].push(useRef());
    }
  }
  useFrame(({ clock }) => {
    // for (let i = 0; i < num; i++) {
    //   for (let j = 0; j < num; j++) {
    //     meshRef[i][j].current.position.x = clock.elapsedTime;
    //   }
    // }
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

  //   const list = positions.map((position, i) =>
  //     position.map((pos, j) => (
  //       <RandomObj
  //         jotai={Math.floor(Math.random() * 2) + 1}
  //         position={pos}
  //         colors={colors[i][j]}
  //         colors2={colors2[i][j]}
  //         scale={scales[i][j]}
  //         ref={meshRef[i][j]}
  //       />
  //     ))
  //   );
  return list;
};

export default GridAnime;
