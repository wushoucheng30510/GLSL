#version 420 compatibility
out vec2 vST;
out vec3 vMC;
out float vLightIntensity;
uniform float Timer;
uniform sampler2D Noise;



vec2 random(vec2 p){
    return  -1.0 + 2.0 * fract(
        sin(
            vec2(
                dot(p, vec2(127.1,311.7)),
                dot(p, vec2(269.5,183.3))
            )
        ) * 43758.5453
    );
}


float noise_perlin (vec2 p, float q, float w) {
    vec2 i = floor(p) * q; // 获取当前网格索引i
    vec2 f = fract(p); // 获取当前片元在网格内的相对位置
    // 计算梯度贡献值
    float a = dot(random(i),f); // 梯度向量与距离向量点积运算
    float b = dot(random(i + vec2(w, 0.)),f - vec2(w, 0.));
    float c = dot(random(i + vec2(0., w)),f - vec2(0., w));
    float d = dot(random(i + vec2(w, w)),f - vec2(w, w));
    // 平滑插值
    vec2 u = smoothstep(0.,1.,f);
    // 叠加四个梯度贡献值
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}


void
main( )
{
    
    float uLightX = 3.;
    float uLightY = 3.;
    float uLightZ = 2.;

    vec3 LIGHTPOS = vec3(uLightX, uLightY, uLightZ);
    vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
    vec3 ECposition = ( gl_ModelViewMatrix * gl_Vertex ).xyz;
    vLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition), normal ) );


    float x = gl_Vertex.x;
    float y = gl_Vertex.y;
    float z = gl_Vertex.z;
    float w = gl_Vertex.w;
    float bound = sqrt(x*x+z*z);


    y = sin(x*3 + Timer*5) * cos(z*3) * 0.1;

    
    
    vST = gl_MultiTexCoord0.st;

    

    vec4 newVertex = vec4(x,y,z,w);
    vMC = vec3(x,y,z);
    

    gl_Position = gl_ModelViewProjectionMatrix * newVertex;    
}