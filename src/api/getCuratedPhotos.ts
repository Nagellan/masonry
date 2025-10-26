import type { Photo } from './types';

type RawResponse = {
	photos: Photo[];
	page: number;
	per_page: number;
	total_results: number;
	prev_page?: string;
	next_page?: string;
};

type Response = {
	photos: Photo[];
	page: number;
	perPage: number;
	totalResults: number;
	prevPage?: string;
	nextPage?: string;
};

export async function getCuratedPhotos(
	page: number,
	perPage: number,
): Promise<Response> {
	const authToken = import.meta.env.VITE_PEXELS_API_TOKEN;

	if (!authToken) throw new Error('No Pexels token was provided!');

	const searchParams = new URLSearchParams({
		page: String(page),
		per_page: String(perPage),
	});

	const response: RawResponse = await fetch(
		`https://api.pexels.com/v1/curated?${searchParams}`,
		{
			method: 'GET',
			headers: { Authorization: authToken },
		},
	).then((response) => response.json());

	return {
		photos: response.photos,
		page: response.page,
		perPage: response.per_page,
		totalResults: response.total_results,
		prevPage: response.prev_page,
		nextPage: response.next_page,
	};
}
