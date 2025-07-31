<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
const homepage = data.homepage
let activeAuthorIndex = $state(0)
let activeAuthor = $derived(homepage.authorsSelection[activeAuthorIndex])
</script>

<section id="hero">
	<h1 class="jost-74">{homepage.intro1}</h1>
	{#if homepage.intro2}
		<p>{homepage.intro2}</p>
	{/if}
	<a href="/about" class="btn">Leggi di più</a>
</section>

{#if homepage.highlights}
	<section id="highlights">
		{#each homepage.highlights as highlight, i}
			<div class="highlight-wrapper"
			style={
				(highlight.backgroundColor ? `background-color: ${highlight.backgroundColor.hex}; ` : '') +
				(highlight.backgroundImage ? `background-image: url(${urlFor(highlight.backgroundImage)});` : '')
			}
			>
				{#if highlight.ctaReference || highlight.ctaLink}
					<a class="highlight"
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
						{#if highlight.ctaLabel}<button class="btn">{highlight.ctaLabel}</button>{/if}
					</a>
				{:else}
					<div class="highlight">
						{#if highlight.subtitle}<h3>{highlight.subtitle}</h3>{/if}
						{#if highlight.title}<h2>{highlight.title}</h2>{/if}
						{#if highlight.abstract}<p>{highlight.abstract}</p>{/if}
						{#if highlight.ctaLabel}<button class="btn">{highlight.ctaLabel}</button>{/if}
					</div>
				{/if}
			</div>
		{/each}
	</section>
{/if}

{#if homepage.liveSelection}
	<section id="live">
		<h4 class="jost-54 inline-title">Live</h4>{#if homepage.liveIntro}<span class="section-description-inline jost-18">{homepage.liveIntro}</span>{/if}
		<div class="events">
			{#each homepage.liveSelection as event, i}
				<a class="event" href={`/live/${event.slug.current}`}>
					{#if event.topics || event.city}
						<div class="tags">
							{#each event.topics as topic, j}
								<button class="tag">{topic.title}</button>
							{/each}
							{#if event.city}<button class="tag">{event.city.title}</button>{/if}
						</div>
					{/if}
					<img src={urlFor(event.cover)} alt="">
					<time datetime={event.start}>{event.start}</time>
					<h2>{event.title}</h2>
					{#if event.subtitle}<h3>{event.subtitle}</h3>{/if}
				</a>
			{/each}
		</div>
		<a href="/live" class="btn">Vedi tutti</a>
	</section>
{/if}

{#if homepage.productionsSelection}
	<section id="productions">
		<h4 class="jost-54 inline-title">Produzioni</h4>{#if homepage.productionsIntro}
		<span class="section-description jost-18">{homepage.productionsIntro}</span>{/if}
		<div class="productions">
			<div class="productions-swiper">
				{#each homepage.productionsSelection as production, i}
					<a class="production jost-18" href={`/esplora/${production.slug.current}`}>
						<img src={urlFor(production.cover)} alt="">
						<h2 class="uppercase bold">{production.title}</h2>
						{#if production.subtitle}<h3 class="bold">{production.subtitle}</h3>{/if}
						<p>
							{#if production._type == 'video'}Guarda il video{/if}
							{#if production._type == 'playlist'}Guarda la playlist{/if}
							{#if production._type == 'podcast'}Ascolta il podcast{/if}
						</p>
					</a>
				{/each}
			</div>
		</div>
		<a href="/esplora" class="btn">Esplora tra i contenuti</a>
	</section>
{/if}

{#if homepage.authorsSelection}
	<section id="authors">
		<div class="active-author">
			<h4 class="jost-54 inline-title">Autori</h4>
			<div class="active-author-card">
				<img class="active-author-portrait" src={urlFor(activeAuthor.portrait)} alt="">
				{#if activeAuthor.highlight}<blockquote class="active-author-highlight">{activeAuthor.highlight}</blockquote>{/if}
			</div>
			{#if activeAuthor.highlightedContents}
				<div>
					<p class="jost-12 uppercase">Compare in</p>
					<div class="active-author-highlighted-contents">
						{#each activeAuthor.highlightedContents as production, i}
							<a class="active-author-highlighted-content jost-15" href={`/esplora/${production.slug.current}`}>
								<img src={urlFor(production.cover)} alt="">
								<h2 class="uppercase bold">{production.title}</h2>
								{#if production.subtitle}<h3>{production.subtitle}</h3>{/if}
							</a>
						{/each}
					</div>
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
			<a href="/autori" class="btn">Vedi tutti</a>
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
.section-description {
	display: block;
	max-width: 600px;
}

/* Hero */
#hero {
	padding: var(--margin);
}
#hero p {
	margin: 4rem 0 8rem;
	max-width: 600px;
}

/* Highlights */
#highlights {
	display: flex;
}
.highlight-wrapper {
	width: 100%;
	background-position: center;
	padding: var(--margin);
}
.highlight {
	height: 50vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.highlight .btn {
	width: fit-content;
}

/* Live */
#live {
	margin-top: 10rem;
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
	width: -webkit-fill-available;
	width: fill-available;
	position: absolute;
	padding: .2em;
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
}
.productions {
	margin: 6rem 0;
	overflow: scroll;
	width: 100%;
}
.productions-swiper {
	display: flex;
	gap: 4px;
	width: max-content;
}
.production img {
	border-radius: 1rem;
	height: 20vh;
	width: auto;
}
#productions .btn {
	width: fit-content;
}

/* Authors */
#authors {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}
.active-author {
	position: sticky;
	top: 0;
	height: fit-content;
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.active-author-card {
	position: absolute;
	top: 30%;
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
	aspect-ratio: 1;
	border-radius: 99em;
}
.active-author-highlight {
	margin-top: 2rem;
}
.active-author-highlighted-contents {
	display: flex;
	gap: var(--gutter);
}
.active-author-highlighted-content {
	display: flex;
}
.active-author-highlighted-content img {
	height: 50px;
}
.author.active h2 {
	color: var(--orange);
}
</style>