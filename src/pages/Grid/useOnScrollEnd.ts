import { useEffect } from 'react';
import type { RefObject } from 'react';

type OnScrollEnd = () => void;

export const useOnScrollEnd = (
	wrapperRef: RefObject<HTMLElement | null>,
	onScrollEnd: OnScrollEnd,
) => {
	useEffect(() => {
		const onScroll = () => {
			if (!wrapperRef.current) return;

			// one screen height before scroll end
			if (
				window.scrollY + window.innerHeight >=
				wrapperRef.current.scrollHeight - window.innerHeight
			) {
				onScrollEnd();
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [wrapperRef, onScrollEnd]);
};
