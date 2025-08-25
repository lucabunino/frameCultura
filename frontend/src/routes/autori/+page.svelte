<script>
import { urlFor } from "$lib/utils/image";
import { page } from "$app/state";
import { getHeader } from '$lib/stores/header.svelte';
import { formatAuthorName } from "$lib/utils/author.js";
let header = getHeader()
let { data } = $props();
function getInitial(surname) {
	if (!surname) return '';
	return surname.trim()[0].toUpperCase();
}
let previousInitialAnchor = '';
let seenHashAnchor = false;
let previousInitial = '';
let seenHash = false;
let activeLetters = $state(['A'])
let scrollY = $state(0)
let anchors = $state([])
let search = $derived(page.url.searchParams.get('search') ? page.url.searchParams.get('search') : '')

function handleScroll() {
	// get all anchors that are <= scroll position
	const visibleAnchors = anchors.filter(
		el => el && el.getBoundingClientRect().top - 100 <= 0
	);

	if (visibleAnchors.length) {
		// find the bottom-most visible anchor's top position
		const maxTop = Math.max(...visibleAnchors.map(el => el.getBoundingClientRect().top));

		// keep all anchors that share that same top position (±1px tolerance)
		const currentLetters = visibleAnchors
			.filter(el => Math.abs(el.getBoundingClientRect().top - maxTop) <= 1)
			.map(el => el.id);

		// update state only if it changed
		if (JSON.stringify(currentLetters) !== JSON.stringify(activeLetters)) {
			activeLetters = currentLetters;
		}
	} else {
		activeLetters = [];
	}
}
</script>

<svelte:window bind:scrollY onscroll={(e) => handleScroll(e)}></svelte:window>

<section id="anchors" class="noScrollbar" class:up={header.up}>
	<div class="anchors">
		{#if data.groupedAuthors.length > 0}
			{#each data.groupedAuthors as group, i}
				<a href="#{group.letter}" class="anchor jost-18 bold uppercase"
				class:active={activeLetters.includes(group.letter)}
				>{group.letter}</a>
			{/each}
		{:else}
			<p class="jost-27" style="height: 3rem;">Nessun risultato per <span class="bold">{page.url.searchParams.get('search')}</span></p>
		{/if}
	</div>
</section>

<section id="search-author">
	<form>
		<input type="text" name="search" id="search" class="jost-15 bold" placeholder="CERCA TRA GLI AUTORI" bind:value={search}>
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
</section>

<section id="authors">
	{#each data.groupedAuthors as group, i}
		<div class="letter-wrapper">
			<span id={group.letter} class="anchorTarget" bind:this={anchors[i]}></span>
			<h1 class="letter jost-210 uppercase">{group.letter}</h1>
		</div>
		{#each group.authors as author, j}
			<a class="author" href={`/autori/${author.slug.current}`}>
				<div class="portrait-wrapper">
					<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
					<div class="more jost-15 bold"><span>+</span></div>
				</div>
				<h2 class="jost-27 mobile-jost-16">{formatAuthorName(author)}</h2>
				{#if author.occupation}<h3 class="jost-18 mobile-jost-12">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if}
			</a>
		{/each}
	{/each}
</section>

<style>
/* Anchors */
#anchors {
	margin-bottom: calc((var(--margin)*2 + 4rem));
	padding: var(--margin);
	position: sticky;
	top: calc((var(--margin)*2 + 4rem));
	width: 100%;
	transition: var(--transition);
	overflow: scroll;
	z-index: 1;
}
.anchors {
	display: flex;
	gap: 1rem;
	justify-content: center;
	width: fit-content;
	margin: auto;
}
#anchors.up {
	transform: translateY(calc((var(--margin)*2 + 4rem)*-1));
}
.anchor {
	width: 3rem;
	height: 3rem;
	background-color: var(--gray);
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: scroll;
}
.anchor.active {
	background-color: var(--pink);
}
@media only screen and (min-width: 801px) {
	.anchor:hover, .anchor.active:hover {
		color: var(--white) !important;
		background-color: var(--black);
	}
}

/* Search */
#search-author {
	display: flex;
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
@media only screen and (max-width: 500px) {
	#search-author {
		width: calc(100vw - var(--margin)*2);
		justify-content: space-between;
	}
	#search {
		width: calc(100vw - var(--margin)*2 - 3rem);
	}
}

/* Authors */
#authors {
	display: grid;
	grid-template-columns: repeat(6, calc((100% - var(--gutter)*5)/6));
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding: var(--margin);
	position: relative;
}
.anchorTarget {
	height: 0;
	width: 0;
	opacity: 0;
	position: absolute;
	top: calc((var(--margin)*4 + 9rem)*-1)
}
.letter {
	text-align: center;
	align-content: center;
	justify-self: center;
	aspect-ratio: 1;
	max-width: 200px;
}
.letter-wrapper {
	position: relative;
}
.author {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.author h2 {
	margin-top: 1rem;
	line-height: 1.05;
}
.author h3 {
	margin-top: .5rem;
}
.author .portrait-wrapper {
	max-width: 200px;
	position: relative;
}
.more {
	display: flex;
	padding: 1rem;
	background-color: var(--gray);
	border-radius: 100%;
	aspect-ratio: 1;
	width: 3rem;
	height: 3rem;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: absolute;
	right: 7%;
	top: 7%;
	opacity: 0;
}
.author:hover .more {
	opacity: 1;
}
.more span {
	padding-bottom: .2rem;
}

@media only screen and (max-width: 1280px) {
	#authors {
		grid-template-columns: repeat(5, calc((100% - var(--gutter)*4)/5));
	}
}
@media only screen and (max-width: 1080px) {
	#authors {
		grid-template-columns: repeat(4, calc((100% - var(--gutter)*3)/4));
	}
}
@media only screen and (max-width: 800px) {
	#authors {
		grid-template-columns: repeat(3, calc((100% - var(--gutter)*2)/3));
	}
	.letter {
		margin-top: 6vw;
	}
}
@media only screen and (max-width: 300px) {
	#authors {
		grid-template-columns: repeat(2, calc((100% - var(--gutter)*1)/2));
	}
	.letter {
		font-size: 44vw;
	}
}
</style>