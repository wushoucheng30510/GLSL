#version 330 compatibility

uniform float uK, uP;

out vec3	vNs;
out vec3	vEs;
out vec3	vMC;

const float PI = 3.1415926;
const float y0 = 1.;

void
main( )
{    
       vMC = gl_Vertex.xyz;
       vec4 newVertex = gl_Vertex;
       float x = gl_Vertex.x;
       float y = gl_Vertex.y;
       newVertex.z = uK * (y0-y) * sin(2.* PI * x / uP);

       vec4 ECposition = gl_ModelViewMatrix * newVertex;

        float dzdx = uK * (y0-y) * (2.*PI/uP)* cos(2.* PI * x / uP);
        vec3 xtangent = vec3( 1., 0., dzdx );

        float dzdy = -uK * sin(2.* PI * x / uP);
        vec3 ytangent = vec3( 0., 1., dzdy );

        //vNs = normalize(  cross( xtangent, ytangent )  );
        vNs = normalize(gl_NormalMatrix * normalize(cross(xtangent, ytangent)));

        vEs = ECposition.xyz - vec3( 0., 0., 0. ) ; 
	       		// vector from the eye position to the point

        gl_Position = gl_ModelViewProjectionMatrix * newVertex;
}