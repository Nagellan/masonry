import { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '@/api';
import type { Photo } from '@/api/types';

import { useColumns } from './useColumns';

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
	const [photos, setPhotos] = useState<Photo[]>([]);

	useEffect(() => {
		api.getPhotos(1, 40).then((response) => setPhotos(response.photos));
	}, []);

	const columns = useColumns();

	return (
		<Wrapper>
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
