#version 420 compatibility
out vec2 vST;
out vec3 vMC;
out float vLightIntensity;
uniform float Timer;
uniform sampler2D Noise;
uniform float uA;
uniform float uB;
uniform bool uGradient_Noise;

vec2 random(vec2 xy){
    //return  -1 + 2.0 * fract(sin(vec2(dot(xy, vec2(180.,300.)),dot(xy, vec2(270.,210.)))) * 50000.);
    return  -1 + 2.0 * fract(sin(vec2(xy)) * 50000.);
}


float noise_mountain (vec2 xy, float q, float w) {
    vec2 i = floor(xy) * q; 
    vec2 f = fract(xy); 
    float a = dot(random(i),f);
    float b = dot(random(i + vec2(w, 0.)),f - vec2(w, 0.));
    float c = dot(random(i + vec2(0., w)),f - vec2(0., w));
    float d = dot(random(i + vec2(w, w)),f - vec2(w, w));
    vec2 u = smoothstep(0.,1.,f);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}


void
main( )
{
    
    float uLightX = -2.;
    float uLightY = 1.;
    float uLightZ = 1.;

    vec3 LIGHTPOS = vec3(uLightX, uLightY, uLightZ);
    vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
    vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
    vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );


    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = gl_Vertex.z;
    float w = gl_Vertex.w;
    float bound = sqrt(x*x+z*z);
    if (uGradient_Noise){
        
        if (bound > 2.){
            y = noise_mountain (vec2(x,z),uA,uB);
        }else{
            y = -1;
        }
    }else{
        if (bound > 2.){
            y = y + cos(x) * sin(z);
        }
    }
    
    vST = gl_MultiTexCoord0.st;

    vec4 newVertex = vec4(x,y,z,w);
    vMC = vec3(x,y,z);
    
    gl_Position = gl_ModelViewProjectionMatrix * newVertex;    
}