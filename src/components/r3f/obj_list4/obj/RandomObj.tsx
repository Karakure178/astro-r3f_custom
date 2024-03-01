import BoxBool3 from "./BoxBool3";
import BoxBool6 from "./BoxBool6";

// 条件分岐するオブジェクト関数
const RandomObj = ({
  jotai = 1,
  size,
  colors = "fff",
  colors2 = "fff",
  ...props
}) => {
  return (
    <>
      {jotai === 1 ? (
        <BoxBool3 colors={colors} size={size} {...props} />
      ) : (
        <BoxBool6 colors={colors2} size={size} {...props} />
      )}
    </>
  );
};
export default RandomObj;
