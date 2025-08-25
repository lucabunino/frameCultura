<script>
import { urlFor } from "$lib/utils/image";
import { page } from "$app/state";
import { goto, afterNavigate } from '$app/navigation';
import { getHeader } from '$lib/stores/header.svelte';
import { register } from 'swiper/element/bundle';register();
import sliderInjectedStyle from '$lib/utils/sliderInjectedStyle.js';
import { formatAuthorName } from "$lib/utils/author.js";

let header = getHeader()
let { data } = $props();
let search = $derived(page.url.searchParams.get('search') ? page.url.searchParams.get('search') : '')
let formats = $derived(page.url.searchParams.getAll('format') ? page.url.searchParams.getAll('format') : '')
let topic = $derived(page.url.searchParams.get('topic') ? page.url.searchParams.get('topic') : '')
let mouse = $state({y: undefined, x: undefined});
let swiperEl = $state(undefined);
let highlightTag = $state(undefined);
let openFilters = $state(false);
let openSearch = $state(false);
const swiperParams = {
	injectStyles: sliderInjectedStyle
};

// Lifecycle
$effect(() => {
	if (swiperEl) {
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();	
	}
})

// Functions
function toggleFormats(formatSlugs) {
	const url = new URL(window.location.href);
	url.searchParams.delete('format');
	if (formatSlugs) {
		formatSlugs.forEach(f => url.searchParams.append('format', f));
	}
	goto(`?${url.searchParams.toString()}#explore`, { preload: true, replaceState: false, noScroll: true })
}
function toggleTopic(topicSlug) {
	const url = new URL(window.location.href);
	url.searchParams.delete('topic');
	if (topicSlug) {
		url.searchParams.append('topic', topicSlug)
	}
	goto(`?${url.searchParams.toString()}#explore`, { preload: true, replaceState: false, noScroll: true })	
}
function toggleSearch(e, searchString) {
	e.preventDefault()
	const url = new URL(window.location.href);
	url.searchParams.delete('format');
	if (formats.length) {
		formats.forEach(f => url.searchParams.append('format', f));
	}
	url.searchParams.delete('topic');
	if (topic) url.searchParams.append('topic', topic);
	if (search) {
		url.searchParams.set('search', searchString);
	} else {
		url.searchParams.delete('search');
	}
	goto(`?${url.searchParams.toString()}#explore`, { preload: true, replaceState: false, noScroll: true })
}
function onSwiperClick(e) {
	if (e.target.tagName !== 'A') {
		if (e.clientX > innerWidth/2) {
			swiperEl.swiper.slideNext()
		} else {
			swiperEl.swiper.slidePrev()
		}
	}
}
function onSwiperHover(e) {
	if (e.target.tagName !== 'A' && swiperEl?.swiper?.slides.length > 1) {
		if (e.clientX > innerWidth/2) {
			highlightTag = 'Next'
		} else {
			highlightTag = 'Prev'
		}
	}
}
function onSwiperMouseLeave(e) {
	highlightTag = undefined
}
function handleMouseMove(e) {
	mouse.y = e.y
	mouse.x = e.x
}
</script>

<svelte:window onmousemove={(e) => {handleMouseMove(e)}}></svelte:window>

