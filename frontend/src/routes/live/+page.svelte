<script>
import { urlFor } from "$lib/utils/image";
import { page } from "$app/state";
import { goto, afterNavigate } from '$app/navigation';
import { getHeader } from '$lib/stores/header.svelte';
import { register } from 'swiper/element/bundle';register();
import sliderInjectedStyle from '$lib/utils/sliderInjectedStyle.js';
import { formatAuthorName } from "$lib/utils/author.js";
    import Event from "$lib/components/Event.svelte";
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

{#if data.liveSelection}
	<section id="liveSelection" class="cover _16-9">
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
			{#each data.liveSelection as event, i}
				<swiper-slide class="event"
				onclick={(e) => {onSwiperClick(e)}}
				>
					<img class="cover"
					src={urlFor(event.highlightCover ? event.highlightCover : data.info.placeholder).width(2560)}
					alt="Copertina di {event.title}"
					>
					<div class="info">
						{#if event.topics}
							<div class="topics jost-15 bold uppercase">
								{#each event.topics as topic, j}
									<a href="/cerca?search={topic.title}">{topic.title}</a>
								{/each}
							</div>
						{/if}
						<h2 class="jost-45 mobile-jost-27 uppercase bold">{event.title}</h2>
						{#if event.subtitle}<h3 class="jost-18 bold">{event.subtitle}</h3>{/if}
						<!-- {#if production.authors?.length < 4}
							<p class="jost-18">di {#each production.authors as author, j}{formatAuthorName(author)}{@html production.authors.length > j+1 ? ', ' : ''}{/each}</p>
						{:else if production.authors?.length >= 4}
							<p class="jost-18">di Autori vari</p>
						{/if} -->
						{#if event.highlightAbstract}
							<p class="abstract jost-18">{event.highlightAbstract}</p>
						{/if}
					</div>
					<div class="btns jost-15 uppercase bold">
						<a class="btn"  href="/live/{event.slug.current}">Leggi di più</a>
					</div>
				</swiper-slide>
			{/each}
		</swiper-container>
		{#if highlightTag}
			<span class="highlightTag btn outline" class:left={highlightTag == 'Prev'} class:right={highlightTag == 'Next'} style="top: {mouse.y}px; left: {mouse.x}px;">{highlightTag}</span>
		{/if}
	</section>
{/if}

<section id="live">
	{#each data.live as event, i}
		<Event event={event}/>
	{/each}
</section>

<style>
/* Highlights */
#liveSelection {
	height: 100vh;
}
#liveSelection swiper-container {
	height: 100%;
}
#liveSelection .cover {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
#liveSelection swiper-slide {
	position: relative;
}
#liveSelection.scrollable swiper-slide {
	cursor: pointer;
}
#liveSelection swiper-container::part(pagination) {
	left: unset;
	right: 0;
	bottom: 4rem;
    width: fit-content;
    padding: 0 var(--margin);
	height: calc(2.5rem + 1.25rem*1.3);
	align-content: center;
}
#liveSelection swiper-container::part(bullet) {
	background: transparent;
	border: solid 1px var(--white);
	opacity: 1;
	margin: 0 2px;
}
#liveSelection swiper-container::part(bullet-active) {
	background: var(--white);
	border: solid 1px var(--white);
	opacity: 1;
	margin: 0 2px;
}
#liveSelection .production {
	color: var(--white);
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: var(--margin);
}
#liveSelection .info {
	max-width: 700px;
}
#liveSelection .topics {
	display: inline-flex;
	column-gap: var(--margin);
	row-gap: 1rem;
	margin-bottom: 1rem;
}
#liveSelection .abstract {
	margin-top: 4rem;
	max-width: 600px;
}
#liveSelection .btns {
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 2rem var(--margin) 4rem;
	z-index: 3;
	display: flex;
	align-items: center;
	gap: .3rem;
}
#liveSelection .btns .btn {
	display: inline-flex;
	gap: .6em;
	align-items: center;
}
#liveSelection .btns .btn svg {
	height: 1.25rem;
	fill: var(--black);
}
#liveSelection .btns .btn:hover svg {
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
	#liveSelection .production {
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

/* Live */
#live {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: var(--gutter);
	padding: var(--margin);
}
.event {
	position: relative;
}
.events {
	display: flex;
}
.tags {
	display: flex;
	flex-wrap: wrap;
	max-width: stretch;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	padding: .2em;
	gap: .2em;
}
</style>



<!-- <style>



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
</style> -->