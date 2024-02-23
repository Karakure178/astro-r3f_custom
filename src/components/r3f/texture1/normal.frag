precision highp float;
precision highp int;

varying vec2 vUv;
uniform sampler2D u_texture;

//uniform float u_time;

void main(){
    vec3 color=vec3(0.);
    vec4 tex=texture2D(u_texture,vUv);
    //color=vec3(vUv.x,vUv.y,0.);
    gl_FragColor=vec4(color,1.);
    gl_FragColor=tex;
}