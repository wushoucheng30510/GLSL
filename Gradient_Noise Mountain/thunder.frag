#version 420 compatibility
in vec2 vST;
in vec3 vMC;
uniform float Timer;
uniform bool uThunder_on;

layout(binding = 2)uniform sampler2D thunder;

void 
main(){

    vec3 color = texture2D( thunder, vST).rgb;
    float flash = fract(Timer * 10);
    if (color.r < 0.9 && color.g < 0.9){
        discard;
    }
    if (uThunder_on){

        if (sin(Timer) < 0.3){
            if (vMC.x > 0.2){
                gl_FragColor = vec4(color, flash);
            }else{
                discard;
            }
        }else if ( 0.3 < sin(Timer) && sin(Timer) < 0.6){
  
                if (vMC.x < 0.2){
                    if (vMC.x > -0.1){
                        gl_FragColor = vec4(color, flash);
                    }else{
                        discard;
                    }
                }else{
                        discard;
                }
            
            
        }else{
            if (vMC.x < -0.15){
                gl_FragColor = vec4(color, flash);
                
            }else{
                discard;
            }
        }
        
    }else{
        gl_FragColor = vec4(vec3(0.,0.,0.), 1.);
    }   

    
    
}