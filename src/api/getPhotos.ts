import type { Photo } from './types';

type Response = {
	photos: Photo[];
	page: number;
	per_page: number;
	total_results: number;
	prev_page?: string;
	next_page?: string;
};

export function getPhotos(page: number, perPage: number): Promise<Response> {
	const authToken = process.env.PEXELS_API_TOKEN;

	if (!authToken) throw new Error('No Pexels token was provided!');

	const searchParams = new URLSearchParams({
		page: String(page),
		per_page: String(perPage),
	});

	return fetch(`https://api.pexels.com/v1/curated?${searchParams}`, {
		method: 'GET',
		headers: { Authorization: authToken },
	}).then((response) => response.json() as Promise<Response>); // casted to typify the response
}
