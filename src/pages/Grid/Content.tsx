import { useRef, useMemo } from 'react';
import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

import { Column } from './Column';
import { Photo } from './Photo';
import { useColumns } from './useColumns';
import { useScroll } from './useScroll';

const Wrapper = styled.main`
	display: flex;
	flex-direction: row;
	gap: 1px;
	padding: 1px;

	// adds scrollbar for the case when photos don't overflow the screen space
	// with scrollbar we can trigger scroll event which triggers more photos loading
	min-height: calc(100vh + 20px);
`;

type Props = {
	photos: PhotoType[];
	onScrollEnd: () => void;
};

export const Content = ({ photos, onScrollEnd }: Props) => {
	const ref = useRef<HTMLElement>(null);

	const scroll = useScroll(ref, onScrollEnd);

	const columns = useColumns();

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

	const getTabIndex = (photoIndex: number, columnIndex: number) => {
		// serve 3 indexes for links in a footer
		return 4 + photoIndex * columns + columnIndex;
	};

	return (
		<Wrapper ref={ref}>
			{photosByColumns.map((columnPhotos, columnIndex) => (
				<Column
					key={columnIndex}
					gap={1}
					scroll={scroll}
					photos={columnPhotos}
					renderItem={({ photo, index, top, onLoad, onResize }) => (
						<Photo
							key={photo.id}
							id={photo.id}
							src={photo.src.original}
							alt={photo.alt}
							tabIndex={getTabIndex(index, columnIndex)}
							onLoad={onLoad}
							onResize={onResize}
							top={top}
						/>
					)}
				/>
			))}
		</Wrapper>
	);
};
