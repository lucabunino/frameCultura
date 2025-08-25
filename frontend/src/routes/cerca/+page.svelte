<script>
import { urlFor } from '$lib/utils/image';
import { page, navigating } from '$app/state';
import { formatAuthorName } from '$lib/utils/author.js';
let { data } = $props();

let innerWidth = $state(undefined)
let showAllAuthors = $state(false)
let showAllExplore = $state(false)
let showAllLive = $state(false)
let search = $derived(page.url.searchParams.get('search') ?? '')

// Lifecycle
$effect(() => {
	void data.searchString;
	showAllAuthors = false
	showAllExplore = false
	showAllLive = false
})
</script>

<svelte:window bind:innerWidth></svelte:window>

<div class="wrapper">
	<section id="intro">
		<h1 class="jost-27">
			{#if data.authors.length > 0 || data.explore.length > 0}
				Risultati per
			{:else}
				Nessun risultato per
			{/if}
			<form id="search-bar">
				<input type="text" name="search" id="search" class="jost-27 bold" bind:value={search}>
				<button type="submit" id="search-submit">
					<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#a)">
							<path d="M7.96 0c-2.8-.017-5.083 2.25-5.1 5.063a5.103 5.103 0 0 0 .835 2.813L0 11.57 1.417 13l3.687-3.688c.807.547 1.78.869 2.826.874 2.788 0 5.053-2.262 5.07-5.063C13.017 2.31 10.76.017 7.96 0Zm.001 8.113a3.073 3.073 0 0 1-3.094-3.05h-.004A3.089 3.089 0 0 1 7.93 1.955a3.072 3.072 0 0 1 3.068 3.05A3.073 3.073 0 0 1 7.96 8.113Z" fill="#000"/>
						</g>
						<defs>
							<clipPath id="a">
								<path fill="#fff" d="M0 0h13v13H0z"/>
							</clipPath>
						</defs>
					</svg>
				</button>
			</form>
		</h1>
	</section>
	<section id="authors">
		<h4 class="jost-12 uppercase bold">Autori ({data.authors.length})</h4>
		{#if data.authors.length > 0}
			<div class="authors noScrollbar">
				{#each showAllAuthors || innerWidth > 800 ? data.authors : data.authors.slice(0, 10) as author, i}
					<a class="author hover-gray" href={`/autori/${author.slug.current}`}>
						<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
						<h2 class="jost-18">{formatAuthorName(author)}</h2>
						<!-- {#if author.occupation}<h3 class="jost-15">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if} -->
					</a>
				{/each}
			</div>
			{#if innerWidth <= 800 && data.authors.length > 10}
				{#if !showAllAuthors}
					<button class="btn bg-gray mobile-w-100" onclick={(e) => {showAllAuthors = true}}>Mostra tutto</button>
				{:else}
					<button class="btn bg-gray mobile-w-100" onclick={(e) => {showAllAuthors = false}}>Mostra meno</button>
				{/if}
			{/if}
		{:else}
			<p class="authors noResults jost-18">Nessun autore</p>
		{/if}
	</section>
	<div class="explore-live-wrapper">
		<section id="explore">
			<h4 class="jost-12 uppercase bold">Produzioni ({data.explore.length})</h4>
			{#if data.explore.length > 0}
				<div class="explore">
					{#each showAllExplore ? data.explore : data.explore.slice(0, 10) as production, i}
						<a class="production" href="/esplora/{production.slug.current}">
							<img class="cover rounded"
							class:_1-1={production._type == "episode" || production._type == "podcast"}
							class:_16-9={production._type == "video" || production._type == "playlist"}
							src={urlFor(production.cover ? production.cover : data.info.placeholder)}
							alt=""
							>
							<h2 class="jost-18 uppercase bold">{production.title}</h2>
							{#if production.subtitle}<h3 class="jost-18 bold">{production.subtitle}</h3>{/if}
							{#if production.authors?.length < 4}
								<p class="jost-18">di {#each production.authors as author, j}{author.name} {author.surname}{@html production.authors.length > j+1 ? ', ' : ''}{/each}</p>
							{:else if production.authors?.length >= 4}
								<p class="jost-18">di Autori vari</p>
							{/if}
						</a>
					{/each}
				</div>
				{#if data.explore.length > 10}
					{#if !showAllExplore}
						<button class="btn bg-gray mobile-w-100" onclick={(e) => {showAllExplore = true}}>Mostra tutto</button>
					{:else}
						<button class="btn bg-gray mobile-w-100" onclick={(e) => {showAllExplore = false}}>Mostra meno</button>
					{/if}
				{/if}
			{:else}
				<p class="explore noResults jost-18">Nessuna produzione</p>
			{/if}
		</section>
	</div>
</div>

<style>
.wrapper {
	padding: var(--margin);
	display: grid;
	grid-template-columns:repeat(10, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
}
.explore-live-wrapper {
	grid-column: 3 / span 8;
	display: flex;
	flex-direction: column;
	gap: 12rem;
}
section h4 {
	padding-bottom: 1rem;
	border-bottom: solid 1px var(--black);
}
@media only screen and (max-width: 1280px) {
	.explore-live-wrapper {
		grid-column: 4 / span 7;
	}
}
@media only screen and (max-width: 1080px) {
	.explore-live-wrapper {
		grid-column: 5 / span 6;
	}
}
@media only screen and (max-width: 800px) {
	section {
		margin-bottom: 12rem;
	}
	.explore-live-wrapper {
		grid-column: 1 / span 10;
	}
}

/* Intro */
#intro {
	text-align: center;
	margin-bottom: 4rem;
	grid-column: 1 / span 10;
}

/* Search */
#search-bar {
	display: inline;
	justify-self: center;
	border-bottom: solid 1px var(--black);
	padding-bottom: .3rem;
	margin-bottom: calc((var(--margin)*2 + 4rem));
}
input::placeholder {
	color: var(--black);
}
#search {
	width: 250px;
	border: none;
}
#search-submit svg {
	fill: var(--black);
}

/* Authors */
#authors {
	grid-column: 1 / span 2;
	position: sticky;
	top: calc((var(--margin)*2 + 5.7rem));
	height: calc(100vh - ((var(--margin)*2 + 5.7rem)));
}
.authors {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	row-gap: 1rem;
	height: 100%;
	overflow-y: auto;
	padding: 2rem 0 8rem;
}
.author {
	display: flex;
	align-items: center;
	gap: var(--gutter);
}
.author h2 {
	line-height: 1.05;
}
.author h3 {
	margin-top: .5rem;
}
.author .portrait {
	width: 3rem;
}
@media only screen and (max-width: 1280px) {
	#authors {
		grid-column: 1 / span 3;
	}
}
@media only screen and (max-width: 1080px) {
	#authors {
		grid-column: 1 / span 4;
	}
}
@media only screen and (max-width: 800px) {
	#authors {
		grid-column: 1 / span 10;
		position: relative;
		height: auto;
		top: unset;
	}
	.authors {
		height: auto;
		padding: 2rem 0 4rem;
	}
}

/* Explore */
.explore {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding-top: 2rem;
	margin-bottom: 8rem;
}
.production h2, .production h3 {
	line-height: 1.05;
}
.production p {
	margin-top: 1rem;
}
.production .cover {
	margin-bottom: 1rem;
}
@media only screen and (max-width: 1280px) {
	.explore {
		grid-template-columns: repeat(4, 1fr);
		margin-bottom: 4rem;
	}
}
@media only screen and (max-width: 1080px) {
	.explore {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media only screen and (max-width: 800px) {
	.explore {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* Live */
/* -- */

/* Overwrite */
.noResults {
	grid-template-columns: repeat(1, 1fr);
}
</style>