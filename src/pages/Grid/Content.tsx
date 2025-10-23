import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import api from '@/api';
import type { Photo as PhotoType } from '@/api/types';

import { Column } from './Column';
import { useColumns } from './useColumns';
import { useLoadOnScroll } from './useLoadOnScroll';

const Wrapper = styled.main`
	display: flex;
	flex-direction: row;
	gap: 1px;
	padding: 1px;

	// adds scrollbar for the case when photos don't overflow the screen space
	// with scrollbar we can trigger scroll event which triggers more photos loading
	min-height: calc(100vh + 20px);
`;

export const Content = () => {
	const wrapperRef = useRef<HTMLElement>(null);

	const [page, setPage] = useState<number>(1);
	const [photos, setPhotos] = useState<PhotoType[]>([]);
	const columns = useColumns();

	const onScrollEnd = useCallback(() => {
		setPage((prev) => prev + 1);
	}, []);

	const onLoaded = useLoadOnScroll(wrapperRef, onScrollEnd);

	useEffect(() => {
		api.getPhotos(page, 80).then((response) => {
			setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
			onLoaded();
		});
	}, [page, onLoaded]);

	const getTabIndex = useCallback(
		(photoIndex: number, columnIndex: number) => {
			// serve 3 indexes for links in a footer
			return 4 + photoIndex * columns + columnIndex;
		},
		[columns],
	);

	const photosByColumns = useMemo(
		() =>
			Array.from({ length: columns }, (_, columnIndex) =>
				photos.filter(
					(_photo, photoIndex) =>
						photoIndex % columns === columnIndex,
				),
			),
		[photos, columns],
	);

	if (photos.length === 0) {
		return '...';
	}

	return (
		<Wrapper ref={wrapperRef}>
			{photosByColumns.map((columnPhotos, columnIndex) => (
				<Column
					key={columnIndex}
					gap={1}
					photos={columnPhotos}
					getTabIndex={(photoIndex) =>
						getTabIndex(photoIndex, columnIndex)
					}
				/>
			))}
		</Wrapper>
	);
};
