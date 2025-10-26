import { getCuratedPhotos } from './getCuratedPhotos';
import { searchPhotos } from './searchPhotos';

/**
 * Returns curated photos if no search query is passed.
 * Otherwise, returns photos searched by the query.
 */
export async function getPhotos(page: number, perPage: number, query = '') {
	if (!query) {
		return getCuratedPhotos(page, perPage);
	}

	return searchPhotos(query, page, perPage);
}
