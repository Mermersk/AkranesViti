#version 300 es
precision mediump float;
#define PI 3.14159265359

layout (location = 0) in vec2 a_position;
layout (location = 1) in vec2 a_texCoord;

out vec2 fTex;

void main() {
	float rotAmount = PI / 2.0;
    //fTex -= vec2(0.5);
    //fTex.x = (a_texCoord.x * cos(rotAmount)) - (a_texCoord.y * sin(rotAmount));
    //fTex.y = (a_texCoord.x * sin(rotAmount)) + (a_texCoord.y * cos(rotAmount));
    //fTex += vec2(0.5);

    fTex = a_texCoord;

	
   gl_Position = vec4(a_position, 0.0f, 1);
}