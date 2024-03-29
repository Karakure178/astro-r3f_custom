import { useLoader } from "@react-three/fiber";

import { TextureLoader, DoubleSide, MeshBasicMaterial } from "three";
import { forwardRef } from "react";

// https://notetoself-dy.com/three-js-box-different-exture/
const Box = forwardRef(({ size = 1, ...props }, ref) => {
  // 以降テクスチャ絡みの設定
  const img = "public/assets/img/t_rect_silver.png";
  const img2 = "public/assets/img/t_rect_red.png";
  const img3 = "public/assets/img/t_rect_black.png";

  //マテリアルにテクスチャ貼り付け
  let material = [
    new MeshBasicMaterial({ map: useLoader(TextureLoader, img3) }),
    new MeshBasicMaterial({ map: useLoader(TextureLoader, img2) }),
    new MeshBasicMaterial({ map: useLoader(TextureLoader, img) }),
    new MeshBasicMaterial({ map: useLoader(TextureLoader, img3) }),
    new MeshBasicMaterial({ map: useLoader(TextureLoader, img2) }),
  ];
  // material.side = DoubleSide;

  return (
    <>
      <mesh ref={ref} material={material} scale={[size, size, size]} {...props}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </>
  );
});

export default Box;
