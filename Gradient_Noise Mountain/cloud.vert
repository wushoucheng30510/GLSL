#version 420 compatibility
out vec2 vST;
out vec3 vMC;
out float vLightIntensity;
uniform float Timer;

void
main( )
{

    float uLightX = -3.;
    float uLightY = 0.;
    float uLightZ = 2.;

    vec3 LIGHTPOS = vec3(uLightX, uLightY, uLightZ);
    vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
    vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
    vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );


    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = gl_Vertex.z;
    float w = gl_Vertex.w;



    vec4 new_vertex = vec4(x,y,z,w);
    vST = gl_MultiTexCoord0.st;
    gl_Position = gl_ModelViewProjectionMatrix * new_vertex;    
}