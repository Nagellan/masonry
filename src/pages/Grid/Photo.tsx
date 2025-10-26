import { memo } from 'react';
import type { RefObject } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const PhotoLink = styled(Link)`
	display: flex;
`;

const Container = styled.img`
	width: 100%;
	cursor: pointer;
	border-radius: 6px;

	transition:
		transform 0.2s ease-in-out,
		border-radius 0.2s ease-in-out;

	&:hover,
	&:focus {
		transform: scale(0.9);
		border-radius: 24px;
		z-index: 1;
	}
`;

type Props = {
	id: number;
	src: string;
	alt?: string;
	tabIndex: number;
	ref: RefObject<HTMLElement | null>;
	onClick?: () => void;
};

export const Photo = memo(({ id, src, alt, tabIndex, ref, onClick }: Props) => {
	return (
		<PhotoLink
			to={`/photo/${id}`}
			tabIndex={tabIndex}
			ref={(el) => {
				ref.current = el;
			}}
			onClick={onClick}
			aria-label={`Open details and full-size picture of ${alt}`}
		>
			<Container
				src={src}
				alt={alt}
				srcSet={`${src}?auto=compress&cs=tinysrgb&w=150 150w, ${src}?auto=compress&cs=tinysrgb&w=300 300w, ${src}?auto=compress&cs=tinysrgb&w=400 400w, ${src}?auto=compress&cs=tinysrgb&w=600 600w, ${src}?auto=compress&cs=tinysrgb&w=800 800w, ${src}?auto=compress&cs=tinysrgb&w=1200 1200w, ${src}?auto=compress&cs=tinysrgb&w=1600 1600w`}
				sizes="(width <= 425px) 425px, (width <= 768px) 384px, (width <= 1440px) 240px, (width <= 2560px) 215px"
				fetchPriority="high"
			/>
		</PhotoLink>
	);
});