{#if data.exploreSelection}
	<section id="exploreSelection" class="cover _21-9" class:scrollable={swiperEl?.swiper?.slides.length > 1}>
		<swiper-container
		init={false}
		bind:this={swiperEl}
		pagination={{
			clickable: true
		}}
		slides-per-view={1}
		loop={true}
		autoplay={{delay: 6000, disableOnInteraction: true}}
		onmousemove={(e) => {onSwiperHover(e)}}
		onmouseleave={(e) => {onSwiperMouseLeave(e)}}
		>
			{#each data.exploreSelection as production, i}
				<swiper-slide class="production"
				onclick={(e) => {onSwiperClick(e)}}
				>
					<img class="cover"
					src={urlFor(production.highlightCover ? production.highlightCover : data.info.placeholder).width(2560)}
					alt="Copertina di {production.title}"
					>
					<div class="info">
						{#if production.topics}
							<div class="topics jost-15 bold uppercase">
								{#each production.topics as topic, j}
									<a href="/cerca?search={topic.title}">{topic.title}</a>
								{/each}
							</div>
						{/if}
						<h2 class="jost-45 mobile-jost-27 uppercase bold">{production.title}</h2>
						{#if production.subtitle}<h3 class="jost-18 bold">{production.subtitle}</h3>{/if}
						{#if production.authors?.length < 4}
							<p class="jost-18">di {#each production.authors as author, j}{formatAuthorName(author)}{@html production.authors.length > j+1 ? ', ' : ''}{/each}</p>
						{:else if production.authors?.length >= 4}
							<p class="jost-18">di Autori vari</p>
						{/if}
						{#if production.highlightAbstract}
							<p class="abstract jost-18">{production.highlightAbstract}</p>
						{/if}
					</div>
					<div class="btns jost-15 uppercase bold">
						{#if production._type == "episode" || production._type == "podcast"}
							{#if production.link}
								<a class=" btn" href={production.link} target="_blank" rel="noopener noreferrer">
									<svg width="19" height="15" viewbox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M18.53 7.5 0 15V0l18.53 7.5Z"/>
									</svg>
									Ascolta
								</a>
							{/if}
						{/if}
						<a class="btn"  href="/esplora/{production.slug.current}">Leggi di più</a>
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
		{#if highlightTag}
			<span class="highlightTag btn outline" class:left={highlightTag == 'Prev'} class:right={highlightTag == 'Next'} style="top: {mouse.y}px; left: {mouse.x}px;">{highlightTag}</span>
		{/if}
	</section>
{/if}

<section id="filters-and-search" class="jost-15 uppercase bold" class:up={header.up} class:marginTop={!data.exploreSelection} class:open={openFilters || openSearch}>
	<div id="filters" class:open={openFilters}>
		<div class="formats">
			<span class="mobile-jost-12">Mostra:</span>
			<button class="btn"
				class:active={formats.length == 0}
				onclick={() => toggleFormats(null)}
			>Tutto</button>
			<button class="btn"
				class:active={formats.includes('video','playlist')}
				onclick={() => toggleFormats(['video', 'playlist'])}
			>Video</button>
			<button class="btn"
				class:active={formats.includes('episode','podcast')}
				onclick={() => toggleFormats(['episode', 'podcast'])}
			>Podcast</button>
		</div>
		<div class="topics">
			<span class="mobile-jost-12">Argomento:</span>
			{#if data.topics}
				<select name="topic" id="topic" class="btn" bind:value={topic} onchange={(e) => {toggleTopic(topic)}}>
					<option value="">Tutti</option>
					{#each data.topics as t, i}
						<option value={t.slug.current}>{t.title}</option>
					{/each}
				</select>
			{/if}
		</div>
	</div>
	<button id="filters-switch" class="jost-12 bold uppercase" onclick={() => {openFilters = !openFilters; openSearch ? openSearch = !openSearch : ''}} class:open={openFilters} class:active={page.url.searchParams.getAll('format').length > 0 || page.url.searchParams.get('topic')}>
		Filtra
		<svg fill='black' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>
	</button>
	<form id="search-explore" onsubmit={(e) => toggleSearch(e, search)} class:open={openSearch}>
		<input type="text" name="search" id="search" class="jost-15 mobile-jost-12 bold" placeholder="CERCA TRA I CONTENUTI" bind:value={search}>
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
	<button id="search-switch" class="jost-12 bold uppercase" onclick={() => {openSearch = !openSearch; openFilters ? openFilters = !openFilters : ''}} class:open={openSearch} class:active={page.url.searchParams.get('search')}>
		Cerca
		<svg width="13" height="13" viewBox="0 0 13 13" fill="black" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#a)">
				<path d="M7.96 0c-2.8-.017-5.083 2.25-5.1 5.063a5.103 5.103 0 0 0 .835 2.813L0 11.57 1.417 13l3.687-3.688c.807.547 1.78.869 2.826.874 2.788 0 5.053-2.262 5.07-5.063C13.017 2.31 10.76.017 7.96 0Zm.001 8.113a3.073 3.073 0 0 1-3.094-3.05h-.004A3.089 3.089 0 0 1 7.93 1.955a3.072 3.072 0 0 1 3.068 3.05A3.073 3.073 0 0 1 7.96 8.113Z"/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h13v13H0z"/>
				</clipPath>
			</defs>
		</svg>
	</button>
</section>


{#if data.explore.length > 0}
<section id="explore" class:marginTop={!data.exploreSelection}>
	{#each data.explore as production, i}
		<a class="production" href="/esplora/{production.slug.current}">
			<img class="cover rounded"
			class:_1-1={production._type == "episode" || production._type == "podcast"}
			class:_16-9={production._type == "video" || production._type == "playlist"}
			src={urlFor(production.cover ? production.cover : data.info.placeholder).width(800)}
			alt="Copertina di {production.title}"
			>
			<h2 class="jost-18 uppercase bold">{production.title}</h2>
			{#if production.subtitle}<h3 class="jost-18 bold">{production.subtitle}</h3>{/if}
			{#if production.authors?.length < 4}
				<p class="jost-18">di {#each production.authors as author, j}{formatAuthorName(author)}{@html production.authors.length > j+1 ? ', ' : ''}{/each}</p>
			{:else if production.authors?.length >= 4}
				<p class="jost-18">di Autori vari</p>
			{/if}
		</a>
	{/each}
</section>
{:else}
<section id="noResults">
	<p class="jost-27" style="height: 3rem;">Nessun risultato per questi parametri di ricerca</p>
</section>
{/if}

<style>
/* Highlights */
#exploreSelection {
	min-height: 500px;
}
#exploreSelection swiper-container {
	height: 100%;
}
#exploreSelection .cover {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
#exploreSelection swiper-slide {
	position: relative;
}
#exploreSelection.scrollable swiper-slide {
	cursor: pointer;
}
#exploreSelection swiper-container::part(pagination) {
	left: unset;
	right: 0;
	bottom: 4rem;
    width: fit-content;
    padding: 0 var(--margin);
	height: calc(2.5rem + 1.25rem*1.3);
	align-content: center;
}
#exploreSelection swiper-container::part(bullet) {
	background: transparent;
	border: solid 1px var(--white);
	opacity: 1;
	margin: 0 2px;
}
#exploreSelection swiper-container::part(bullet-active) {
	background: var(--white);
	border: solid 1px var(--white);
	opacity: 1;
	margin: 0 2px;
}
#exploreSelection .production {
	color: var(--white);
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: var(--margin);
}
#exploreSelection .info {
	max-width: 700px;
}
#exploreSelection .topics {
	display: inline-flex;
	column-gap: var(--margin);
	row-gap: 1rem;
	margin-bottom: 1rem;
}
#exploreSelection .abstract {
	margin-top: 4rem;
	max-width: 600px;
}
#exploreSelection .btns {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 2rem var(--margin) 4rem;
	z-index: 3;
	display: flex;
	align-items: center;
	gap: .3rem;
}
#exploreSelection .btns .btn {
	display: inline-flex;
	gap: .6em;
	align-items: center;
}
#exploreSelection .btns .btn svg {
	height: 1.25rem;
	fill: var(--black);
}
#exploreSelection .btns .btn:hover svg {
	fill: var(--white);
}
.highlightTag {
	position: fixed;
	z-index: 8;
	transition: var(--transition);
	transition-property: transform;
	transition-duration: 800ms;
}
.highlightTag.right {
	transform: translateX(-100%);
}
@media screen and (max-width: 800px) {
	#exploreSelection .production {
		justify-content: flex-end;
		padding-bottom: 12rem;
	}
	.highlightTag {
		display: none;
	}

}

/* Filters */
#filters-and-search {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: calc(var(--margin)*2);
	padding: 1rem var(--margin);
	margin: 3rem 0;
	position: sticky;
	top: calc((var(--margin)*2 + 4rem));
	background-color: var(--white);
	transition: var(--transition);
}
#filters-and-search.marginTop {
	margin-top: calc(var(--margin)*2 + 4rem + var(--margin) + 1rem);
}
#filters-and-search.up {
	top: 0;
}
#filters {
	display: flex;
	flex-wrap: wrap;
	row-gap: 1rem;
	column-gap: calc(var(--margin)*2);
}
#filters .btn {
	border: solid 1px var(--black);
}
#filters div {
	display: flex;
	align-items: center;
	gap: .3rem;
}
#filters span {
	margin-right: .7rem;
	white-space: nowrap;
}
select {
	width: fit-content;
	appearance: none;
	background-color: var(--white);
	border: solid 1px var(--black);
	cursor: pointer;
	padding-right: 4em;
	background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
	background-repeat: no-repeat;
	background-position: right 1.5em top .6em;
	background-size: 2em auto;
}
select:focus {
	outline: none;
}
select:hover {
	background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
}
#filters-switch {
	display: none;
}
@media screen and (max-width: 800px) {
	#filters-and-search {
		position: fixed;
		top: unset !important;
		bottom: 5rem;
		max-width: stretch;
		width: 100%;
		display: block;
		margin: 0;
		padding: 0;
		z-index: 9;
		transition: none;
	}
	#filters-and-search.open {
		padding: 2rem var(--margin);
		border-top: solid 1px var(--black);
	}
	#filters {
		display: none;
		gap: 2rem;
	}
	#filters.open {
		display: flex;
	}
	#filters div {
		flex-wrap: wrap;
		width: 100%;
	}
	#filters span {
		flex-basis: 100%;
		margin-bottom: .5rem;
	}
	#filters-switch {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 50%;
		border-top: solid 1px var(--black);
		border-right: solid 1px var(--black);
		background-color: var(--white);
		text-align: center;
		height: 5rem;
	}
	#filters-switch svg {
		height: 2.4em;
		width: auto;
		margin-top: -.3em;
	}
	#filters-switch.active {
		padding-top: 5px;
		border-bottom: solid 5px var(--black);
	}
	#filters-switch.open {
		color: var(--white);
		background-color: var(--black);
	}
	#filters-switch.open svg {
		fill: var(--white);
	}
	select {
		width: 100%;
	}
}

