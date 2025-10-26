import { useRef, useMemo, memo, useState, useCallback } from 'react';
import type { HTMLAttributes, RefObject } from 'react';
import styled from 'styled-components';

import type { SupportedId, RenderComponent } from './types';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useOnScrollEnd } from './hooks/useOnScrollEnd';
import { useHeight } from './hooks/useHeight';
import { Column } from './Column';

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
	onScrollEnd?: () => void;
	onScrollHeightChange: (height: number) => void;
	columns: number;
	threshold?: number;
	gapX?: number;
	gapY?: number;
	height?: number | `${number}%`;
	width?: number | `${number}%`;
	ref?: RefObject<HTMLDivElement | null>;
} & HTMLAttributes<HTMLDivElement>;

const MasonryWithoutMemo = <Id extends SupportedId>({
	ids,
	renderComponent,
	onScrollEnd,
	onScrollHeightChange,
	columns,
	threshold = 400,
	gapX = 1,
	gapY = 1,
	height = '100%',
	width = '100%',
	ref: externalRef,
	...props
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

	const [, setMaxColumnHeight] = useState<number>(0);
	const onColumnHeightChange = useCallback(
		(height: number) => {
			setMaxColumnHeight((prev) => {
				if (height > prev) {
					onScrollHeightChange(height);
					return height;
				}
				return prev;
			});
		},
		[onScrollHeightChange],
	);

	return (
		<Wrapper
			ref={(r) => {
				ref.current = r;
				if (externalRef) externalRef.current = r;
			}}
			$gap={gapX}
			$height={height}
			$width={width}
			{...props}
		>
			{idsByColumns.map((ids, columnIndex) => (
				<Column<Id>
					key={columnIndex}
					gap={gapY}
					scroll={scroll}
					ids={ids}
					threshold={threshold}
					viewportHeight={viewportHeight}
					onHeightChange={onColumnHeightChange}
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
