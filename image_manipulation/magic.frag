#version 330 compatibility

in vec2 vST;

uniform float uSc;
uniform float uTc;
uniform float uDs;
uniform float uDt;
uniform float uMagFactor;
uniform float uRotAngle;
uniform float uSharpFactor;
uniform sampler2D uImageUnit;
uniform bool uCircle;


void main(){

    ivec2 ires = textureSize( uImageUnit, 0 );
    float ResS = float( ires.s );
    float ResT = float( ires.t );

    // PPT page 2

    float s = vST.s;
    float t = vST.t;
    vec3 color = texture2D (uImageUnit, vST).rgb;
    
    float r1 = s - uSc;
    float r2 = t - uTc;

    // judge it is in a circle
    bool circle = (r1*r1 + r2*r2)< (uDs * uDs);
    
    float top = uSc + uDs;
    float bottom = uSc - uDs;
    float left = uTc - uDt;
    float right = uTc + uDt;

    // judge it is in a rectangle
    bool rect = bottom < s && s < top && left < t && t < right;


    if (uCircle){

        if(circle){
            r1 = r1 / uMagFactor;
            r2 = r2 / uMagFactor;
            float x_2 = r1*cos(uRotAngle) - r2*sin(uRotAngle) + uSc;
            float y_2 = r1*sin(uRotAngle) + r2*cos(uRotAngle) + uTc;

            vec2 newxy = vec2(x_2,y_2);
            
            vec2 stp0 = vec2(1./ResS, 0. );
            vec2 st0p = vec2(0. , 1./ResT);
            vec2 stpp = vec2(1./ResS, 1./ResT);
            vec2 stpm = vec2(1./ResS, -1./ResT);
            vec3 i00 = texture2D( uImageUnit, newxy ).rgb;
            vec3 im1m1 = texture2D( uImageUnit, newxy-stpp ).rgb;
            vec3 ip1p1 = texture2D( uImageUnit, newxy+stpp ).rgb;
            vec3 im1p1 = texture2D( uImageUnit, newxy-stpm ).rgb;
            vec3 ip1m1 = texture2D( uImageUnit, newxy+stpm ).rgb;
            vec3 im10 = texture2D( uImageUnit, newxy-stp0 ).rgb;
            vec3 ip10 = texture2D( uImageUnit, newxy+stp0 ).rgb;
            vec3 i0m1 = texture2D( uImageUnit, newxy-st0p ).rgb;
            vec3 i0p1 = texture2D( uImageUnit, newxy+st0p ).rgb;
            vec3 target = vec3(0.,0.,0.);
            target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
            target += 2.*(im10+ip10+i0m1+i0p1);
            target += 4.*(i00);
            target /= 16.;
            gl_FragColor = vec4( mix( target, i00, uSharpFactor ), 1. );
        }else{
            gl_FragColor = vec4( color, 1. );
        }

    }else{

        if (rect){
            r1 = r1 / uMagFactor;
            r2 = r2 / uMagFactor;
            float x_2 = r1*cos(uRotAngle) - r2*sin(uRotAngle) + uSc;
            float y_2 = r1*sin(uRotAngle) + r2*cos(uRotAngle) + uTc;

            vec2 newxy = vec2(x_2,y_2);
            
            vec2 stp0 = vec2(1./ResS, 0. );
            vec2 st0p = vec2(0. , 1./ResT);
            vec2 stpp = vec2(1./ResS, 1./ResT);
            vec2 stpm = vec2(1./ResS, -1./ResT);
            vec3 i00 = texture2D( uImageUnit, newxy ).rgb;
            vec3 im1m1 = texture2D( uImageUnit, newxy-stpp ).rgb;
            vec3 ip1p1 = texture2D( uImageUnit, newxy+stpp ).rgb;
            vec3 im1p1 = texture2D( uImageUnit, newxy-stpm ).rgb;
            vec3 ip1m1 = texture2D( uImageUnit, newxy+stpm ).rgb;
            vec3 im10 = texture2D( uImageUnit, newxy-stp0 ).rgb;
            vec3 ip10 = texture2D( uImageUnit, newxy+stp0 ).rgb;
            vec3 i0m1 = texture2D( uImageUnit, newxy-st0p ).rgb;
            vec3 i0p1 = texture2D( uImageUnit, newxy+st0p ).rgb;
            vec3 target = vec3(0.,0.,0.);
            target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
            target += 2.*(im10+ip10+i0m1+i0p1);
            target += 4.*(i00);
            target /= 16.;
            gl_FragColor = vec4( mix( target, i00, uSharpFactor ), 1. );
        }else{
            gl_FragColor = vec4( color, 1. );
        }
    }

    

}
