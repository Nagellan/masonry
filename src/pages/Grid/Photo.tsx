import { memo, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const PhotoLink = styled(Link)<{ $top: number }>`
	display: flex;
	position: absolute;
	top: ${(props) => props.$top ?? 0}px;
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
	onLoad: (id: number, height: number) => void;
	top: number;
};

export const Photo = memo(({ id, src, alt, tabIndex, onLoad, top }: Props) => {
	const ref = useRef<HTMLImageElement>(null);

	useLayoutEffect(() => {
		const img = ref.current;
		if (!img) return;

		const onImageLoad = () => {
			onLoad(id, img.clientHeight);
		};

		if (img.complete) {
			onImageLoad();
			return;
		}

		img.addEventListener('load', onImageLoad);

		return () => {
			if (!img) return;
			img.removeEventListener('load', onImageLoad);
		};
	}, [id, onLoad]);

	return (
		<PhotoLink to={`/photo/${id}`} tabIndex={tabIndex} $top={top}>
			<Container
				ref={ref}
				src={src}
				alt={alt}
				srcSet={`${src}?auto=compress&cs=tinysrgb&w=150 150w, ${src}?auto=compress&cs=tinysrgb&w=300 300w, ${src}?auto=compress&cs=tinysrgb&w=400 400w, ${src}?auto=compress&cs=tinysrgb&w=600 600w, ${src}?auto=compress&cs=tinysrgb&w=800 800w, ${src}?auto=compress&cs=tinysrgb&w=1200 1200w, ${src}?auto=compress&cs=tinysrgb&w=1600 1600w`}
				sizes="(width <= 425px) 425px, (width <= 768px) 384px, (width <= 1440px) 240px, (width <= 2560) 215px"
			/>
		</PhotoLink>
	);
});
