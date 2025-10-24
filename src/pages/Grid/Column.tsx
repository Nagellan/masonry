import { useState, useMemo, useCallback, useRef } from 'react';
import type { JSX } from 'react';
import styled from 'styled-components';

import type { Photo } from '@/api/types';

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
	photos: Photo[];
	gap: number;
	scroll: number;
	renderItem: (props: {
		photo: Photo;
		index: number;
		top: number | undefined;
		onLoad: (id: number, height: number) => void;
		onResize: (id: number, height: number) => void;
	}) => JSX.Element;
};

export const Column = ({ photos, gap, scroll, renderItem }: Props) => {
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

	const [wrapperHeight, photoPositions] = useMemo(() => {
		const topPositions: Record<string, { top: number; bottom: number }> =
			{};
		let totalHeight = 0;

		for (const photo of photos) {
			if (!(photo.id in photoHeights) || photoHeights[photo.id] === 0) {
				break;
			}
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
		// render all photos untill all their positions are calculated
		if (Object.keys(photoPositions).length !== photos.length) {
			return photos;
		}

		const result = [];

		for (const photo of photos) {
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
			{visible.map((photo, photoIndex) =>
				renderItem({
					photo,
					index: photoIndex,
					top: photoPositions[photo.id]?.top,
					onLoad: onPhotoLoad,
					onResize: onPhotoResize,
				}),
			)}
		</Wrapper>
	);
};
