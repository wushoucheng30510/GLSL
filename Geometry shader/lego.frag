#version 330 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable

uniform vec4 uColor;
in float gLightIntensity;
void
main( )
{
	gl_FragColor = vec4( gLightIntensity * uColor.rgb, 1. );
}
