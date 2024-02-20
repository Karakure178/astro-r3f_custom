precision highp float;
precision highp int;

varying vec2 vUv;
//uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_boxPosition;// boxの位置
#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st,float _angle){
    _st-=.5;
    _st=mat2(cos(_angle),-sin(_angle),
    sin(_angle),cos(_angle))*_st;
    _st+=.5;
    return _st;
}

vec2 tile(vec2 _st,float _zoom){
    _st*=_zoom;
    return fract(_st);
}

float box(vec2 _st,vec2 _size,float _smoothEdges){
    _size=vec2(.5)-_size*.5;
    vec2 aa=vec2(_smoothEdges*.5);
    vec2 uv=smoothstep(_size,_size+aa,_st);
    uv*=smoothstep(_size,_size+aa,vec2(1.)-_st);
    return uv.x*uv.y;
}

void main(){
    vec2 st=vec2(vUv.x,vUv.y);
    st=tile(st,9.);
    
    vec3 color=vec3(0.);
    vec2 pos=u_boxPosition;// vec2(0.5,0.5)
    color=vec3(box(st,pos,.1));
    gl_FragColor=vec4(color,1.);
}