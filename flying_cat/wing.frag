#version 330 compatibility
uniform sampler2D TexUnit;
in float vLightIntensity;
uniform bool uLight;
in vec2 vST;
void main(){
        vec3 color = texture2D( TexUnit, vST ).rgb;
        if (uLight){
            gl_FragColor =  vLightIntensity * vec4( color, 1. );
        }else{
            gl_FragColor =  vec4( color, 1. );
        }

}