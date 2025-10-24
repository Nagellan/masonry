import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';

const Wrapper = styled.div.attrs<{ $gap: number; $height: number }>(
	(props) => ({
		style: { height: `${props.$height}px` },
	}),
)`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex-grow: 1;
	gap: ${(props) => props.$gap}px;
	position: relative;
`;

type Props = {
	photos: PhotoType[];
	gap: number;
	getTabIndex: (photoIndex: number) => number;
};

export const Column = ({ photos, gap, getTabIndex }: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	const [photoHeights, setPhotoHeights] = useState<Record<string, number>>(
		{},
	);
	const onPhotoLoad = useCallback((id: number, height: number) => {
		setPhotoHeights((prev) =>
			prev[id] === undefined ? { ...prev, [id]: height } : prev,
		);
	}, []);
	const onPhotoResize = useCallback((id: number, height: number) => {
		setPhotoHeights((prev) =>
			prev[id] === height ? prev : { ...prev, [id]: height },
		);
	}, []);

	const [scroll, setScroll] = useState<number>(0);
	useEffect(() => {
		const onScroll = () => {
			setScroll(window.scrollY);
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	const [wrapperHeight, photoPositions] = useMemo(() => {
		const topPositions: Record<string, { top: number; bottom: number }> =
			{};
		let totalHeight = 0;

		for (const photo of photos) {
			if (!(photo.id in photoHeights)) continue;
			const imgHeight = photoHeights[photo.id];
			topPositions[photo.id] = {
				top: totalHeight,
				bottom: totalHeight + imgHeight,
			};
			totalHeight += gap;
			totalHeight += imgHeight;
		}

		return [totalHeight, topPositions];
	}, [photos, photoHeights, gap]);

	const visible = useMemo(() => {
		if (Object.keys(photoPositions).length !== photos.length) {
			return photos;
		}

		const result = [];

		for (const photo of photos) {
			if (!(photo.id in photoPositions)) continue;
			if (
				photoPositions[photo.id].bottom > scroll &&
				photoPositions[photo.id].top < scroll + window.innerHeight
			) {
				result.push(photo);
			}
		}

		return result;
	}, [photos, photoPositions, scroll]);

	return (
		<Wrapper $gap={gap} $height={wrapperHeight} ref={ref}>
			{visible.map((photo, photoIndex) => (
				<Photo
					key={photo.id}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					tabIndex={getTabIndex(photoIndex)}
					onLoad={onPhotoLoad}
					onResize={onPhotoResize}
					top={photoPositions[photo.id]?.top ?? 0}
				/>
			))}
		</Wrapper>
	);
};
