#version 420 compatibility
in vec3 vMC;
in vec2 vST;
in float vLightIntensity;
uniform sampler3D Noise3;
uniform float Timer;
uniform bool uGradient_Noise;
uniform bool uThunder_on;
uniform bool uSeason;

layout(binding = 6)uniform sampler2D snow;
layout(binding = 5)uniform sampler2D mountain;
layout(binding = 4)uniform sampler2D laker;
void 
main(){

    
    float flash = fract(Timer * 10);

    vec3 color = texture2D( mountain, vST / 2).rgb;
    vec3 snow = texture2D( snow, vST).rgb;
    vec3 color2 = vec3(1.,0.84,0.);

    vec3 color3 = vec3(1.,0.69,0.);
    vec3 color4 = vec3(0.24,0.57,0.);


    if (uSeason){
        if ( sin(Timer/3) < 0.2){
            if (color.g < sin(Timer/3)){
                color = color2;
            }
        }else if ( sin(Timer/3) < 0.4){

            if (color.g < sin(Timer/3) ){
                color = color3;
            }
         
            
        }
    }
    
    

    
    if (vMC.x<0.){
        if (uThunder_on){
            gl_FragColor = vec4(color * vLightIntensity, flash);
        }else{
            gl_FragColor = vec4(color * vLightIntensity, 1.);
        }
        
    }else{
        if (uThunder_on){
            gl_FragColor = vec4(color * vLightIntensity, flash);
        }else{
            gl_FragColor = vec4(color * vLightIntensity, 1.);
        }
    }
    

    float x = vMC.x;
    float y = vMC.y;
    float z = vMC.z;

    vec4 nv = texture( Noise3, 1. * vMC );
    float n = nv.r + nv.g + nv.b + nv.a;
    n = ( n - 1. )/ 2.;    
    

    vec3 water = texture2D( laker, vST + Timer / 30 ).rgb;

    if (uSeason){

        if (x-z < y){
            if (y-n > -2. + sin(Timer)*5 ){
                if (uThunder_on){
                    gl_FragColor = vec4(snow * vLightIntensity,flash);
                }else{
                    gl_FragColor = vec4(snow * vLightIntensity,1.);
                }

            }
        }else{
            if (y-n > -2. + sin(Timer)*3 ){
                if (uThunder_on){
                    gl_FragColor = vec4(snow * vLightIntensity, flash);
                }else{
                    gl_FragColor = vec4(snow * vLightIntensity, 1.);
                }
            }
        }
    }

    
   
    if (sqrt(x*x + z*z)<1. + n){
        if (uThunder_on){
            gl_FragColor = vec4(water * vLightIntensity,flash);
        }else{
            gl_FragColor = vec4(water * vLightIntensity,1.);
        }
    }
    
    
}

