import { useControls } from "leva";
import React, { useEffect, useRef, VFC } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { extend, useFrame, useThree } from "@react-three/fiber";

extend({ EffectComposer, RenderPass, ShaderPass, GlitchPass });

const Effect: VFC = () => {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer>(null);

  const glitch_datas = useControls("Glitch", {
    enabled: false,
    goWild: false,
  });

  const pixel_datas = useControls("Pixel", {
    enabled: true,
    pixelSize: { value: 10, min: 1, max: 30, step: 1 },
  });

  const blur_datas = useControls("Blur", {
    enabled: true,
    blurSize: { value: 8, min: 0, max: 20, step: 1 },
  });

  useEffect(() => {
    composerRef.current!.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    composerRef.current!.render();
  }, 5);

  return (
    <effectComposer ref={composerRef} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      {/* built-in pass */}
      <glitchPass
        attachArray="passes"
        enabled={glitch_datas.enabled}
        goWild={glitch_datas.goWild}
      />
      {/* built-in shader */}
    </effectComposer>
  );
};

export default Effect;
