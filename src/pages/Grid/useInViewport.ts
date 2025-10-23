import { useRef, useEffect } from 'react';

export type Position = 'top' | 'bottom' | null;

export const useInViewport = <T extends HTMLElement>(
	onView: (inView: boolean, position: Position, height: number) => void,
) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.rootBounds) return;

			let position: Position = null;

			if (entry.isIntersecting) {
				const intersectingTop =
					entry.intersectionRect.top === entry.rootBounds.top;
				const intersectingBottom =
					entry.intersectionRect.bottom === entry.rootBounds.bottom;

				if (intersectingTop && intersectingBottom) {
					position = null;
				} else if (intersectingTop) {
					position = 'top';
				} else if (intersectingBottom) {
					position = 'bottom';
				} else {
					position = null;
				}
			} else {
				if (entry.boundingClientRect.bottom < entry.rootBounds.top) {
					position = 'top';
				} else if (
					entry.boundingClientRect.top > entry.rootBounds.bottom
				) {
					position = 'bottom';
				}
			}

			onView(
				entry.isIntersecting,
				position,
				entry.boundingClientRect.height,
			);
		});
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [onView]);

	return ref;
};
