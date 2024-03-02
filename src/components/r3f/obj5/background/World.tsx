/** ソフトシャドウを反映させるための背景関数
 * 実装参考：
 * https://codesandbox.io/p/sandbox/soft-shadows-dh2jc?file=%2Fsrc%2FApp.js
 */
export default function World(props) {
  return (
    <>
      {/* なぜか以下がないと影が描画されない */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </>
  );
}
