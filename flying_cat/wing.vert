#version 330 compatibility
out float vLightIntensity;
uniform float Timer;
out vec2 vST;
void
main( )
{

        float uLightX = -3. + Timer*5;
        float uLightY = 0. + sin (gl_Vertex.x * Timer*5)*3;
        float uLightZ = 2. + sin (gl_Vertex.x * Timer*5)*3;
        vec3 LIGHTPOS = vec3(uLightX, uLightY, uLightZ);

        vST = gl_MultiTexCoord0.st;

        vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
        
        vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;

        vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );

        float x = gl_Vertex.x;
        float y = gl_Vertex.y;
        float z = gl_Vertex.z;
        
        z = (sin (5 * Timer)*0.02) * x * x ;
        
        y = y - Timer*15;
        vec4 new_vertex = vec4 (x, y ,z, gl_Vertex.w);

        vec3 MCposition = gl_Vertex.xyz;

        gl_Position = gl_ModelViewProjectionMatrix * new_vertex;
}