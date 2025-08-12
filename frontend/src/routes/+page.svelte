<script>
import { urlFor } from "$lib/utils/image";
import { formatDate } from "$lib/utils/date";
import ProductionsWidget from "$lib/components/ProductionsWidget.svelte";
import { register } from 'swiper/element/bundle';register();

let { data } = $props();
const homepage = data.homepage
let domLoaded = $state(false)
let activeAuthorIndex = $state(0)
let activeAuthor = $derived(homepage.authorsSelection[activeAuthorIndex])
// let swiperProductionsIndex = $state(0)

$effect(() => {
	domLoaded = true
})
</script>

<section id="hero">
	<h1 class="jost-74">{homepage.intro1}</h1>
	{#if homepage.intro2}
		<p>{homepage.intro2}</p>
	{/if}
	<a href="/about" class="btn bg-gray">Leggi di più</a>
</section>

{#if homepage.highlights}
	<section id="highlights">
		{#each homepage.highlights as highlight, i}
			<!-- <div class="highlight-wrapper"
			style={
				(highlight.backgroundColor ? `background-color: ${highlight.backgroundColor.hex}; ` : '') +
				(highlight.backgroundImage ? `background-image: url(${urlFor(highlight.backgroundImage)});` : '')
			}
			> -->
				{#if highlight.ctaReference || highlight.ctaLink}
					<a class="highlight"
					style={
						(highlight.backgroundColor ? `background-color: ${highlight.backgroundColor.hex}; ` : '') +
						(highlight.backgroundImage ? `background-image: url(${urlFor(highlight.backgroundImage)});` : '')
					}
					href={highlight.ctaReference ? `/${{
						video: 'esplora',
						playlist: 'esplora',
						podcast: 'esplora',
						event: 'live',
						eventSerie: 'live',
					}[highlight.ctaReference._type]}/${highlight.ctaReference.slug.current}` : `${highlight.ctaLink}`}
					target={highlight.ctaLink ? `_blank` : ``}
					rel={highlight.ctaLink ? `noopener noreferrer` : ``}
					>
						<div>
							{#if highlight.subtitle}<h3>{highlight.subtitle}</h3>{/if}
							{#if highlight.title}<h2 class="jost-54">{highlight.title}</h2>{/if}
							{#if highlight.abstract}<p class="jost-18">{highlight.abstract}</p>{/if}
						</div>
						{#if highlight.ctaLabel}<button class="btn bg-white">{highlight.ctaLabel}</button>{/if}
					</a>
				{:else}
					<div class="highlight">
						{#if highlight.subtitle}<h3>{highlight.subtitle}</h3>{/if}
						{#if highlight.title}<h2>{highlight.title}</h2>{/if}
						{#if highlight.abstract}<p>{highlight.abstract}</p>{/if}
						{#if highlight.ctaLabel}<button class="btn bg-white">{highlight.ctaLabel}</button>{/if}
					</div>
				{/if}
			<!-- </div> -->
		{/each}
	</section>
{/if}

{#if homepage.liveSelection}
	<section id="live">
		<h4 class="jost-54 inline-title">Live</h4>{#if homepage.liveIntro}<span class="section-description-inline jost-18">{homepage.liveIntro}</span>{/if}
		<swiper-container class="events"
		class:invisible={!domLoaded}
		loop={false}
		space-between={4}
		grabCursor={true}
		slides-per-view={3.5}
		free-mode={false}
		mousewheel-force-to-axis={true}
		slides-offset-before={21}
		slides-offset-after={21}
		>
			{#each homepage.liveSelection as event, i}
				<swiper-slide>
					<a class="event" href={`/live/${event.slug.current}`}>
						{#if event.topics || event.city}
							<div class="tags">
								{#each event.topics as topic, j}
									<button class="tag">{topic.title}</button>
								{/each}
								{#if event.city}<button class="tag">{event.city.title}</button>{/if}
							</div>
						{/if}
						<img class="cover _5-7" src={urlFor(event.cover)} alt="">
						<time class="jost-18" datetime={event.start}>{formatDate(event.start, event.end)}</time>
						<h2 class="jost-24 uppercase bold">{event.title}</h2>
						{#if event.subtitle}<h3 class="jost-24 bold">{event.subtitle}</h3>{/if}
					</a>
				</swiper-slide>
			{/each}
		</swiper-container>
		<a href="/live" class="btn bg-gray">Vedi tutti</a>
	</section>
{/if}

{#if homepage.productionsSelection}
	<section id="productions">
		<h4 class="jost-54 inline-title">Produzioni</h4>{#if homepage.productionsIntro}
		<span class="section-description jost-18">{homepage.productionsIntro}</span>{/if}
		<ProductionsWidget productions={homepage.productionsSelection} />
		<a href="/esplora" class="btn bg-gray">Esplora tra i contenuti</a>
	</section>
{/if}

{#if homepage.authorsSelection}
	<section id="authors">
		<div class="active-author">
			<h4 class="jost-54 inline-title">Autori</h4>
			<div class="active-author-card">
				<img class="active-author-portrait portrait _1-1" src={urlFor(activeAuthor.portrait)} alt="">
				{#if activeAuthor.highlight}<blockquote class="active-author-highlight">{activeAuthor.highlight}</blockquote>{/if}
			</div>
			{#if activeAuthor.highlightedContents}
				<div class="active-author-highlighted-contents-wrapper">
					<p class="jost-12 uppercase bold active-author-highlighted-title">Compare in</p>
					<swiper-container class="active-author-highlighted-contents"
					class:invisible={!domLoaded}
					loop={false}
					space-between={10}
					grabCursor={true}
					slides-per-view={2.5}
					free-mode={false}
					mousewheel-force-to-axis={true}
					pagination-clickable={true}
					>
						{#each activeAuthor.highlightedContents as production, i}
							{#if i < 4}
							<swiper-slide>
								<a class="active-author-highlighted-content jost-15" href={`/esplora/${production.slug.current}`}>
									<img class="cover rounded" src={urlFor(production.cover)} alt=""
									class:_1-1={production._type == "episode" || production._type == "podcast"}
									class:_16-9={production._type == "video" || production._type == "playlist"}
									>
									<div>
										<h2 class="uppercase bold">{production.title}</h2>
										{#if production.subtitle}<h3>{production.subtitle}</h3>{/if}
										<p>
											{#if production._type == "video"}Guarda il video{/if}
											{#if production._type == "playlist"}Guarda la playlist{/if}
											{#if production._type == "episode"}Ascolta l'episodio{/if}
											{#if production._type == "podcast"}Ascolta il podcast{/if}
										</p>
									</div>
								</a>
							</swiper-slide>
							{/if}
						{/each}
					</swiper-container>
				</div>
			{/if}
		</div>
		<div class="authors">
			{#if homepage.authorsIntro}<span class="section-description jost-18">{homepage.authorsIntro}</span>{/if}
			{#each homepage.authorsSelection as author, i}
				<a class="author jost-54" href={`/autori/${author.slug.current}`}
				onmouseover={() => {activeAuthorIndex = i}}
				class:active={activeAuthorIndex == i}
				>
					<h2>{author.name} {author.surname}</h2>
				</a>
			{/each}
			<a href="/autori" class="btn bg-gray">Vedi tutti</a>
		</div>
	</section>
{/if}

<style>
/* General */
section + section {
	/* margin-top: 20rem; */
}
.inline-title,
.section-description-inline {
	display: inline-block;
	white-space: pre;
}
.section-description-inline {
	margin-left: var(--margin);
}
.section-description {
	display: block;
	max-width: 600px;
}

/* Hero */
#hero {
	padding: 1rem var(--margin) 4rem;
}
#hero p {
	margin: 3rem 0 8rem;
	max-width: 600px;
}

/* Highlights */
#highlights {
	display: flex;
}
/* .highlight-wrapper {
	width: 100%;
	background-position: center;
	padding: 2rem var(--margin) 4rem;
} */
.highlight {
	width: 100%;
	background-position: center;
	padding: 2rem var(--margin) 4rem;
	min-height: 600px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.highlight h3 {
	margin-bottom: 1rem;
	max-width: 600px;
}
.highlight h2 {
	margin-bottom: 2rem;
	max-width: 600px;
}
.highlight p {
	max-width: 450px;
}
.highlight .btn {
	width: fit-content;
}

/* Live */
#live {
	margin-top: 10rem;
	padding: 2rem var(--margin);
}
.events {
	margin: 2rem calc(var(--margin)*-1) 4rem;
	display: flex;
}
.event {
	position: relative;
}
.event .cover {
	margin-bottom: 1rem;
}
.event:hover {
	
}
.event time {
	margin-bottom: 1rem;
	line-height: 1.1;
	display: block;
}
.tags {
	display: flex;
	flex-wrap: wrap;
	width: -webkit-fill-available;
	width: fill-available;
	position: absolute;
	padding: .4em;
	gap: .2em;
}

/* Productions */
#productions {
	margin: 24rem 0;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--margin);
	width: 100%;
}
/* swiper-container {
	margin: 8rem 0;
	width: 100%;
}
swiper-container::part(container) {
	overflow: visible;
}

.production .cover {
	transition: var(--transition);
	height: 15vh;
	width: auto;
}
.production.l .cover {
	height: 25vh;
}
.production.m .cover {
	height: 20vh;
}
.production:hover .production-text {
	opacity: 1;
}
.production-text {
	margin-top: .8rem;
	position: absolute;
	top: 100%;
	left: 50%;
    width: max-content;
    transform: translateX(-50%);
	opacity: 0;
	transition: var(--transition);
}
#productions .btn {
	width: fit-content;
} */


/* Authors */
#authors {
	display: grid;
	grid-template-columns: repeat(2, 50%);
}
.active-author {
	position: sticky;
	top: 0;
	height: fit-content;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2rem var(--margin) 2rem;
}
.active-author-card {
	position: absolute;
	top: 25%;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 600px;
	text-align: center;
	width: 80%;
}
.active-author-portrait {
	width: 20vh;
	min-width: 200px;
}
.active-author-highlight {
	margin-top: 2rem;
}
.active-author-highlighted-title {
	margin-bottom: 1rem;
}
/* .active-author-highlighted-contents::part(button-next), .active-author-highlighted-contents::part(button-prev) {
	content: '';
	background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
	position: absolute;
	top: 0;
	height: 100%;
	width: calc(100%/2.5*.5);
	z-index: 99;
	margin-top: 0;
}
.active-author-highlighted-contents::part(button-next) {
	right: 0;
}
.active-author-highlighted-contents::part(button-prev) {
	left: 0;
} */
.active-author-highlighted-contents {
	margin-top: -2rem;
}
.active-author-highlighted-contents swiper-slide {
	margin-top: 2rem;
}
.active-author-highlighted-contents::part(pagination) {
	width: fit-content;
	left: unset;
	bottom: unset;
	right: 0;
	top: 0;
	line-height: 0;
}
.active-author-highlighted-contents::part(bullet) {
	margin: 0 3px;
	background-color: var(--gray);
	opacity: 1;
}
.active-author-highlighted-contents::part(bullet-active) {
	background-color: var(--orange);
}
.active-author-highlighted-content {
	display: flex;
	gap: var(--gutter);
	line-height: 1.1;
	align-items: center;
}
.active-author-highlighted-content img {
	height: 50px;
	width: auto;
}
#authors .section-description {
	margin-bottom: 2rem;
}
.authors {
	padding: 2rem var(--margin);
}
.author.active h2 {
	color: var(--orange);
}
.authors .btn {
	margin-top: 4rem;
}
</style>