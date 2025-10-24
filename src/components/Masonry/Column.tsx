import { useState, useMemo, useCallback, useRef } from 'react';
import type { JSX } from 'react';
import styled from 'styled-components';

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

type Props<Key> = {
	keys: Key[];
	gap: number;
	scroll: number;
	renderComponent: (props: {
		key: Key;
		index: number;
		top: number | undefined;
		onLoad: (key: Key, height: number) => void;
		onResize: (key: Key, height: number) => void;
	}) => JSX.Element;
};

export const Column = <Key extends string | number>({
	keys,
	gap,
	scroll,
	renderComponent,
}: Props<Key>) => {
	const ref = useRef<HTMLDivElement>(null);

	const [heights, setHeights] = useState({} as Record<Key, number>);
	const onComponentLoad = useCallback((key: Key, height: number) => {
		setHeights((prev) =>
			prev[key] === undefined ? { ...prev, [key]: height } : prev,
		);
	}, []);
	const onComponentResize = useCallback((key: Key, height: number) => {
		setHeights((prev) =>
			prev[key] === height ? prev : { ...prev, [key]: height },
		);
	}, []);

	const [wrapperHeight, componentPositions] = useMemo(() => {
		const topPositions = {} as Record<Key, { top: number; bottom: number }>;
		let totalHeight = 0;

		for (const key of keys) {
			if (!(key in heights) || heights[key] === 0) {
				break;
			}
			const componentHeight = heights[key];
			topPositions[key] = {
				top: totalHeight,
				bottom: totalHeight + componentHeight,
			};
			totalHeight += gap;
			totalHeight += componentHeight;
		}

		return [totalHeight, topPositions];
	}, [keys, heights, gap]);

	const visible = useMemo<Key[]>(() => {
		// render all components untill all their positions are calculated
		if (Object.keys(componentPositions).length !== keys.length) {
			return keys;
		}

		const result: Key[] = [];

		for (const key of keys) {
			if (
				componentPositions[key].bottom > scroll &&
				componentPositions[key].top < scroll + window.innerHeight
			) {
				result.push(key);
			}
		}

		return result;
	}, [keys, componentPositions, scroll]);

	return (
		<Wrapper $gap={gap} $height={wrapperHeight} ref={ref}>
			{keys.map((key, keyIndex) => {
				if (visible.includes(key)) {
					return renderComponent({
						key,
						index: keyIndex,
						top: componentPositions[key]?.top,
						onLoad: onComponentLoad,
						onResize: onComponentResize,
					});
				}
				return null;
			})}
		</Wrapper>
	);
};
