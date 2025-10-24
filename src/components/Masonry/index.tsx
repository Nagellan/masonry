import { useRef, useMemo, useCallback, memo } from 'react';
import type { JSX } from 'react';
import styled from 'styled-components';

import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useOnScrollEnd } from '@/hooks/useOnScrollEnd';

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

export type RenderComponent<Key> = ({
	key,
	index,
	top,
	onLoad,
	onResize,
}: {
	key: Key;
	index: number;
	top: number | undefined;
	onLoad: (key: Key, height: number) => void;
	onResize: (key: Key, height: number) => void;
}) => JSX.Element;

type Props<Key> = {
	keys: Key[];
	renderComponent: RenderComponent<Key>;
	onScrollEnd: () => void;
	columns: number;
	gapX?: number;
	gapY?: number;
	height?: number | `${number}%`;
	width?: number | `${number}%`;
};

const MasonryWithoutMemo = <Key extends string | number>({
	keys,
	renderComponent,
	onScrollEnd,
	columns,
	gapX = 1,
	gapY = 1,
	height = '100%',
	width = '100%',
}: Props<Key>) => {
	const ref = useRef<HTMLDivElement>(null);

	const scroll = useScrollPosition(ref);

	useOnScrollEnd(
		ref,
		onScrollEnd,
		useCallback(() => window.innerHeight, []),
	);

	const keysByColumns = useMemo(
		() =>
			Array.from({ length: columns }, (_, columnIndex) =>
				keys.filter(
					(_key, keyIndex) => keyIndex % columns === columnIndex,
				),
			),
		[keys, columns],
	);

	return (
		<Wrapper ref={ref} $gap={gapX} $height={height} $width={width}>
			{keysByColumns.map((keys, columnIndex) => (
				<Column<Key>
					key={columnIndex}
					gap={gapY}
					scroll={scroll}
					keys={keys}
					renderComponent={(props) =>
						renderComponent({
							...props,
							index: columns * props.index + columnIndex,
						})
					}
				/>
			))}
		</Wrapper>
	);
};

export const Masonry = memo(MasonryWithoutMemo) as typeof MasonryWithoutMemo; // avoid losing generic
