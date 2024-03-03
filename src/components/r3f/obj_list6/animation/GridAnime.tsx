import { useFrame } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";
import { createRef } from "react";
import RandomObj from "../obj/RandomObj";

// アニメーション関連
import { motions } from "./motion";

/**
 * grid animation
 */
const GridAnime = () => {
  let oddframe = motions();
  const meshRef = [];

  const colorBox = ["#116D6E", "#DDE6ED", "#FB8B24", "#CD1818"];
  const colorBox2 = ["#DCF2F1", "#7FC7D9", "#365486", "#0F1035"];

  const colors = [];
  const colors2 = [];

  const positions = [];
  const scales = [];
  const num = 4;

  for (let i = 0; i < num; i++) {
    positions.push([]);
    colors.push([]);
    colors2.push([]);
    scales.push([]);
    meshRef.push([]);
    for (let j = 0; j < num; j++) {
      positions[i].push([i * 0.6, 0.5, j * 0.6]);
      const scale = 0.5; //map(Math.random(), 0, 1, 0.7, 1);
      scales[i].push([scale, scale, scale]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
      colors2[i].push(colorBox2[Math.floor(Math.random() * colorBox2.length)]);
      meshRef[i].push(createRef());
    }
  }
  useFrame(({ clock }) => {
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
          const frame = map(oddframe.count, 0, 1, 0, 0.5);
          meshRef[i][j].current.position.y = frame;
        } else {
          const frame = map(oddframe.count, 0, 1, 0.5, 0);
          meshRef[i][j].current.position.y = frame;
        }
      }
    }
  });

  const list = positions.map((position, i) =>
    position.map((pos, j) => (
      <RandomObj
        jotai={Math.floor(Math.random() * 2) + 1}
        position={pos}
        colors={colors[i][j]}
        colors2={colors2[i][j]}
        scale={scales[i][j]}
        ref={meshRef[i][j]}
      />
    ))
  );

  return list;
};

export default GridAnime;
