import RandomObj from "../obj/RandomObj";
import { useFrame, Canvas } from "@react-three/fiber";
import { map } from "@assets/ts/libs/map";

// アニメーション関連
import { motions } from "./motion";

/**
 * grid animation
 */
const GridAnime = () => {
  let oddframe;

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
    for (let j = 0; j < num; j++) {
      positions[i].push([i, 0.5, j]);
      const scale = map(Math.random(), 0, 1, 0.7, 1);
      scales[i].push([scale, scale, scale]);
      colors[i].push(colorBox[Math.floor(Math.random() * colorBox.length)]);
      colors2[i].push(colorBox2[Math.floor(Math.random() * colorBox2.length)]);
    }
  }

  const list = positions.map((position, i) =>
    position.map((pos, j) => (
      <RandomObj
        jotai={Math.floor(Math.random() * 2) + 1}
        position={pos}
        colors={colors[i][j]}
        colors2={colors2[i][j]}
        scale={scales[i][j]}
      />
    ))
  );
  return list;
};

export default GridAnime;
