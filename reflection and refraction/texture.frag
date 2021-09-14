#version 330 compatibility

uniform sampler2D TexUnit;

in vec2	vST;

void main( )
{
	vec3 color = texture2D( TexUnit, vST ).rgb;
	gl_FragColor = vec4( color, 1. );
}