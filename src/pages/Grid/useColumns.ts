import { useState, useEffect } from 'react';

// TODO: refactor

const getColumns = () => {
	const width = window.innerWidth;

	// mobile
	if (width <= 425) {
		return 1;
	}

	// tablet
	if (width <= 768) {
		return 2;
	}

	// laptop
	if (width <= 1440) {
		return 6;
	}

	// 4K
	return 12;
};

export const useColumns = (): number => {
	const [columns, setColumns] = useState<number>(() => getColumns());

	useEffect(() => {
		const onResize = () => {
			setColumns(getColumns());
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return columns;
};
