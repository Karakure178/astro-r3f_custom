precision highp float;
precision highp int;

varying vec2 vUv;
//uniform float u_time;

void main(){
    vec3 color = vec3(0.);
    color = vec3(vUv.x, vUv.y, 0.);
    gl_FragColor = vec4(color, 1.);
}