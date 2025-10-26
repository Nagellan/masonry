import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useOnScrollEnd = (
	ref: RefObject<HTMLElement | null>,
	onEnd?: () => void,
	threshold: number | (() => number) = 0,
) => {
	useEffect(() => {
		const element = ref.current;
		if (!element || !onEnd) return;

		const onScroll = () => {
			const numericThreshold =
				typeof threshold === 'function' ? threshold() : threshold;

			if (
				element.scrollTop + element.clientHeight >=
				element.scrollHeight - numericThreshold
			) {
				onEnd();
			}
		};

		element.addEventListener('scroll', onScroll);

		return () => {
			element.removeEventListener('scroll', onScroll);
		};
	}, [ref, onEnd, threshold]);
};
