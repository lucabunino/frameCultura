import { getAuthors } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const authors = await getAuthors();
	if (authors) {
		return {
			authors,
		};
	}
	throw error(404, 'Not found');
}