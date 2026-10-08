/* Mesh-gradient shader for <canvas data-shader> elements.
   Domain-warped noise in the brand colours, drawn at half resolution. Each
   canvas pauses off screen and in background tabs, and draws one still frame
   for reduced motion. Without WebGL the canvas stays transparent, so give its
   container a CSS gradient as the fallback. Pair with the .shader class. */

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

const FRAG = `
	precision mediump float;
	uniform vec2 r;
	uniform float t;
	float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
	float noise(vec2 p){
		vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
		return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
	}
	float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.;a*=.5;}return v;}
	void main(){
		vec2 uv=gl_FragCoord.xy/r;
		vec2 p=gl_FragCoord.xy/max(r.x,r.y)*2.6;
		float s=t*.045;
		vec2 q=vec2(fbm(p+s),fbm(p+vec2(5.2,1.3)-s));
		vec2 w=vec2(fbm(p+2.*q+vec2(1.7,9.2)+s*1.4),fbm(p+2.*q+vec2(8.3,2.8)-s));
		float n=fbm(p+1.8*w);
		vec3 ink=vec3(.06,.05,.07),deep=vec3(.224,.016,.306),acc=vec3(.878,.012,.282),pink=vec3(1.,.55,.7);
		vec3 c=mix(ink,deep,smoothstep(.18,.5,n));
		c=mix(c,acc,smoothstep(.42,.72,n)*.9);
		c=mix(c,pink,smoothstep(.68,.9,n+.08*w.x)*.32);
		c*=1.-.3*length(uv-.5);
		c+=(hash(gl_FragCoord.xy)-.5)*.025;
		gl_FragColor=vec4(c,1.);
	}`;

const SCALE = 0.5; // the gradient is soft, so half resolution looks the same at a quarter of the cost

const start = (canvas: HTMLCanvasElement, reduceMotion: boolean) => {
	const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
	if (!gl) return;

	const compile = (type: number, src: string) => {
		const shader = gl.createShader(type)!;
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		return shader;
	};
	const program = gl.createProgram()!;
	gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
	gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
	gl.useProgram(program);

	// One oversized triangle covers the whole viewport
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
	const loc = gl.getAttribLocation(program, 'p');
	gl.enableVertexAttribArray(loc);
	gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
	const uRes = gl.getUniformLocation(program, 'r');
	const uTime = gl.getUniformLocation(program, 't');

	const seed = Math.random() * 100;
	let frame = 0;
	let visible = false;

	const draw = (now: number) => {
		gl.uniform1f(uTime, seed + now / 1000);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	};
	const loop = (now: number) => {
		draw(now);
		frame = requestAnimationFrame(loop);
	};
	const resize = () => {
		const { width, height } = canvas.getBoundingClientRect();
		canvas.width = Math.max(1, Math.round(width * SCALE));
		canvas.height = Math.max(1, Math.round(height * SCALE));
		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.uniform2f(uRes, canvas.width, canvas.height);
		draw(performance.now());
	};
	const play = () => {
		if (!reduceMotion && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
	};
	const stop = () => {
		cancelAnimationFrame(frame);
		frame = 0;
	};

	new ResizeObserver(resize).observe(canvas);
	new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting;
		visible ? play() : stop();
	}).observe(canvas);
	document.addEventListener('visibilitychange', () => (document.hidden ? stop() : play()));
	canvas.classList.add('is-live');
};

export const initShaders = () => {
	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.querySelectorAll<HTMLCanvasElement>('[data-shader]').forEach((canvas) => start(canvas, reduceMotion));
};
