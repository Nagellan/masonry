import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export const useScrollPosition = (
	ref: RefObject<HTMLElement | null>,
): number => {
	const [position, setPosition] = useState<number>(() =>
		ref.current ? ref.current.scrollTop : 0,
	);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const onScroll = () => {
			setPosition(element.scrollTop);
		};

		element.addEventListener('scroll', onScroll);

		return () => {
			element.removeEventListener('scroll', onScroll);
		};
	}, [ref]);

	return position;
};
