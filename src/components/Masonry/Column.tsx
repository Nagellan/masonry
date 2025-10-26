import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
	threshold: number;
	renderComponent: RenderComponent<Id>;
};

export const Column = <Id extends SupportedId>({
	ids,
	gap,
	scroll,
	viewportHeight,
	threshold,
	renderComponent,
}: Props<Id>) => {
	const ref = useRef<HTMLDivElement>(null);

	const [visibleStart, setVisibleStart] = useState(0);
	const [visibleEnd, setVisibleEnd] = useState(ids.length - 1);
	const [heights, setHeights] = useState<number[]>([]);
	const [positions, setPositions] = useState<number[]>([]);
	const [, setPrevIds] = useState(ids);

	// total heights of all elements + gaps between them
	const wrapperHeight = useMemo(
		() =>
			heights.reduce((prev, height) => prev + height, 0) +
			(heights.filter(Boolean).length - 1) * gap,
		[heights, gap],
	);

	// update heights array on each component resize
	const onComponentResize = useCallback((index: number, height: number) => {
		setHeights((prevHeights) => {
			// ignoring height=0 prevents cumulative layout shifts
			if (height === prevHeights[index] || height === 0) {
				return prevHeights;
			}
			const newHeights = [...prevHeights];
			newHeights[index] = height;
			return newHeights;
		});
	}, []);

	// listen to ids array updates
	useEffect(() => {
		// everything is inside setPrevIds callback to avoid having prevIds as a dependency
		setPrevIds((prevIds) => {
			let same = true;
			for (let i = 0; i < Math.min(prevIds.length, ids.length); i++) {
				if (prevIds[i] !== ids[i]) {
					same = false;
					break;
				}
			}
			// if nothing is changed, do nothing
			if (same && prevIds.length === ids.length) {
				return prevIds;
			}
			// if new ids are just additions/reductions to previous ones, update only diff visibility
			if (same) {
				setVisibleEnd(ids.length);
			}
			// if new ids are different, reset the whole state, because indexes changed
			// and we need to recalculate everything from the beginning
			else {
				setHeights([]);
				setPositions([]);
				setVisibleStart(0);
				setVisibleEnd(ids.length - 1);
			}
			return ids;
		});
	}, [ids]);

	// recalculate and update positions when all heights are present
	useEffect(() => {
		if (ids.length !== heights.filter((h) => h !== undefined).length)
			return;
		let totalHeight = 0;
		const newPositions = [];
		for (let i = 0; i < ids.length; i++) {
			newPositions[i] = totalHeight;
			totalHeight += gap;
			totalHeight += heights[i];
		}
		setPositions(newPositions);
	}, [ids.length, heights, gap]);

	// recalculate visibility range when all positions are present
	useEffect(() => {
		if (ids.length !== positions.filter((p) => p !== undefined).length)
			return;
		let index = 0;
		while (positions[index] + heights[index] < scroll - threshold) {
			index++;
		}
		setVisibleStart(index);
		while (positions[index] < scroll + viewportHeight + threshold) {
			index++;
		}
		setVisibleEnd(index - 1);
	}, [scroll, ids.length, positions, heights, viewportHeight, threshold]);

	return (
		<Wrapper $gap={gap} $height={wrapperHeight} ref={ref}>
			{ids.map((id, index) => {
				if (index >= visibleStart && index <= visibleEnd) {
					return (
						<ColumnItem<Id>
							key={id}
							id={id}
							index={index}
							top={positions[index]}
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
