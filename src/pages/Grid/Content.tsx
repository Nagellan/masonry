import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import api from '@/api';
import type { Photo } from '@/api/types';

import { useColumns } from './useColumns';
import { useLoadOnScroll } from './useLoadOnScroll';

const Wrapper = styled.main`
	display: flex;
	flex-direction: row;
	gap: 1px;

	// adds scrollbar for the case when photos don't overflow the screen space
	// with scrollbar we can trigger scroll event which triggers more photos loading
	min-height: calc(100vh + 20px);
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
	cursor: pointer;

	box-shadow:
		rgba(50, 50, 93, 0.25) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.3) 0px 0px 0px 0px;
	border-radius: 6px;

	transition:
		transform 0.2s ease-in-out,
		box-shadow 0.2s ease-in-out,
		border-radius 0.2s ease-in-out;

	&:hover {
		transform: scale(1.1);
		box-shadow:
			rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		border-radius: 12px;
	}
`;

export const Content = () => {
	const navigate = useNavigate();

	const wrapperRef = useRef<HTMLElement>(null);

	const [page, setPage] = useState<number>(1);
	const [photos, setPhotos] = useState<Photo[]>([]);
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
								src={photo.src.original}
								alt={photo.alt}
								srcSet={`${photo.src.original}?auto=compress&cs=tinysrgb&w=150&loading=lazy 150w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=300&loading=lazy 300w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=400&loading=lazy 400w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=600&loading=lazy 600w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=800&loading=lazy 800w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1200&loading=lazy 1200w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1600&loading=lazy 1600w`}
								sizes="(width <= 425px) 425px, (width <= 768px) 384px, (width <= 1440px) 240px, (width <= 2560) 215px"
								loading="lazy"
								onClick={() => navigate(`/photo/${photo.id}`)}
							/>
						))}
				</Column>
			))}
		</Wrapper>
	);
};
