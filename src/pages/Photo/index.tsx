import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Page } from '@/components/page/Page';
import { PageHeader } from '@/components/page/PageHeader';
import { PageFooter } from '@/components/page/PageFooter';
import { PageLoading } from '@/components/page/PageLoading';
import { Button } from '@/components/ui/Button';
import api from '@/api';
import { NotFoundError } from '@/api/errors';
import type { Photo as PhotoType } from '@/api/types';

import { Content } from './Content';
import { ZoomControl } from './ZoomControl';

export const Photo = () => {
	const navigate = useNavigate();
	const params = useParams();

	const [photo, setPhoto] = useState<PhotoType | null>(null);
	const [width, setWidth] = useState<number>(100);

	useEffect(() => {
		if (!params.photoId) {
			throw new Error('No photoId found in url params!');
		}

		api.getPhoto(params.photoId)
			.then(setPhoto)
			.catch((error) => {
				// redirect to 404 page if there's no photo with such id
				if (error instanceof NotFoundError) {
					navigate('/404');
				}
			});
	}, [params.photoId, navigate]);

	const goBack = useCallback(() => {
		navigate('/');
	}, [navigate]);

	if (!photo) {
		return (
			<Page>
				<PageHeader
					title="..."
					left={<Button onClick={goBack}>Back</Button>}
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
					<a href={photo.photographer_url} target="_blank">
						{photo.photographer}
					</a>
				}
				left={<Button onClick={goBack}>Back</Button>}
				right={
					<ZoomControl
						zoom={width}
						onZoomIn={() =>
							setWidth((prev) => Math.min(prev + 10, 200))
						}
						onZoomOut={() =>
							setWidth((prev) => Math.max(prev - 10, 10))
						}
						onZoomFull={() => setWidth(100)}
					/>
				}
			/>
			<Content photo={photo} width={width} />
			<PageFooter />
		</Page>
	);
};
