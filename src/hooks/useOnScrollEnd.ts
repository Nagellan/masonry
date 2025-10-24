import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useOnScrollEnd = (
	ref: RefObject<HTMLElement | null>,
	onEnd: () => void,
	threshold: number | (() => number) = 0,
) => {
	useEffect(() => {
		const onScroll = () => {
			if (!ref.current) return;
			const numericThreshold =
				typeof threshold === 'function' ? threshold() : threshold;

			if (
				window.scrollY + window.innerHeight >=
				ref.current.scrollHeight - numericThreshold
			) {
				onEnd();
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [ref, onEnd, threshold]);
};
