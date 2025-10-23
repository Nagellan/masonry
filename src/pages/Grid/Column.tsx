import { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';
import { Spacer } from './Spacer';
import type { Position } from './useInViewport';

const Wrapper = styled.div<{ $gap: number }>`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex-grow: 1;
	gap: ${(props) => props.$gap}px;
`;

type Props = {
	photos: PhotoType[];
	gap: number;
	getTabIndex: (photoIndex: number) => number;
};

export const Column = ({ photos, gap, getTabIndex }: Props) => {
	const [topHeight, setTopHeight] = useState<number>(1);
	const [bottomHeight, setBottomHeight] = useState<number>(1);
	const [visibility, setVisibility] = useState<Record<string, boolean>>(() =>
		photos.reduce<Record<string, boolean>>((prev, photo) => {
			prev[photo.id] = true;
			return prev;
		}, {}),
	);

	const onView = useCallback(
		(id: number, inView: boolean, position: Position, height: number) => {
			if (inView) {
				if (position === 'top' || position === null)
					setTopHeight((prev) => Math.max(1, prev - height - gap));
				if (position === 'bottom')
					setBottomHeight((prev) => Math.max(1, prev - height - gap));
			} else {
				if (position === 'top')
					setTopHeight(
						(prev) => prev + height + (prev === 0 ? 0 : gap),
					);
				if (position === 'bottom')
					setBottomHeight(
						(prev) => prev + height + (prev === 0 ? 0 : gap),
					);
			}

			setVisibility((prev) =>
				prev[id] === inView ? prev : { ...prev, [id]: inView },
			);
		},
		[gap],
	);

	const visible = useMemo(
		() => photos.filter((photo) => visibility[photo.id]),
		[photos, visibility],
	);

	const topIndex = useMemo(
		() => photos.findIndex((photo) => photo.id === visible[0].id),
		[photos, visible],
	);

	const bottomIndex = useMemo(
		() =>
			photos.findIndex(
				(photo) => photo.id === visible[visible.length - 1].id,
			),
		[photos, visible],
	);

	const onTopSpacerView = useCallback(
		(inView: boolean) => {
			if (!inView) return;
			const newTopIndex = Math.max(topIndex - 1, 0);
			const id = photos[newTopIndex].id;
			setVisibility((prev) =>
				prev[id] ? prev : { ...prev, [id]: true },
			);
		},
		[photos, topIndex],
	);

	const onBottomSpacerView = useCallback(
		(inView: boolean) => {
			if (!inView) return;
			const newBottomIndex = Math.min(bottomIndex + 1, photos.length - 1);
			const id = photos[newBottomIndex].id;
			setVisibility((prev) =>
				prev[id] ? prev : { ...prev, [id]: true },
			);
		},
		[photos, bottomIndex],
	);

	return (
		<Wrapper $gap={gap}>
			<Spacer height={topHeight} onView={onTopSpacerView} />

			{visible.map((photo, photoIndex) => (
				<Photo
					key={photo.id}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					tabIndex={getTabIndex(photoIndex)}
					onView={onView}
				/>
			))}

			<Spacer height={bottomHeight} onView={onBottomSpacerView} />
		</Wrapper>
	);
};
