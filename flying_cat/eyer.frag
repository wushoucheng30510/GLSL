#version 330 compatibility
uniform sampler2D TexUnit;
const float PI = 3.14159265;
in float vX, vY;

void main(){
        vec3 white = vec3 (1., 1., 1.);
        vec3 black = vec3 (0., 0., 0.);
        float f = sqrt( (vX*vX + vY*vY ));
        if (f < 1.){
            gl_FragColor =  vec4( black, 1. );
        }else{
            gl_FragColor =  vec4( white, 1. );
        }
        

}