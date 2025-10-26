import type { Photo } from './types';

type Response = {
	photos: Photo[];
	page: number;
	per_page: number;
	total_results: number;
	prev_page?: string;
	next_page?: string;
};

export async function searchPhotos(
	query: string,
	page: number,
	perPage: number,
): Promise<Response> {
	const authToken = import.meta.env.VITE_PEXELS_API_TOKEN;

	if (!authToken) throw new Error('No Pexels token was provided!');

	const searchParams = new URLSearchParams({
		query,
		page: String(page),
		per_page: String(perPage),
	});

	const response = await fetch(
		`https://api.pexels.com/v1/search?${searchParams}`,
		{
			method: 'GET',
			headers: { Authorization: authToken },
		},
	);

	return response.json() as Promise<Response>; // casted to typify the response
}
