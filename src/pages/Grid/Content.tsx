import { useMemo, useCallback } from 'react';

import { Masonry } from '@/components/Masonry';
import type { RenderComponent } from '@/components/Masonry/types';
import type { Photo as PhotoType } from '@/api/types';

import { Photo } from './Photo';
import { useColumns } from './useColumns';

type Props = {
	photos: PhotoType[];
	onScrollEnd: () => void;
};

export const Content = ({ photos, onScrollEnd }: Props) => {
	const columns = useColumns();

	const photoIds = useMemo(() => photos.map((photo) => photo.id), [photos]);

	const renderComponent = useCallback<RenderComponent<PhotoType['id']>>(
		({ id, index, style, ref }) => {
			const photo = photos[index];
			return (
				<Photo
					key={id}
					id={photo.id}
					src={photo.src.original}
					alt={photo.alt}
					// serve 3 indexes for links in a footer
					tabIndex={4 + index}
					style={style}
					ref={ref}
				/>
			);
		},
		[photos],
	);

	return (
		<Masonry
			ids={photoIds}
			renderComponent={renderComponent}
			onScrollEnd={onScrollEnd}
			columns={columns}
		/>
	);
};
