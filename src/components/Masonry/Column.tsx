import { useState, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';

import type { SupportedId, RenderComponent } from './types';
import { ColumnItem } from './ColumnItem';

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

type Props<Id extends SupportedId> = {
	ids: Id[];
	gap: number;
	scroll: number;
	viewportHeight: number;
	renderComponent: RenderComponent<Id>;
};

export const Column = <Id extends SupportedId>({
	ids,
	gap,
	scroll,
	viewportHeight,
	renderComponent,
}: Props<Id>) => {
	const ref = useRef<HTMLDivElement>(null);

	const [heights, setHeights] = useState({} as Record<Id, number>);
	const onComponentResize = useCallback((id: Id, height: number) => {
		setHeights((prev) =>
			prev[id] === height || height === 0
				? prev
				: { ...prev, [id]: height },
		);
	}, []);

	const [wrapperHeight, componentPositions] = useMemo(() => {
		const topPositions = {} as Record<Id, { top: number; bottom: number }>;
		let totalHeight = 0;

		for (const id of ids) {
			if (!(id in heights) || heights[id] === 0) {
				break;
			}
			const componentHeight = heights[id];
			topPositions[id] = {
				top: totalHeight,
				bottom: totalHeight + componentHeight,
			};
			totalHeight += gap;
			totalHeight += componentHeight;
		}

		return [totalHeight, topPositions];
	}, [ids, heights, gap]);

	const visible = useMemo<Id[]>(() => {
		// render all components untill all their positions are calculated
		if (Object.keys(componentPositions).length !== ids.length) {
			return ids;
		}

		const result: Id[] = [];

		for (const id of ids) {
			if (
				componentPositions[id].bottom > scroll &&
				componentPositions[id].top < scroll + viewportHeight
			) {
				result.push(id);
			}
		}

		return result;
	}, [ids, componentPositions, viewportHeight, scroll]);

	return (
		<Wrapper $gap={gap} $height={wrapperHeight} ref={ref}>
			{ids.map((id, index) => {
				if (visible.includes(id)) {
					return (
						<ColumnItem<Id>
							key={id}
							id={id}
							index={index}
							top={componentPositions[id]?.top}
							renderComponent={renderComponent}
							onResize={onComponentResize}
						/>
					);
				}
				return null;
			})}
		</Wrapper>
	);
};
