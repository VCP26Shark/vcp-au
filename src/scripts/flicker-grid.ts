/* Flickering Grid (after Magic UI) for <canvas data-flicker-grid> elements:
   small squares that randomly fade in and out. Each canvas pauses off screen
   and in background tabs, and draws a still frame for reduced motion. */

const SQUARE = 4;
const GAP = 6;
const CELL = SQUARE + GAP;
const MAX_OPACITY = 0.32;
const FLICKER_CHANCE = 0.25; // per square, per second
const COLOR = '224, 3, 72';

const start = (canvas: HTMLCanvasElement, reduceMotion: boolean) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	let cols = 0;
	let rows = 0;
	let dpr = 1;
	let squares = new Float32Array(0);
	let frame = 0;
	let last = 0;
	let visible = false;

	const draw = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const size = SQUARE * dpr;
		for (let x = 0; x < cols; x++) {
			for (let y = 0; y < rows; y++) {
				ctx.fillStyle = `rgba(${COLOR}, ${squares[x * rows + y]})`;
				ctx.fillRect(x * CELL * dpr, y * CELL * dpr, size, size);
			}
		}
	};

	const resize = () => {
		dpr = Math.min(devicePixelRatio || 1, 2);
		const { width, height } = canvas.getBoundingClientRect();
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		cols = Math.ceil(width / CELL);
		rows = Math.ceil(height / CELL);
		squares = new Float32Array(cols * rows).map(() => Math.random() * MAX_OPACITY);
		draw();
	};

	const tick = (now: number) => {
		const dt = Math.min((now - last) / 1000, 0.1);
		last = now;
		for (let i = 0; i < squares.length; i++) {
			if (Math.random() < FLICKER_CHANCE * dt) squares[i] = Math.random() * MAX_OPACITY;
		}
		draw();
		frame = requestAnimationFrame(tick);
	};

	const play = () => {
		if (reduceMotion || frame) return;
		last = performance.now();
		frame = requestAnimationFrame(tick);
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

	document.addEventListener('visibilitychange', () => (document.hidden ? stop() : visible && play()));
};

export const initFlickerGrids = () => {
	const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.querySelectorAll<HTMLCanvasElement>('[data-flicker-grid]').forEach((canvas) => start(canvas, reduceMotion));
};
