import { useLoader } from "@react-three/fiber";

import { Vector2, ShaderMaterial, TextureLoader, DoubleSide } from "three";
import { forwardRef } from "react";

import fs from "../shader/normal.frag";
import vx from "../shader/normal.vert";

const Box = forwardRef(({ size = 1, ...props }, ref) => {
  // 以降テクスチャ絡みの設定
  const fragmentShader = fs;
  const vertexShader = vx;
  const img = "public/assets/img/f_rect.png";
  const tex = useLoader(TextureLoader, img);

  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new Vector2() },
      u_mouse: { type: "v2", value: new Vector2() },
      u_texture: { type: "t", value: tex },
    },
  });
  material.side = DoubleSide;

  return (
    <>
      <mesh ref={ref} material={material} scale={[size, size, size]} {...props}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </>
  );
});

export default Box;
