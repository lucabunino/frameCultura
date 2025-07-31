<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
</script>

{#if data.exploreSelection}
	<section id="exploreSelection">
		Selezione di produzioni in evidenza (slider):
		{#each data.exploreSelection as production, i}
			<div>{production.title}</div>
		{/each}
	</section>
{/if}

<section id="explore">
{#each data.explore as production, i}
	<a class="production" href="/esplora/{production.slug.current}">
		<img src={urlFor(production.cover)} alt="">
		<h2 class="jost-24 uppercase bold">{production.title}</h2>
		{#if production.subtitle}<h3 class="bold">{production.subtitle}</h3>{/if}
		{#if production.authors?.length < 4}
			<p class="jost-18">di {#each production.authors as author, j}{author.name} {author.surname}{@html production.authors.length > j+1 ? ', ' : ''}{/each}</p>
		{:else if production.authors?.length >= 4}
			<p class="jost-18">di Autori vari</p>
		{/if}
	</a>
{/each}
</section>

<style>
/* Highlights */
#exploreSelection {
	background-color: var(--red);
	aspect-ratio: 21/9;
}

/* Explore */
#explore {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: var(--gutter);
	padding: var(--margin);
}
#explore img {
	border-radius: 1rem;
}
</style>