import { useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Masonry as UIMasonry } from '@/components/Masonry';
import type { RenderComponent } from '@/components/Masonry';
import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';
import { useColumns } from './useColumns';

const Masonry = styled(UIMasonry)`
	padding: 1px;

	// adds scrollbar for the case when photos don't overflow the screen space
	// with scrollbar we can trigger scroll event which triggers more photos loading
	min-height: calc(100vh + 20px);
` as typeof UIMasonry; // avoid losing generic

type Props = {
	photos: PhotoType[];
	onScrollEnd: () => void;
};

export const Content = ({ photos, onScrollEnd }: Props) => {
	const columns = useColumns();

	const photoIds = useMemo(() => photos.map((photo) => photo.id), [photos]);

	const renderComponent = useCallback<RenderComponent<PhotoType['id']>>(
		({ key, index, top, onLoad, onResize }) => {
			const photo = photos[index];
			return (
				<Photo
					key={key}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					// serve 3 indexes for links in a footer
					tabIndex={4 + index}
					onLoad={onLoad}
					onResize={onResize}
					top={top}
				/>
			);
		},
		[photos],
	);

	return (
		<Masonry
			keys={photoIds}
			renderComponent={renderComponent}
			onScrollEnd={onScrollEnd}
			columns={columns}
		/>
	);
};
