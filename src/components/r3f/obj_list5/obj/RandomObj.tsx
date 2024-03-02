import BoxBool3 from "./BoxBool3";
import BoxBool6 from "./BoxBool6";
import { useRef, forwardRef } from "react";

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
export default RandomObj;
