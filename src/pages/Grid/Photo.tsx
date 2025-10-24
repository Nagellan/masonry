import { memo, useRef, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const PhotoLink = styled(Link).attrs<{ $top: number; $hidden: boolean }>(
	(props) => ({
		style: { top: `${props.$top}px` },
	}),
)`
	display: flex;
	position: absolute;
	visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};
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
	top: number | undefined;
	onLoad: (id: number, height: number) => void;
	onResize: (id: number, height: number) => void;
};

export const Photo = memo(
	({ id, src, alt, tabIndex, top, onLoad, onResize }: Props) => {
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

		useEffect(() => {
			const img = ref.current;
			if (!img) return;

			const resizeObserver = new ResizeObserver(([entry]) => {
				if (entry.target.clientHeight > 0) {
					onResize(id, entry.target.clientHeight);
				}
			});

			resizeObserver.observe(img);

			return () => {
				resizeObserver.unobserve(img);
			};
		}, [id, onResize]);

		return (
			<PhotoLink
				to={`/photo/${id}`}
				tabIndex={tabIndex}
				$top={top ?? 0}
				// while position is not yet calculated, hide photo to avoid shifts & blinks
				$hidden={top === undefined}
			>
				<Container
					ref={ref}
					src={src}
					alt={alt}
					srcSet={`${src}?auto=compress&cs=tinysrgb&w=150 150w, ${src}?auto=compress&cs=tinysrgb&w=300 300w, ${src}?auto=compress&cs=tinysrgb&w=400 400w, ${src}?auto=compress&cs=tinysrgb&w=600 600w, ${src}?auto=compress&cs=tinysrgb&w=800 800w, ${src}?auto=compress&cs=tinysrgb&w=1200 1200w, ${src}?auto=compress&cs=tinysrgb&w=1600 1600w`}
					sizes="(width <= 425px) 425px, (width <= 768px) 384px, (width <= 1440px) 240px, (width <= 2560px) 215px"
					fetchPriority="high"
				/>
			</PhotoLink>
		);
	},
);
