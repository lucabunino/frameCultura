<script>
import { PortableText } from '@portabletext/svelte'
import PlainTextStyle from '$lib/components/portableTextStyles/PlainTextStyle.svelte';
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data)
const production = data.production
let activeVideoIndex = $state(0)
let activeVideo = $derived(production.videos?.[activeVideoIndex])
</script>

<!-- <svelte:head>
	{#if data.seo.SEOTitle}<title>{data.seo.SEOTitle} — {data.project[0].title}</title>{/if}
	{#if data.project[0].SEODescription}<meta name="description" content={data.project[0].SEODescription}>{/if}
	{#if !data.project[0].singlePage}
		<meta name="robots" content="index,follow">
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	{#if data.seo.SEOTitle}<meta property="og:title" content={`${data.seo.SEOTitle} — ${data.project[0].title}`}>{/if}
	{#if data.project[0].SEODescription}<meta property="og:description" content={data.project[0].SEODescription}>{/if}
	{#if data.project[0].cover}<meta property="og:image" content={urlFor(data.project[0].cover).width(2000).url()}>{/if}
	{#if data.seo.SEOTitle}<meta property="og:site_name" content={`${data.seo.SEOTitle} — ${data.project[0].title}`}>{/if}
</svelte:head> -->

<section id="production" class={production._type}>
	{#if production._type == 'podcast'}
		<div class="podcast-description">
			<h1 class="jost-74 uppercase">{production.title}</h1>
			{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
			{#if production.authors?.length < 4}
				<div class="authors">
					<p class="authors-label jost-12 uppercase bold">Un podcast di</p>
					{#each production.authors as author, j}
						<a href="/autori/{author.slug.current}" class="author jost-24">
							{#if author.portrait}
								<img class="portrait" src={urlFor(author.portrait)} alt="">
							{:else}
								<img class="portrait" src={urlFor(data.info.authorsPlaceholder)} alt="">
							{/if}
							<h3>{author.name} {author.surname}</h3>
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p>di Autori vari</p>
			{/if}
			{#if production.cover}
				<a class="podcast-cover" href={production.link} target="_blank" rel="noopener noreferrer">
					<img src={urlFor(production.cover)} alt="">
					<button class="btn listen">Ascolta</button>
				</a>
			{/if}
			{#if production.body}
				<div class="podcast-body jost-21">
					<PortableText
					value={production.body}
					components={{
					block: {
						normal: PlainTextStyle,
						h3: PlainTextStyle,
					},
					listItem: PlainTextStyle,
					marks: {
						link: PlainTextStyle,
					},
					}}/>
				</div>
			{/if}
		</div>
		{#if production.episodes}
			<div class="podcast-episodes">
				<h4 class="jost-12 uppercase bold">Episodi</h4>
				{#each production.episodes as episode, i}
					<a class="podcast-episode"
					href={episode.link}
					target="_blank" rel="noopener noreferrer"
					>
						<h2 class="jost-24 uppercase bold">{production.episodes.length - i}. {episode.title}</h2>
						{#if episode.subtitle}<h2 class="jost-24 bold">{episode.subtitle}</h2>{/if}
						{#if episode.date}<time class="jost-15" datetime={episode.date}>{episode.date}</time>{/if}
						{#if episode.body}
							<div class="episode-body jost-15">
								<PortableText
								value={episode.body}
								components={{
								block: {
									normal: PlainTextStyle,
									h3: PlainTextStyle,
								},
								listItem: PlainTextStyle,
								marks: {
									link: PlainTextStyle,
								},
								}}/>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
		{:else if production._type == 'playlist'}
			<div class="playlist-description">
				<h1 class="jost-74 uppercase">{production.title}</h1>
				{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
				{#if production.authors?.length < 4}
					<div class="authors">
						<p class="authors-label jost-12 uppercase bold">Con</p>
						{#each production.authors as author, j}
							<a href="/autori/{author.slug.current}" class="author jost-24">
								{#if author.portrait}
									<img class="portrait" src={urlFor(author.portrait)} alt="">
								{:else}
									<img class="portrait" src={urlFor(data.info.authorsPlaceholder)} alt="">
								{/if}
								<h3>{author.name} {author.surname}</h3>
							</a>
						{/each}
					</div>
				{:else if production.authors?.length >= 4}
					<p>di Autori vari</p>
				{/if}
				{#if production.body}
					<div class="playlist-body jost-24">
						<PortableText
						value={production.body}
						components={{
						block: {
							normal: PlainTextStyle,
							h3: PlainTextStyle,
						},
						listItem: PlainTextStyle,
						marks: {
							link: PlainTextStyle,
						},
						}}/>
					</div>
				{/if}
			</div>
			{#if production.videos}
				<div class="playlist-videos">
					<h4 class="jost-12 uppercase bold">Episodi</h4>
					<div class="playlist-active-video">
						{#if activeVideo.cover}
							<div class="playlist-active-video-cover">
								<img src={urlFor(activeVideo.cover)} alt="">
								<button class="btn watch">Guarda</button>
							</div>
						{/if}
					</div>
					<div class="playlist-videos-list">
						{#each production.videos as video, i}
							<button class="item" class:active={activeVideoIndex == i}
							onclick={() => {activeVideoIndex = i}}
							>
								<div class="title">
									<h2 class="jost-18 uppercase bold">{production.videos.length - i}. {video.title}</h2>
									{#if video.subtitle}<h2 class="jost-18 bold">{video.subtitle}</h2>{/if}
								</div>
								<div class="opener">
									{#if video.date}<time class="jost-15" datetime={video.date}>{video.date}</time>{/if}
									{#if video.authors?.length < 4}
										<div class="authors jost-15">
											<p class="episode-authors-label">
												<span>Con</span>
												{#each video.authors as author, j}
													<a href="/autori/{author.slug.current}">{author.name} {author.surname}</a>{@html j < video.authors.length - 1  ? ', ' : ''}
												{/each}
											</p>
										</div>
									{:else if video.authors?.length >= 4}
										<p>di Autori vari</p>
									{/if}
									{#if video.body}
										<div class="body jost-15">
											<PortableText
											value={video.body}
											components={{
											block: {
												normal: PlainTextStyle,
												h3: PlainTextStyle,
											},
											listItem: PlainTextStyle,
											marks: {
												link: PlainTextStyle,
											},
											}}/>
										</div>
									{/if}
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/if}
	{/if}
</section>

<style>
#production {
	padding: calc(var(--margin)*3 + 4rem) var(--margin);
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}

/* Podcast */
#production.podcast {
	padding: 0 var(--margin);
}
.podcast-description {
	grid-column: 1 / span 6;
	/* max-height: calc(100vh - (var(--margin)*2 + 6rem)); */
	overflow-y: scroll;
	position: sticky;
	/* top: calc(var(--margin)*3 + 4rem); */
	top: 0;
	padding-top: calc((var(--margin)*3 + 4rem));
	padding-bottom: 4rem;
	height: fit-content;
	max-height: 100vh;
}
.authors {
	display: flex;
	flex-wrap: wrap;
	gap: var(--gutter);
	align-items: center;
	padding: 1rem 0;
}
.authors-label {
	flex-basis: 100%;
}
.author {
	display: flex;
	gap: var(--gutter);
	align-items: center;
}
.portrait {
	width: 3rem;
	border-radius: 100%;
}
.podcast-cover {
	display: block;
	position: relative;
	aspect-ratio: 1;
	border-radius: 1rem;
	overflow: hidden;
	max-width: 300px;
}
.listen {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.podcast-body {
	margin-top: 2rem;
	max-width: 800px;
}

/* Podcast episodes */
.podcast-episodes {
	grid-column: 7 / span 4;
	padding-top: calc((var(--margin)*3 + 4rem));
	padding-bottom: 2rem;
}
.podcast-episodes h4 {
	margin-bottom: 1rem;
}
.podcast-episode {
	display: block;
	border-top: solid 1px var(--black);
	padding: 2rem 0;
}
.podcast-episode:hover {
	opacity: .4;
}
.podcast-episode time {
	display: block;
	margin: 1rem 0 2rem;
}
/* Playlist */
.playlist-description {
	grid-column: 1 / span 6;
}
.playlist-videos {
	grid-column: 1 / span 10;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}
.playlist-videos h4 {
	margin-top: 4rem;
	margin-bottom: 1rem;
}
.playlist-active-video {
	grid-column: 1 / span 7;
}
.playlist-active-video-cover {
	position: relative;
	aspect-ratio: 16:9;
	border-radius: 1rem;
	overflow: hidden;
}
.watch {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
/* Playlist list */
.playlist-videos-list {
	grid-column: 8 / span 3;
}
.playlist-videos-list .item {
	width: 100%;
	display: block;
}
.playlist-videos-list .item + .item:not(.active) {
	border-top: solid 1px var(--black);
}
.playlist-videos-list .opener {
	height: 0;
	overflow: hidden;
}
.playlist-videos-list .title {
	padding: var(--gutter);
	border-radius: 1rem;
}
.playlist-videos-list .item.active .title {
	background-color: var(--gray);
}
.playlist-videos-list .authors {
	padding: 0;
}
.playlist-videos-list .item.active .opener {
	height: auto;
	padding: var(--gutter);
}
.playlist-videos-list .body {
	margin: 2rem 0 4rem;
}

</style>