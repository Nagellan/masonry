import styled from 'styled-components';

import type { Photo as PhotoType } from '@/api/types';

const Wrapper = styled.div<{ $width: number }>`
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.$width <= 100 ? 'center' : 'flex-start')};
	justify-content: center;
	flex-grow: 1;
`;

const Photo = styled.img<{ $width: number }>`
	width: ${(props) => props.$width}%;
	transition: width 0.2s ease-in-out;
`;

type Props = {
	photo: PhotoType;
	width: number;
};

export const Content = ({ photo, width }: Props) => {
	return (
		<Wrapper $width={width}>
			<Photo
				src={photo.src.original}
				alt={photo.alt}
				srcSet={`${photo.src.original}?auto=compress&cs=tinysrgb&w=150 150w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=300 300w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=400 400w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=600 600w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=800 800w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1200 1200w, ${photo.src.original}?auto=compress&cs=tinysrgb&w=1600 1600w`}
				sizes="(width <= 425px) 425px, (width <= 768px) 768px, (width <= 1440px) 1440px, (width <= 2560) 2560px"
				$width={width}
			/>
		</Wrapper>
	);
};