/* Search */
#search-explore {
	display: flex;
	border-bottom: solid 1px var(--black);
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
@media screen and (max-width: 800px) {
	#search-explore {
		display: none;
	}
	#search-explore input {
		width: -webkit-fill-available;
	}
	#search-explore.open {
		display: flex;
		border: none;
	}
	#search-switch {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 50%;
		width: 50%;
		border-top: solid 1px var(--black);
		background-color: var(--white);
		text-align: center;
		height: 5rem;
		gap: .9em;
	}
	#search-switch svg {
		height: 1em;
		width: auto;
		margin-top: -.1em;
	}
	#search-switch.active {
		padding-top: 5px;
		border-bottom: solid 5px var(--black);
	}
	#search-switch.open {
		color: var(--white);
		background-color: var(--black);
	}
	#search-switch.open svg {
		fill: var(--white);
	}
}

/* Explore */
#explore {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding: 0 var(--margin);
}
#explore.marginTop {
	margin-top: calc(var(--margin)*2 + 4rem);
}
#noResults {
	padding: 4rem var(--margin);
	text-align:center;
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
	#explore {
		grid-template-columns: repeat(5, 1fr);
	}
}
@media only screen and (max-width: 1080px) {
	#explore {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media only screen and (max-width: 800px) {
	#explore {
		grid-template-columns: repeat(3, 1fr);
		padding-top: 3rem;
	}
}
@media only screen and (max-width: 500px) {
	#explore {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>