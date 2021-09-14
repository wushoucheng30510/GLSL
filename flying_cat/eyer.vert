#version 330 compatibility
out float vX,vY;
uniform float Timer;
void main(){
    vec3 MCposition = gl_Vertex.xyz;
    vX = MCposition.x;
    vY = MCposition.y;
    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = gl_Vertex.z;
    float w = gl_Vertex.w;
    z = z +Timer * 15;
    vec4 new_vertex = vec4(x,y,z,w);
    vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
    gl_Position = gl_ModelViewProjectionMatrix * new_vertex;
}