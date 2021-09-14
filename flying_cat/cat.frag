#version 330 compatibility


uniform float Timer;
in float vX, vY;
in vec3 vColor;
in float vLightIntensity;
in vec3 normal;
in vec3 vLf;
in vec3 vEf;
in vec3 MCposition;

const vec3 Red = vec3( 1., 0., 0.);
const vec3 Orange = vec3( 1., 0.5 , 0.);
const vec3 Yellow = vec3( 1., 1., 0.);
const vec3 Green = vec3( 0., 1., 0.);
const vec3 Blue = vec3( 0., 0., 1.);
const vec3 Cyan = vec3( 0., 1., 1.);
const vec3 Purple= vec3( 1., 0., 1.);
const vec3 Blace= vec3( 0., 0., 0.);
const vec3 White = vec3(1.,1.,1.);
const vec3 Gray= vec3( 0.5, 0.5, 0.5);

float one = 1./14.;
float two = 3./14.;
float three = 5./14.;
float four = 7./14.;
float five = 9./14.;
float six = 11./14.;
float seven = 13./14.;


void
main( )
{
	const float PI = 3.14159265;
	float f = sqrt( (vX*vX + vY*vY ));
	f = fract(0.55 * f);
	

	float t = smoothstep( one - 0.1, one + 0.1, f );

	bool case1 = sin(Timer) < one;
	bool case2 = sin(Timer) < two;
	bool case3 = sin(Timer) < three;
	bool case4 = sin(Timer) < four;
	bool case5 = sin(Timer) < five;
	bool case6 = sin(Timer) < six;
	bool case7 = sin(Timer) < seven;
	vec3 color1 = mix( Red, Orange, t );
	vec3 color2 = mix( Orange, Yellow, t );
	vec3 color3 = mix( Yellow, Green, t );
	vec3 color4 = mix( Green, Blue, t );
	vec3 color5 = mix( Blue, Cyan, t );
	vec3 color6 = mix( Cyan, Purple, t );
	vec3 color7 = mix( Purple, Red, t );



		if (f >= 0){
			vec3 rgb = color1;
			t = smoothstep( one- 0.1, one + 0.1, f );
			if (case1){
				rgb = mix( Red, Orange, t );
			}else if (case2){
				rgb = mix( Orange, Yellow, t );
			}else if (case3){
				rgb = mix( Yellow, Green, t );
			}else if (case4){
				rgb = mix( Green, Blue, t );
			}else if (case5){
				rgb = mix( Blue, Cyan, t );
			}else if (case6){
				rgb = mix( Cyan, Purple, t );
			}else if (case7){
				rgb = mix( Purple, Red, t );
			}
			
			gl_FragColor = vec4( rgb, 1. );
		}

		if( f >= two-0.1)
		{
			vec3 rgb = color1;
			t = smoothstep( two- 0.1, two + 0.1, f );
			if (case1){
				rgb = mix( Orange, Yellow, t );
			}else if (case2){
				rgb = mix( Yellow, Green, t );
			}else if (case3){
				rgb = mix( Green, Blue, t );
			}else if (case4){
				rgb = mix( Blue, Cyan, t );
			}else if (case5){
				rgb = mix( Cyan, Purple, t );
			}else if (case6){
				rgb = mix( Purple, Red, t );
			}else if (case7){
				rgb = mix( Red, Orange, t );
			}
			gl_FragColor = vec4( rgb, 1. );
		}
		if( f >= three-0.1)
		{
			
			vec3 rgb = color1;
			t = smoothstep( three - 0.1, three + 0.1, f );
			if (case1){
				rgb = mix( Yellow, Green, t );
			}else if (case2){
				rgb = mix( Green, Blue, t );
			}else if (case3){
				rgb = mix( Blue, Cyan, t );
			}else if (case4){
				rgb = mix( Cyan, Purple, t );
			}else if (case5){
				rgb = mix( Purple, Red, t );
			}else if (case6){
				rgb = mix( Red, Orange, t );
			}else if (case7){
				rgb = mix( Orange, Yellow, t );
			}
			gl_FragColor = vec4( rgb, 1. );
		}
		if( f >= four-0.1)
		{
			vec3 rgb = color1;
			t = smoothstep( four - 0.1, four+ 0.1, f );
			if (case1){
				rgb = mix( Green, Blue, t );
			}else if (case2){
				rgb = mix( Blue, Cyan, t );
			}else if (case3){
				rgb = mix( Cyan, Purple, t );
			}else if (case4){
				rgb = mix( Purple, Red, t );
			}else if (case5){
				rgb = mix( Red, Orange, t );
			}else if (case6){
				rgb = mix( Orange, Yellow, t );
			}else if (case7){
				rgb = mix( Yellow, Green, t );
			}
			gl_FragColor = vec4( rgb, 1. );
		}
		if( f >= five-0.1)
		{
			
			gl_FragColor = vec4( White, 1. );
		}
		if( f >= six-0.1)
		{
			
			gl_FragColor = vec4( White, 1. );
		}
		if( f >= seven-0.1)
		{
			t = smoothstep( seven - 0.1, seven+ 0.1, f );
			vec3 rgb = color1;
			if (case1){
				rgb = mix( Purple, Red, t );
			}else if (case2){
				rgb = mix( Red, Orange, t );
			}else if (case3){
				rgb = mix( Orange, Yellow, t );
			}else if (case4){
				rgb = mix( Yellow, Green, t );
			}else if (case5){
				rgb = mix( Green, Blue, t );
			}else if (case6){
				rgb = mix( Blue, Cyan, t );
			}else if (case7){
				rgb = mix( Cyan, Purple, t );
			}
			gl_FragColor = vec4( rgb, 1. );
		}
	
	vec3 stp = ( MCposition + 1. ) / 2.; 
	if (stp.t < 1.1){
		gl_FragColor = vec4( vec3(1.,1.,1.), 1. );
	}
	
	if (stp.s > 1.35){
		gl_FragColor = vec4( vec3(0.,0.,0.), 1. );
	}
	if (stp.t > 2.05){
		gl_FragColor = vec4( vec3(0.,0.,0.), 1. );
	}
	if (stp.t < 2.05 && stp.t >1.8 && stp.s<0.2 && ((stp.s*stp.s)+(stp.p*stp.p)<1.)){
		gl_FragColor = vec4( White, 1. );
	}


	
	
	gl_FragColor = gl_FragColor * vLightIntensity;
	

}