#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_lightTime;
uniform sampler2D u_viti;
in vec2 fTex;

out vec4 outColor;

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution;
    float ar = u_resolution.x / u_resolution.y;
    
    uv = (uv - 0.5);
    uv.y -= 0.265;
    uv.x += 0.008;
    uv.x = uv.x * ar;
    
    vec2 staticCoords = uv;
    
    float lightPoint = 0.0;
    
    vec4 viti = texture(u_viti, fTex);
    
    
    if (viti.r > 0.6) {
    	//viti.rgb = light3 * viti.rgb;//vec4(0.0, 1.0, 0.0, 1.0);
    	viti.rgb = viti.rgb/2.5;
    	//oo = vec2(0.0);
    	//viti.xyz = mix(viti.xyz, vec3(light) * vec3(1.0, 0.0, 0.0), 0.99);
    	//inside = true;
    	//brightness = 0.0;
    }
    
    float xMovement = 0.0;
    float timer = u_time;
    
   
    
    xMovement = sin(u_lightTime/2.8)/19.0;
    
    uv.x += xMovement;
    
    float d = length(uv);
    
    float maxBright = 0.010;
    float brightness = maxBright;// - abs(uv.x);
    
    
    float dms = distance(staticCoords, uv);
    float s = smoothstep(0.0, 0.02, dms);
    
    
    float light = (brightness / d) * (1.0-s);
    //light *= smoothstep(0.03, 0.05, light);
    
    vec3 lightColor = vec3(1.0, 0.3, 0.0); 
    vec3 light3 = vec3(light);
    
    
    vec3 col = viti.rgb + (light3); //* lightColor);
    outColor = vec4(col, 1.0);//vec4(light);
}