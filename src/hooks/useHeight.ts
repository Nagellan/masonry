import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';

export const useHeight = (
	ref: RefObject<HTMLElement | null>,
	onResize: (height: number) => void,
) => {
	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const resizeObserver = new ResizeObserver(([entry]) => {
			onResize(entry.target.clientHeight);
		});

		resizeObserver.observe(el);

		return () => {
			resizeObserver.unobserve(el);
		};
	}, [ref, onResize]);
};
