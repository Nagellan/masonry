import { useState, useEffect, useCallback } from 'react';

import { Page } from '@/components/page/Page';
import { PageHeader } from '@/components/page/PageHeader';
import { PageLoading } from '@/components/page/PageLoading';
import { PageFooter } from '@/components/page/PageFooter';
import api from '@/api';
import type { Photo } from '@/api/types';

import { Content } from './Content';

export const Grid = () => {
	const [page, setPage] = useState<number>(1);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		api.getPhotos(page, 80).then((response) => {
			setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
			if (page === 1) {
				// first load must be instant
				setLoading(false);
			} else {
				// other loads must be postponed to avoid multiple instant onScrollEnd calls
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		});
	}, [page]);

	const onScrollEnd = useCallback(() => {
		if (loading) return;

		setPage((prev) => prev + 1);
	}, [loading]);

	if (loading && page === 1) {
		return (
			<Page>
				<PageHeader
					title={
						<div>
							Masonry <i>by ireknazm</i>
						</div>
					}
				/>
				<PageLoading />
				<PageFooter />
			</Page>
		);
	}

	return (
		<Page>
			<PageHeader
				title={
					<div>
						Masonry <i>by ireknazm</i>
					</div>
				}
			/>
			<Content photos={photos} onScrollEnd={onScrollEnd} />
			<PageFooter />
		</Page>
	);
};
