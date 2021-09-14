#version 420 compatibility
out vec2 vST;
out vec3 vMC;
uniform float Timer;
uniform bool uThunder_on;




void
main( )
{

    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = gl_Vertex.z;
    float w = gl_Vertex.w;
    vMC=gl_Vertex.xyz;
    vec4 new_vertex = vec4(x,y,z,w);

    vST = gl_MultiTexCoord0.st;
    if (uThunder_on){
        gl_Position = gl_ModelViewProjectionMatrix * new_vertex;
    }else{
         gl_Position = gl_ModelViewProjectionMatrix * vec4 (0.,0.,0.,0.);
    }
    
}