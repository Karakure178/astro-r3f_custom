/**
 * マテリアルの状態分岐する関数
 * props:1 - glass関数を渡す
 * props:2 - プラスチック関数を渡す
 * props:3 - やわらかい質感関数を渡す
 */
import Plastic from "./Plastic";
import Soft from "./Soft";
import Glass from "./Glass";

export default function MatJotai({ jotai = 1, color = "#9195F6" }) {
  // 渡されるpropsによって条件分岐する関数(クラスコンポーネント時代のやり方のため使えない)
  // 参考：https://www.yoheim.net/blog.php?q=20180409
  function branchMaterial() {
    consoe.log(jotai, "jotai");
    if (jotai === 1) {
      return <Glass />;
    } else if (jotai === 2) {
      return <Plastic />;
    } else {
      return <Soft />;
    }
  }
  return (
    <>
      {jotai === 1 ? (
        <Glass color={color} />
      ) : jotai === 2 ? (
        <Plastic color={color} />
      ) : (
        <Soft color={color} />
      )}
    </>
  );
}
