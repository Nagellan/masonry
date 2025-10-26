import { useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';

import { Masonry } from '@/components/Masonry';
import type { RenderComponent } from '@/components/Masonry/types';
import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';
import { useColumns } from './useColumns';

const Wrapper = styled.main`
	height: 100%;
	width: 100%;
`;

type Props = {
	photos: PhotoType[];
	page: number;
	onScrollEnd: () => void;
};

export const Content = ({ photos, page, onScrollEnd }: Props) => {
	const masonryRef = useRef<HTMLDivElement>(null);

	const columns = useColumns();

	const photoIds = useMemo(() => photos.map((photo) => photo.id), [photos]);

	const onPhotoClick = useCallback(() => {
		localStorage.setItem('lastPage', String(page));
		if (!masonryRef.current) return;
		localStorage.setItem(
			'lastScroll',
			String(masonryRef.current.scrollTop),
		);
	}, [page]);

	const onScrollHeightChange = useCallback(() => {
		const lastScroll = localStorage.getItem('lastScroll');
		if (!lastScroll || !masonryRef.current) return;
		localStorage.removeItem('lastScroll');
		masonryRef.current.scroll({ top: Number(lastScroll) });
	}, []);

	const renderComponent = useCallback<RenderComponent<PhotoType['id']>>(
		({ id, index, ref }) => {
			const photo = photos[index];
			return (
				<Photo
					key={id}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					// serve 3 indexes for links in a footer
					tabIndex={4 + index}
					onClick={onPhotoClick}
					ref={ref}
				/>
			);
		},
		[photos, onPhotoClick],
	);

	return (
		<Wrapper>
			<Masonry<PhotoType['id']>
				ref={masonryRef}
				ids={photoIds}
				renderComponent={renderComponent}
				onScrollEnd={onScrollEnd}
				onScrollHeightChange={onScrollHeightChange}
				columns={columns}
			/>
		</Wrapper>
	);
};
