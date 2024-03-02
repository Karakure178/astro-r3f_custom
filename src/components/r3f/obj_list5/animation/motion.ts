import gsap from "gsap";

/**
 * モーション関数 点から線を走らせる gsap使用
 * @function motion
 * @return {object} frame - モーションのフレーム(0-1)
 */
export const motions = () => {
  const easing_str = "quint.inOut";
  const duration = 2;
  const frame = { count: 0 };

  const tl = gsap.timeline({ repeat: -1, yoyo: false });
  tl.to(frame, {
    count: 1,
    duration: duration,
    ease: easing_str,
    onComplete: () => {},
  });
  return frame;
};
