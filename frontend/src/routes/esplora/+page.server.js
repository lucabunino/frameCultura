import { getExploreSelection, getExplore } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const exploreSelection = await getExploreSelection();
	const explore = await getExplore();
	if (exploreSelection && explore) {
		return {
			exploreSelection: exploreSelection.exploreSelection,
			explore,
		};
	}
	throw error(404, 'Not found');
}