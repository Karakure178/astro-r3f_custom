//import glsl from 'babel-plugin-glsl/macro'
import fs from './normal.frag';
import vx from './normal.vert';

const fragmentShader = fs;
const vertexShader = vx;

import { Vector2, ShaderMaterial } from 'three'
import { useRef,useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";


const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new Vector2() },
        u_mouse: { type: "v2", value: new Vector2() },
        // u_texture: {type: "t", value: useLoader(TextureLoader, img) }
    }
})

const Scene = () => {
  const { controls } = useThree();
  const meshRef = useRef();

  useEffect(() => {
    if (controls) {
      controls.rotateTo(Math.PI / -4, Math.PI / 2.5, true);
    }
  }, [controls]);

  useFrame(({clock}) => {
    meshRef.current.material.uniforms.u_time.value = clock.elapsedTime
})
  return (
    <>
    <mesh ref={meshRef} material={material} >
        <boxGeometry args={[2, 2, 0.9]} />
    </mesh>
      <CameraControls makeDefault />
    </>
  );
};

export default function Fragments(){
  return (
    <div className="container">
      <Canvas
        // onCreated={sceneCreated}
        camera={{ position: [0, 0, 3], fov: 100 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

