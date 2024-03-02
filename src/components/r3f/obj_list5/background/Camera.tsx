import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";

extend({ OrbitControls });
// camera control
// https://codesandbox.io/p/sandbox/r3f-orbit-controls-un2oh?file=%2Fsrc%2Findex.js%3A9%2C1-14%2C2
const Controls = () => {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
};

export default Controls;
