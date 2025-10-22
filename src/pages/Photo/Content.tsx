import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`;

const Photo = styled.img<{ $maxWidth: number }>`
	max-width: ${(props) => props.$maxWidth}%;
	transition: max-width 0.2s ease-in-out;
`;

type Props = {
	photo: PhotoType;
	maxWidth: number;
};

export const Content = ({ photo, maxWidth }: Props) => {
	return (
		<Wrapper>
			<Photo
				src={photo.src.original}
				alt={photo.alt}
				srcSet={`${photo.src.original}?auto=compress&cs=tinysrgb&w=150 150w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=300 300w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=400 400w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=600 600w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=800 800w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1200 1200w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1600 1600w`}
				sizes="(width <= 425px) 425px, (width <= 768px) 768px, (width <= 1440px) 1440px, (width <= 2560) 2560px"
				$maxWidth={maxWidth}
			/>
		</Wrapper>
	);
};
