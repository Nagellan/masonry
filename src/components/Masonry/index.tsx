import { useRef, useMemo, memo, useState } from 'react';
import styled from 'styled-components';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useOnScrollEnd } from '@/hooks/useOnScrollEnd';
import { useHeight } from '@/hooks/useHeight';

import { Column } from './Column';
import type { SupportedId, RenderComponent } from './types';

const Wrapper = styled.div<{
	$gap: number;
	$height: number | `${number}%`;
	$width: number | `${number}%`;
}>`
	display: flex;
	flex-direction: row;
	gap: ${(props) => `${props.$gap}px`};
	height: ${(props) =>
		typeof props.$height === 'number'
			? `${props.$height}px`
			: props.$height};
	width: ${(props) =>
		typeof props.$width === 'number' ? `${props.$width}px` : props.$width};
	overflow: auto;
`;

type Props<Id extends SupportedId> = {
	ids: Id[];
	renderComponent: RenderComponent<Id>;
	onScrollEnd: () => void;
	columns: number;
	gapX?: number;
	gapY?: number;
	height?: number | `${number}%`;
	width?: number | `${number}%`;
};

const MasonryWithoutMemo = <Id extends SupportedId>({
	ids,
	renderComponent,
	onScrollEnd,
	columns,
	gapX = 1,
	gapY = 1,
	height = '100%',
	width = '100%',
}: Props<Id>) => {
	const ref = useRef<HTMLDivElement>(null);

	const [viewportHeight, setViewportHeight] = useState<number>(() =>
		ref.current ? ref.current.clientHeight : 0,
	);

	useHeight(ref, setViewportHeight);

	const scroll = useScrollPosition(ref);

	useOnScrollEnd(
		ref,
		onScrollEnd,
		// notify scroll end evnet when scroll is one viewport height above wrapper scroll end
		viewportHeight,
	);

	const idsByColumns = useMemo(
		() =>
			Array.from({ length: columns }, (_, columnIndex) =>
				ids.filter((_id, index) => index % columns === columnIndex),
			),
		[ids, columns],
	);

	return (
		<Wrapper ref={ref} $gap={gapX} $height={height} $width={width}>
			{idsByColumns.map((ids, columnIndex) => (
				<Column<Id>
					key={columnIndex}
					gap={gapY}
					scroll={scroll}
					ids={ids}
					viewportHeight={viewportHeight}
					renderComponent={(props) =>
						renderComponent({
							...props,
							// transform index within column into index within grid
							index: columns * props.index + columnIndex,
						})
					}
				/>
			))}
		</Wrapper>
	);
};

export const Masonry = memo(MasonryWithoutMemo) as typeof MasonryWithoutMemo; // avoid losing generic
