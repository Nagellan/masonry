import { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const PhotoLink = styled(Link)`
	display: flex;
`;

const Container = styled.img`
	width: 100%;
	cursor: pointer;

	box-shadow:
		rgba(50, 50, 93, 0.25) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.3) 0px 0px 0px 0px;
	border-radius: 6px;

	transition:
		transform 0.2s ease-in-out,
		box-shadow 0.2s ease-in-out,
		border-radius 0.2s ease-in-out;

	&:hover,
	&:focus {
		transform: scale(1.1);
		box-shadow:
			rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		border-radius: 12px;
	}
`;

type Props = {
	id: number;
	src: string;
	alt?: string;
	tabIndex: number;
};

export const Photo = memo(({ id, src, alt, tabIndex }: Props) => {
	return (
		<PhotoLink to={`/photo/${id}`} tabIndex={tabIndex}>
			<Container
				src={src}
				alt={alt}
				srcSet={`${src}?auto=compress&cs=tinysrgb&w=150&loading=lazy 150w, ${src}?auto=compress&cs=tinysrgb&w=300&loading=lazy 300w, ${src}?auto=compress&cs=tinysrgb&w=400&loading=lazy 400w, ${src}?auto=compress&cs=tinysrgb&w=600&loading=lazy 600w, ${src}?auto=compress&cs=tinysrgb&w=800&loading=lazy 800w, ${src}?auto=compress&cs=tinysrgb&w=1200&loading=lazy 1200w, ${src}?auto=compress&cs=tinysrgb&w=1600&loading=lazy 1600w`}
				sizes="(width <= 425px) 425px, (width <= 768px) 384px, (width <= 1440px) 240px, (width <= 2560) 215px"
				loading="lazy"
			/>
		</PhotoLink>
	);
});
