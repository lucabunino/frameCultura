import { getExplore, getAuthors, getTopics } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
export async function load({ url }) {
	const topics = await getTopics();
	const searchFormats = url.searchParams.getAll('format');
	const searchTopic = url.searchParams.get('topic');
	const searchString = url.searchParams.get('search');
	const authors = await getAuthors(searchString);
	const explore = await getExplore(searchFormats, searchTopic, searchString);
	if (topics && authors && explore) {
		return {
			searchFormats,
			searchTopic,
			searchString,
			topics,
			authors,
			explore
		};
	}
	throw error(404, 'Not found');
}