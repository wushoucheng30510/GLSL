#version 330 compatibility

uniform bool uStrip;
uniform float Timer;
out vec3 vColor;
out float vX, vY;
out float vLightIntensity;
out vec3 MCposition;

void
main( )
{
        float uLightX = -3. + Timer*5;
        float uLightY = 0. + sin (gl_Vertex.x * Timer*5)*3;
        float uLightZ = 2. + sin (gl_Vertex.x * Timer*5)*3;
        vec3 LIGHTPOS = vec3(uLightX, uLightY, uLightZ);

        vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
        
        vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;

        vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );

        vColor = gl_Color.rgb;

        float x = gl_Vertex.x;
        float y = gl_Vertex.y;
        float z = gl_Vertex.z;
        x = x;
        z = z;
        if (x > 2.1){
                y = y + sin(Timer*5);
                z = z + cos(Timer*5);
        }else{
                y= y;
        }
        
        if (y < 1.){
                if (z < 0.){
                        if (x < 0.){
                                x = x - Timer + sin(Timer * 3);                 //Right forward
                        }else{
                                x = x - Timer + cos(Timer * 3);                //Left back
                        }
                }else{
                        if (x < 0.){
                        
                                x = x - Timer + cos(Timer * 3);                 //Left forward 

                                
                        }else{
                                x = x - Timer + sin(Timer * 3);                //Left back
                        }
                        
                }
        }else{
                x = x - Timer;
        }
        vec4 new_vertex = vec4 (x, y ,z, gl_Vertex.w);

        MCposition = gl_Vertex.xyz;
        vX = MCposition.x;
        vY = MCposition.y;
        float freq = Timer * 3 + 5;
        if (uStrip){
                vX = vX + -0.42 * sin( freq * vY );
                vY = vY + -0.42 * sin( freq * vX );
        }else{
                vX = vX + -0.42 * sin( 5. * vY );
                vY = vY + -0.42 * sin( 5. * vX );
        }
        

        gl_Position = gl_ModelViewProjectionMatrix * new_vertex;
}