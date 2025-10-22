import { NotFoundError } from './errors';
import type { Photo } from './types';

export async function getPhoto(id: string | number): Promise<Photo> {
	const authToken = import.meta.env.VITE_PEXELS_API_TOKEN;

	if (!authToken) throw new Error('No Pexels token was provided!');

	const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
		method: 'GET',
		headers: { Authorization: authToken },
	}).then((response) => response.json());

	if ('status' in response && response.status === 404) {
		throw new NotFoundError();
	}

	return response as Photo; // casted to typify the response
}
