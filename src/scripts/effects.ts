/* Site-wide effects, all opt-in through data attributes. Run once from Layout.astro.

   canvas[data-shader]        mesh-gradient shader (shader.ts)
   canvas[data-flicker-grid]  flickering dot grid (flicker-grid.ts)
   [data-ticker]              Number Ticker: digits roll to their value on .is-visible (pair with data-reveal)
   svg[data-draw]             strokes draw in when an ancestor .reveal gets .is-visible
   [data-velocity="1|-1"]     Scroll Based Velocity: the first child (content doubled) drifts, faster on scroll
   [data-scroll-text]         Text Reveal: sets --p (0 to 1) as the element scrolls through view
   [data-trace]               Tracing Beam: sets --p, and .is-lit on [data-trace-step] children
   [data-spotlight]           Magic Card: sets --mx / --my at the pointer
   [data-magnetic]            buttons drift towards the pointer
   [data-scramble]            Hyper Text: scrambles on hover of the closest link */

import { initShaders } from './shader';
import { initFlickerGrids } from './flicker-grid';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Runs fn every frame, but only while el is on screen */
export const whileVisible = (el: Element, fn: (now: number) => void) => {
	let frame = 0;
	const loop = (now: number) => {
		fn(now);
		frame = requestAnimationFrame(loop);
	};
	new IntersectionObserver(([entry]) => {
		cancelAnimationFrame(frame);
		if (entry.isIntersecting) frame = requestAnimationFrame(loop);
	}).observe(el);
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

export function initEffects() {
	initShaders();
	initFlickerGrids();

	/* ----- Number Ticker (after Magic UI): each digit is a reel of 0-9 that rolls to its
	   value when the number gets .is-visible. The rendered text stays for screen readers. ----- */
	document.querySelectorAll<HTMLElement>('[data-ticker]').forEach((el) => {
		const text = el.textContent?.replace(/\s+/g, '') ?? '';
		const label = document.createElement('span');
		label.className = 'sr-only';
		label.textContent = text;

		const visual = document.createElement('span');
		visual.className = 'ticker__visual';
		visual.setAttribute('aria-hidden', 'true');

		let digit = 0;
		for (const ch of text) {
			if (/\d/.test(ch)) {
				const col = document.createElement('span');
				col.className = 'ticker__col';
				col.style.setProperty('--n', ch);
				col.style.setProperty('--k', String(digit++));
				const sizer = document.createElement('span');
				sizer.className = 'ticker__sizer';
				sizer.textContent = ch;
				const reel = document.createElement('span');
				reel.className = 'ticker__reel';
				reel.innerHTML = '0123456789'.replace(/\d/g, (d) => `<span>${d}</span>`);
				col.append(sizer, reel);
				visual.append(col);
			} else {
				const glyph = document.createElement('span');
				glyph.className = 'ticker__glyph';
				glyph.textContent = ch;
				visual.append(glyph);
			}
		}
		el.replaceChildren(label, visual);
	});

	/* ----- Icons draw their strokes in when their card is revealed ----- */
	document.querySelectorAll<SVGElement>('svg[data-draw]').forEach((svg) => {
		svg.querySelectorAll('path, polygon, polyline, circle, rect, line').forEach((shape) => shape.setAttribute('pathLength', '1'));
		svg.classList.add('is-drawable');
	});

	/* ----- Scroll Based Velocity (after Magic UI): rows drift, speed up with scrolling
	   and turn around when the page scrolls back up ----- */
	if (!reduceMotion) {
		document.querySelectorAll<HTMLElement>('[data-velocity]').forEach((row) => {
			const strip = row.firstElementChild as HTMLElement;
			const BASE = 40; // px per second
			const sign = Number(row.dataset.velocity) || 1;
			let dir = sign;
			let x = 0;
			let boost = 1;
			let lastTime = 0;
			let lastY = scrollY;

			whileVisible(row, (now) => {
				const dt = lastTime ? Math.min(now - lastTime, 50) / 1000 : 0;
				lastTime = now;
				const dy = scrollY - lastY;
				lastY = scrollY;

				if (dy) dir = Math.sign(dy) * sign;
				const target = 1 + Math.min(Math.abs(dy) / 4, 8);
				boost += (target - boost) * 0.08;

				const half = strip.scrollWidth / 2;
				x = (x - dir * BASE * boost * dt) % half;
				if (x > 0) x -= half;
				strip.style.transform = `translate3d(${x}px, 0, 0)`;
			});
		});
	}

	/* ----- Text Reveal (after Magic UI): words darken as the paragraph scrolls through view ----- */
	document.querySelectorAll<HTMLElement>('[data-scroll-text]').forEach((el) => {
		if (reduceMotion) {
			el.style.setProperty('--p', '1');
			return;
		}
		whileVisible(el, () => {
			const box = el.getBoundingClientRect();
			const start = innerHeight * 0.9;
			const end = innerHeight * 0.35;
			el.style.setProperty('--p', clamp01((start - box.top) / (start - end + box.height * 0.6)).toFixed(3));
		});
	});

	/* ----- Tracing Beam (after Aceternity UI): the rule beside the steps fills as you read,
	   lighting each step as the beam reaches it ----- */
	document.querySelectorAll<HTMLElement>('[data-trace]').forEach((trace) => {
		const stepEls = [...trace.querySelectorAll<HTMLElement>('[data-trace-step]')];
		const update = () => {
			const box = trace.getBoundingClientRect();
			const mark = innerHeight * 0.6;
			trace.style.setProperty('--p', clamp01((mark - box.top) / box.height).toFixed(3));
			stepEls.forEach((step) => step.classList.toggle('is-lit', step.getBoundingClientRect().top < mark));
		};
		if (reduceMotion) {
			trace.style.setProperty('--p', '1');
			stepEls.forEach((step) => step.classList.add('is-lit'));
		} else whileVisible(trace, update);
	});

	if (reduceMotion || !finePointer) return;

	/* ----- Magic Card spotlight: a soft glow and border light that follow the pointer ----- */
	document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
		card.addEventListener('pointermove', (e) => {
			const box = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - box.left}px`);
			card.style.setProperty('--my', `${e.clientY - box.top}px`);
		});
	});

	/* ----- Magnetic buttons: pulled a little towards the pointer ----- */
	document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
		btn.addEventListener('pointermove', (e) => {
			const box = btn.getBoundingClientRect();
			const x = (e.clientX - box.left - box.width / 2) * 0.25;
			const y = (e.clientY - box.top - box.height / 2) * 0.35;
			btn.style.translate = `${x}px ${y}px`;
		});
		btn.addEventListener('pointerleave', () => (btn.style.translate = ''));
	});

	/* ----- Hyper Text (after Magic UI): hovered titles scramble, then settle left to right ----- */
	const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
		const text = el.textContent?.trim() ?? '';
		let frame = 0;
		el.closest('a')?.addEventListener('pointerenter', () => {
			cancelAnimationFrame(frame);
			const start = performance.now();
			const tick = (now: number) => {
				const settled = Math.floor((now - start) / 28);
				el.textContent = [...text]
					.map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * 26)]))
					.join('');
				if (settled < text.length) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		});
	});
}
