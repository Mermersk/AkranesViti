import * as twgl from "./twgl-full.module.js"//"/twgl.js-4.16.0/dist/4.x/twgl-full.module.js"

const canvas = document.getElementById("c")

canvas.width = 1848/4
canvas.height = 4000/4

const gl = canvas.getContext("webgl2")
console.log(gl)
twgl.isWebGL2(gl) ? console.log("Webgl2 True") : console.error("Not Webgl2")

const vertexShaderSource = fetch("./v.vert").then((response => {
    return response.text().then( (text) => {
        //console.log(text)
        return text
    
    })
}))

const fragmentShaderSource = fetch("./f.frag").then((response => {
    return response.text().then( (text) => {
        //console.log(text)
        return text
    })
}))

Promise.all([vertexShaderSource, fragmentShaderSource]).then( (values) => {
    console.log(values)

    const glProgram = twgl.createProgramInfo(gl, values)
    
    const arrays = {
            a_position: { numComponents: 2, data: [
                -1, -1,
                -1, 1,
                1, -1,

                1, -1,
                1, 1,
                -1, 1
            ] },

            
            a_texCoord: { numComponents: 2, data: [
                0, 0,
                0, 1,
                1, 0,

                1, 0,
                1, 1,
                0, 1
            ]}
              
            
        }
        

    const buffers = twgl.createBufferInfoFromArrays(gl, arrays);
    console.log(buffers)


    const uniforms = {
        u_resolution: [canvas.width, canvas.height],
        u_viti: twgl.createTexture(gl, {src: "viti2.jpg", flipY: true})
    }
    let frameCounter = 0
    let lightCounter = 3.14/2;
    let then = 0;

    function draw(time) {

        //console.log("frame number: " + frameCounter)
        const timeInSeconds = time * 0.001;
        //deltaTime is how long each frame took to produce (Browser aims for 60fps)
        let deltaTime = timeInSeconds - then;
        then = timeInSeconds
        //console.log("deltaTime: " + deltaTime)
        if (lightCounter < -2) lightCounter = 3.14/2;
        lightCounter -= 0.6 * deltaTime;
        //console.log(lightCounter);
        //console.log(timeInSeconds)
        uniforms.u_lightTime = lightCounter;
        uniforms.u_time = timeInSeconds;
        //if (frameCounter % 70 == 0) uniforms.u_random = (Math.random() * 3.14)

        gl.useProgram(glProgram.program)
        gl.viewport(0, 0, canvas.width, canvas.height)
        twgl.setUniforms(glProgram, uniforms)
        twgl.setBuffersAndAttributes(gl, glProgram, buffers);

        //twgl.bindFramebufferInfo(gl, null)
        twgl.drawBufferInfo(gl, buffers, gl.TRIANGLES, 6);
       

        requestAnimationFrame(draw)

    }

    requestAnimationFrame(draw)


})


