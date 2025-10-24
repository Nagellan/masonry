import { useEffect, useState } from 'react';

export const useScrollPosition = (): number => {
	const [position, setPosition] = useState<number>(() => window.scrollY);

	useEffect(() => {
		const onScroll = () => {
			setPosition(window.scrollY);
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return position;
};
