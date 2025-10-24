import { useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import type { Photo } from '@/api/types';

import { Column } from './Column';
import { useColumns } from './useColumns';
import { useOnScrollEnd } from './useOnScrollEnd';

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
	photos: Photo[];
	onScrollEnd: () => void;
};

export const Content = ({ photos, onScrollEnd }: Props) => {
	const ref = useRef<HTMLElement>(null);

	useOnScrollEnd(ref, onScrollEnd);

	const columns = useColumns();

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

	return (
		<Wrapper ref={ref}>
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
