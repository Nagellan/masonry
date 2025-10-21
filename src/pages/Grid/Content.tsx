import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import api from '@/api';
import type { Photo } from '@/api/types';

import { useColumns } from './useColumns';
import { useLoadOnScroll } from './useLoadOnScroll';

const Wrapper = styled.main`
	display: flex;
	flex-direction: row;
	gap: 1px;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex-grow: 1;
	gap: 1px;
`;

const Photo = styled.img`
	width: 100%;
`;

export const Content = () => {
	const wrapperRef = useRef<HTMLElement>(null);

	const [page, setPage] = useState<number>(1);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const columns = useColumns();

	const onScrollEnd = useCallback(() => {
		setPage((prev) => prev + 1);
	}, []);

	const onLoaded = useLoadOnScroll(wrapperRef, onScrollEnd);

	useEffect(() => {
		api.getPhotos(page, 40).then((response) => {
			setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
			onLoaded();
		});
	}, [page, onLoaded]);

	return (
		<Wrapper ref={wrapperRef}>
			{Array.from({ length: columns }, (_, columnIndex) => (
				<Column key={columnIndex}>
					{photos
						.filter(
							(_photo, photoIndex) =>
								photoIndex % columns === columnIndex,
						)
						.map((photo) => (
							<Photo
								key={photo.id}
								src={photo.src.medium}
								alt={photo.alt}
							/>
						))}
				</Column>
			))}
		</Wrapper>
	);
};
