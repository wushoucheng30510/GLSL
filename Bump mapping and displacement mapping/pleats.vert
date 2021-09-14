#version 330 compatibility

out vec3  vMCposition;

out vec2 vST;
out vec3 vNf;
out vec3 vLf;
out vec3 vEf;

const float PI = 3.1415926;

uniform float uK, uP;
uniform float uNoiseAmp, uNoiseFreq;
uniform float uLightX, uLightY, uLightZ;
uniform sampler3D Noise3; //3D noise texture

float y0 = 1.;

void
main( )
{

    vec3 lightposition = vec3(uLightX, uLightY, uLightZ);
    // first step: Displace Z
    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = uK * (y0-y) * sin(2.* PI * x / uP);
    
    float dzdx = uK * (y0-y) * (2.*PI/uP)* cos(2.* PI * x / uP);
    float dzdy = -uK * sin(2.* PI * x / uP);
    vec4 new_vertex = vec4(x,y, z, gl_Vertex.w);
    vec3 Tx = vec3(1.,0.,dzdx);
    vec3 Ty = vec3(0.,1.,dzdy);

    vNf = normalize(gl_NormalMatrix * normalize(cross(Tx,Ty)));
    
	vMCposition  = new_vertex.xyz;
    vec4 ECposition = gl_ModelViewMatrix * new_vertex;
   
    vLf = lightposition- ECposition.xyz;		// vector from the point
									            // to the light position
	vEf = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									                // to the eye position 

	gl_Position = gl_ModelViewProjectionMatrix * new_vertex;
}