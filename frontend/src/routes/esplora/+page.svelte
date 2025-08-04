<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
</script>

{#if data.exploreSelection}
	<section id="exploreSelection" class="cover _21-9">
		Selezione di produzioni in evidenza (slider):
		{#each data.exploreSelection as production, i}
			<div>{production.title}</div>
		{/each}
	</section>
{/if}

<section id="explore">
{#each data.explore as production, i}
	<a class="production" href="/esplora/{production.slug.current}">
		<img class="cover rounded"
		class:_1-1={production._type == "episode" || production._type == "podcast"}
		class:_16-9={production._type == "video" || production._type == "playlist"}
		src={urlFor(production.cover)} alt=""
		>
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
	/* background-color: var(--red); */
}

/* Explore */
#explore {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: var(--gutter);
	padding: var(--margin);
}
</style>