#version 330 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable

out vec3 vNormal;
void
main( )
{
	vNormal = gl_NormalMatrix * gl_Normal;
	gl_Position = gl_Vertex;
}   
