import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

export const useScroll = (
	ref: RefObject<HTMLElement | null>,
	onScrollEnd: () => void,
) => {
	const [scroll, setScroll] = useState<number>(0);

	useEffect(() => {
		const onScroll = () => {
			setScroll(window.scrollY);

			if (!ref.current) return;

			// one screen height before scroll end
			if (
				window.scrollY + window.innerHeight >=
				ref.current.scrollHeight - window.innerHeight
			) {
				onScrollEnd();
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [ref, onScrollEnd]);

	return scroll;
};
