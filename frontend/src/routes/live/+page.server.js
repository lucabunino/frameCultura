import { getLiveSelection, getLive } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const liveSelection = await getLiveSelection();
	const live = await getLive();
	if (liveSelection && live) {
		return {
			liveSelection: liveSelection.liveSelection,
			live,
		};
	}
	throw error(404, 'Not found');
}