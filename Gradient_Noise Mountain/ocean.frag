#version 420 compatibility
in vec3 vMC;
in vec2 vST;
in float vLightIntensity;
uniform sampler3D Noise3;
uniform float Timer;
layout(binding = 1)uniform sampler2D laker;
void 
main(){

    float x = vMC.x;
    float y = vMC.y;
    float z = vMC.z;
    float bound = sqrt(x*x+z*z);
    vec4 nv = texture( Noise3, 1. * vMC );
    float n = nv.r + nv.g + nv.b + nv.a;
    n = ( n - 1. )/ 2.;    

    vec3 water = texture2D( laker, vST + Timer / 30 ).rgb;

    gl_FragColor = vec4(water * vLightIntensity,1.);

    if(bound > 2){
        discard;
    }
    
    
}

