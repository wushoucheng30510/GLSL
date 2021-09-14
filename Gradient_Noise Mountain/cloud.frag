#version 420 compatibility
in vec2 vST;
in vec3 vMC;
in float vLightIntensity;
uniform float Timer;
uniform bool uThunder_on;
uniform bool uCloud;

void 
main(){

    float flash = fract(Timer * 10);
    if (uThunder_on){
        gl_FragColor = vec4(vec3( 1. ,1., 1.) * vLightIntensity, flash);
    }else{
        gl_FragColor = vec4(vec3( 1. ,1., 1.) * vLightIntensity, 1.);
    }   
    if (uCloud == false){
        discard;
    }
    
    
}