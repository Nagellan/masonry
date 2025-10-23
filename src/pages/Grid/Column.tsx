import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';

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
	return (
		<Wrapper $gap={gap}>
			{photos.map((photo, photoIndex) => (
				<Photo
					key={photo.id}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					tabIndex={getTabIndex(photoIndex)}
				/>
			))}
		</Wrapper>
	);
};
