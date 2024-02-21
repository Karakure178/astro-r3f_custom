import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

import { useRef, useEffect } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";

import { useControls } from "leva";
import { CameraControls, Box, Sphere, Circle } from "@react-three/drei";
import "./Fragments.scss";

// シーンを設定する
const Scene = () => {
  const { controls } = useThree();
  const meshRef = useRef();
  const { name, positionX, positionY, positionZ, boxPosition } = useControls({
    name: "World",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    boxPosition: { value: [0.1, 0.1] },
  });

  useEffect(() => {
    if (controls) {
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }
  }, [controls]);

  useFrame(({ clock }) => {});

  return (
    <>
      <CameraControls makeDefault />
    </>
  );
};

// box あたり判定
const Boxes = (props) => {
  const meshRef = useRef();
  const ref = useRef();

  // rigidbodyにpositionを渡す方法
  // https://codesandbox.io/p/sandbox/pensive-drake-66cd7?file=%2Fsrc%2FApp.js%3A51%2C21

  useFrame(({ clock }) => {
    // meshRef.current.position.z = Math.sin(clock.elapsedTime) * 1.3;
    // //console.log(meshRef.current.position, meshRef);
    // // meshRef2.current.position.z = Math.sin(clock.elapsedTime) * 1.3;
    // //meshRef.current.setTranslation({ x: 0, y: 0, z: Math.sin(clock.elapsedTime) * 1.3 });
    // ref.current.setTranslation({
    //   x: 0,
    //   y: 0,
    //   z: Math.sin(clock.elapsedTime) * 1.3,
    // });
  });

  return (
    <>
      <RigidBody>
        <mesh {...props} position={[0, 0, 0]} ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
        <CuboidCollider
          args={[0.8, 0.8, 0.8]}
          position={[0, 0, 0]}
          ref={ref}
          {...props}
          sensor
        />
      </RigidBody>
    </>
  );
};

// 円のあたり判定
const Circles = (props) => {
  const meshRef = useRef();
  const ref = useRef();
  const { name, positionX, positionY, positionZ, boxPosition } = useControls({
    name: "World",
    positionX: 0,
    positionY: 0,
    positionZ: 0,
  });

  useFrame(({ clock }) => {
    meshRef.current.position.z = Math.sin(clock.elapsedTime) * 1.3;
    ref.current.setTranslation(
      {
        x: positionX,
        y: 0,
        z: Math.sin(clock.elapsedTime) * 1.3,
      },
      true,
    );

    // あたり判定のサイズを変えたいが変え方がさっぱりわからない
    // https://stackoverflow.com/questions/77736702/scaling-a-rigidbody-during-runtime
    // こう？
    // ref.current.setMass(Math.sin(clock.elapsedTime));

    // ballRef.current.applyImpulse({ x: 0, y: 15, z: 0 })
    // https://codesandbox.io/p/devbox/game-lmu0pf?file=%2Fsrc%2FBall.jsx%3A36%2C64

    //console.log(ref.current.setMass(Math.sin(clock.elapsedTime)), ref.current);

    // ref.current.setScale({
    //   x: 0,
    //   y: 0,
    //   z: Math.sin(clock.elapsedTime) * 1.3,
    // });
  });

  return (
    <>
      <RigidBody>
        <Circle
          args={[1, 159]}
          rotation={[-Math.PI / 2, 0, 0]}
          ref={meshRef}
          position={[positionX, 0, 0]}
        ></Circle>
        <CuboidCollider
          args={[0.8, 0.1, 0.8]}
          position={[positionX, 0, 0]}
          ref={ref}
          {...props}
          sensor
        />
      </RigidBody>
    </>
  );
};

export default function Fragments() {
  const meshRef = useRef();
  const positions = [
    [0, 0, 0],
    [2, 0, 0],
    [0, 2, 0],
    [0, 0, 2],
  ];
  const scales = [0.1, 0.2, 0.3, 0.4];

  // const list = positions.map((position, index) => (
  //   <Box position={position} scales={scales[index]} />
  // ));
  // https://devsakaso.com/react-control-syntax/

  return (
    <div className="container">
      <Canvas
        camera={{
          fov: 50,
          aspect: 1,
          near: 0.01,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Scene />

        <Physics gravity={[0, 0, 0]} colliders={false} debug>
          {/* <RigidBody>
            <Box />
            <CuboidCollider args={[1, 1, 1]} sensor />
          </RigidBody> */}
          <Circles position={[0, 0, 0]} />

          <Boxes position={[0, 0, -1]} />
        </Physics>
      </Canvas>
    </div>
  );
}
