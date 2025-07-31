<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
let previousInitial = '';
</script>

<section id="authors">
{#each data.authors as author, i}
	{#if author.surname && author.surname[0].toUpperCase() !== previousInitial}
		{@html (() => {
			previousInitial = author.surname[0];
		})()}
		<h1 id={previousInitial.toUpperCase()} class="anchor jost-210 uppercase">{previousInitial}</h1>
	{/if}
	<a class="author" href={`/autori/${author.slug.current}`}>
		{#if author.portrait}
			<img class="portrait" src={urlFor(author.portrait)} alt="">
			{:else}
			<img class="portrait" src={urlFor(data.info.authorsPlaceholder)} alt="">
		{/if}
		<h2 class="jost-30">{author.name} {author.surname}</h2>
		{#if author.occupation}<h3 class="jost-18">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if}
	</a>
{/each}
</section>

<style>
/* Authors */
#authors {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding: var(--margin);
}
.anchor {
	text-align: center;
	align-content: center;
	justify-self: center;
	aspect-ratio: 1;
	max-width: 200px;
}
.author {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.author h2 {
	margin-top: 1rem;
}
.author h3 {
	margin-top: .5rem;
}
.author .portrait {
	border-radius: 100%;
	max-width: 200px;
}
</style>