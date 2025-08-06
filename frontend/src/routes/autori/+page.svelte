<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();

function getInitial(surname) {
	if (!surname) return '';
	return surname.trim()[0].toUpperCase();
}

let previousInitialAnchor = '';
let seenHashAnchor = false;
let previousInitial = '';
let seenHash = false;
let activeLetter = $state('A')
let scrollY = $state(0)
let anchors = $state([])
let menuUp = $state(false)
let lastScrollY = 0;

function handleScroll(e) {
	// headerPosition
	if (scrollY > lastScrollY && scrollY > 50) {
		menuUp = true
	} else {
		menuUp = false
	}
	lastScrollY = scrollY
	
	// currentAnchor
	const current = anchors
		.filter(el => el.getBoundingClientRect().top - 100 <= 0)
		.sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];

	if (current && current.id !== activeLetter) {
		activeLetter = current.id;
	}
}
</script>

<svelte:window bind:scrollY onscroll={(e) => handleScroll(e)}></svelte:window>

<section id="anchors" class:up={menuUp}>
	{#each data.groupedAuthors as group, i}
			<a href="#{group.letter}" class="anchor jost-18 bold uppercase"
			class:active={activeLetter == group.letter}
			>{group.letter}</a>
	{/each}
</section>

<section id="authors">
	{#each data.groupedAuthors as group, i}
		<h1 class="letter jost-210 uppercase">{group.letter}</h1>
		<span id={group.letter} class="anchorTarget" bind:this={anchors[i]}></span>
		{#each group.authors as author, j}
			<a class="author" href={`/autori/${author.slug.current}`}>
				{#if author.portrait}
					<img class="portrait" src={urlFor(author.portrait)} alt="">
					{:else}
					<img class="portrait" src={urlFor(data.info.authorsPlaceholder)} alt="">
				{/if}
				{#if author.name || author.surname}
					<h2 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h2>
				{:else if author.alias}
					<h2 class="jost-27">{author.alias}</h2>
				{/if}
				{#if author.occupation}<h3 class="jost-18">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if}
			</a>
		{/each}
	{/each}
</section>

<style>
/* Anchors */
#anchors {
	display: flex;
	gap: 1rem;
	padding: 8rem var(--margin);
	justify-content: center;
	position: sticky;
	top: var(--margin);
	width: 100%;
	border-radius: 1rem;
	justify-self: center;
	transition: var(--transition);
	position: relative;
}
#anchors.up {
	transform: translateY(calc((var(--margin)*2 + 4rem)*-1));
}
.anchor {
	width: 2em;
	height: 2em;
	background-color: var(--gray);
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: scroll;
}
.anchor:hover, .anchor.active:hover {
	color: var(--white) !important;
	background-color: var(--black);
}
.anchor.active {
	background-color: var(--pink);
}
.anchorTarget {
	height: 10px;
	width: 10px;
	margin-top: -100px;
	position: absolute;
	border: solid red 1px;
}


/* Authors */
#authors {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding: var(--margin);
}
.letter {
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
	line-height: 1.05;
}
.author h3 {
	margin-top: .5rem;
}
.author .portrait {
	max-width: 200px;
}
@media only screen and (max-width: 1280px) {
	#authors {
		grid-template-columns: repeat(5, 1fr);
	}
}
@media only screen and (max-width: 1080px) {
	#authors {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media only screen and (max-width: 800px) {
	#authors {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>