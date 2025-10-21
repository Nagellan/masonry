import { useEffect, useRef, useCallback } from 'react';
import type { RefObject } from 'react';

type OnScrollEnd = () => void;

export const useLoadOnScroll = (
	wrapperRef: RefObject<HTMLElement | null>,
	onScrollEnd: OnScrollEnd,
) => {
	const loadingRef = useRef<boolean>(false);

	const onLoaded = useCallback(() => {
		loadingRef.current = false;
	}, []);

	useEffect(() => {
		const onScroll = () => {
			if (!wrapperRef.current || loadingRef.current) return;

			// one screen height before scroll end
			if (
				window.scrollY + window.innerHeight >=
				wrapperRef.current.scrollHeight - window.innerHeight
			) {
				loadingRef.current = true;
				onScrollEnd();
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [wrapperRef, onScrollEnd]);

	return onLoaded;
};
