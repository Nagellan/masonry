import { getPhotos } from './getPhotos';
import type { Photo } from './types';

type Response = {
	photos: Photo[];
	page: number;
	perPage: number;
	totalResults: number;
	nextPage?: string;
};

/**
 * Returns all photos from 1st page to the passed one.
 */
export async function getAllPhotos(
	pages: number,
	perPage: number,
	query = '',
): Promise<Response> {
	const promises = [];

	for (let i = 1; i <= pages; i++) {
		promises.push(getPhotos(i, perPage, query));
	}

	const responses = await Promise.all(promises);

	const photos = responses.flatMap((response) => response.photos);
	const totalResults = responses[0].totalResults;
	const nextPage = responses[responses.length - 1].nextPage;

	return {
		photos,
		page: pages,
		perPage,
		totalResults,
		nextPage,
	};
}
