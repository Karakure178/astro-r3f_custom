import * as THREE from "three";

// threejsにテクスチャとして渡す
export let texture;
export const sketch = (props: any) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // キャンバスサイズの設定
  context.width = 512;
  context.height = 512;

  // 枠の描画開始
  context.beginPath();
  context.strokeStyle = "#FFFF00";
  context.lineWidth = 4.0;
  context.strokeRect(0, 0, 256, 128);
  context.stroke();

  // 文字の描画開始
  context.beginPath();
  // 文字色指定
  context.fillStyle = "#FFFF00";
  // フォントサイズとスタイルの定義
  context.font = "100px sans-serif";
  // 文字の表示位置指定
  context.textAlign = "center";
  context.textBaseline = "middle";
  // 文字、文字の開始位置、最大幅
  context.fillText("あいうえお", 128, 64, 230);
  context.fill();

  // テクスチャの作成
  texture = new THREE.Texture(canvas);

  // これをやらないとマテリアルは真っ暗
  texture.needsUpdate = true;
};
