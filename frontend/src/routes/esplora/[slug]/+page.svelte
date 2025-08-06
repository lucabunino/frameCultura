<script>
import { PortableText } from '@portabletext/svelte'
import PlainTextStyle from '$lib/components/portableTextStyles/PlainTextStyle.svelte';
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data)
const production = data.production
let activeVideoIndex = $state(0)
let activeVideo = $derived(production.videos?.[activeVideoIndex])
let activeVideoPlay = $state(false)
let productionVideoPlay = $state(false)
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

	<!-- Podcast -->
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
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p>di Autori vari</p>
			{/if}
			{#if production.cover}
				<a class="podcast-cover" href={production.link} target="_blank" rel="noopener noreferrer">
					<img class="cover rounded _1-1" src={urlFor(production.cover)} alt="">
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
		{#if production.episodes.length > 0}
			<div class="podcast-episodes">
				<h4 class="jost-12 uppercase bold">Episodi</h4>
				{#each production.episodes as episode, i}
					<a class="episode"
					href={episode.link}
					target="_blank" rel="noopener noreferrer"
					>
						<h2 class="jost-24 uppercase bold">{#if episode.number}{episode.number}{@html '. '}{/if}{episode.title}</h2>
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
	{/if}
	
	<!-- Episode -->
	{#if production._type == 'episode'}
		<div class="episode-description">
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
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p>di Autori vari</p>
			{/if}
			{#if production.cover}
				<a class="episode-cover" href={production.link} target="_blank" rel="noopener noreferrer">
					<img class="cover rounded _1-1" src={urlFor(production.cover)} alt="">
					<button class="btn listen">Ascolta</button>
				</a>
			{/if}
			{#if production.body}
				<div class="episode-body jost-21">
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
		{#if production.podcasts}
			<div class="episode-podcasts">
				<h4 class="jost-12 uppercase bold">Podcast</h4>
				{#each production.podcasts as podcast, j}
					<a class="podcast jost-24" href="/esplora/{podcast.slug.current}">
						<img class="cover rounded _1-1" src={urlFor(podcast.cover)} alt="">
						<h3>{podcast.title}</h3>
					</a>
				{/each}
			</div>
		{/if}
	{/if}

	<!-- Playlist -->
	{#if production._type == 'playlist'}
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
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
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
			<div class="playlist-content">
				<h4 class="jost-12 uppercase bold">Episodi</h4>
				<div class="playlist-active-video">
					{#if activeVideo.cover}
							<button class="playlist-active-video-cover"
							onclick={() => activeVideoPlay = true}
							>
								<img class="cover rounded _16-9" src={urlFor(activeVideo.cover)} alt="">
								{#if !activeVideoPlay}
									<span class="btn watch">Guarda</span>
								{:else if activeVideo.youtubeVideoCode}
									<iframe class="embed yt"
									src="https://www.youtube.com/embed/{activeVideo.youtubeVideoCode}{production.youtubePlaylistCode ? `?list=${production.youtubePlaylistCode}&autoplay=1` : `?autoplay=1`}"
									title="YouTube video with playlist"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen>
									</iframe>
								{/if}
						</button>
					{/if}
				</div>
				<div class="playlist-videos">
					{#each production.videos as video, i}
						<button class="item" class:active={activeVideoIndex == i}
						onclick={() => {activeVideoIndex = i; activeVideoPlay = false}}
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
												<a class="author" href="/autori/{author.slug.current}">
													{#if author.name || author.surname}
														{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}
													{:else if author.alias}
														{author.alias}
													{/if}
												</a>{@html j < video.authors.length - 1  ? ', ' : ''}
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

	<!-- Video -->
	{#if production._type == 'video'}
		<div class="video-description">
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
				<div class="video-body jost-24">
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
			{#if production.cover}
				<div class="playlist-active-video">
					<button class="playlist-active-video-cover"
					onclick={() => productionVideoPlay = true}
					>
						<img class="cover rounded _16-9" src={urlFor(production.cover)} alt="">
						{#if !productionVideoPlay}
							<span class="btn watch">Guarda</span>
						{:else if production.youtubeVideoCode}
							<iframe class="embed yt"
							src="https://www.youtube.com/embed/{production.youtubeVideoCode}{production.youtubePlaylistCode ? `?list=${production.youtubePlaylistCode}&autoplay=1` : `?autoplay=1&rel=0`}"
							title="YouTube video with playlist"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen>
							</iframe>
						{/if}
					</button>
				</div>
			{/if}
		</div>
		{#if production.playlists.length > 0}
			<div class="video-playlists">
				<h4 class="jost-12 uppercase bold">Playlist</h4>
				{#each production.playlists as playlist, j}
					<a class="playlist jost-24" href="/esplora/{playlist.slug.current}">
						<img class="cover rounded _16-9" src={urlFor(playlist.cover)} alt="">
						<h3>{playlist.title}</h3>
					</a>
				{/each}
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
	overflow-y: scroll;
	position: sticky;
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
}
.podcast-cover {
	display: block;
	position: relative;
	overflow: hidden;
	max-width: 300px;
}
.listen {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.listen:hover {
	opacity: 1;
}
.podcast-body {
	margin-top: 2rem;
	max-width: 800px;
}
.podcast-episodes {
	grid-column: 7 / span 4;
	padding-top: calc((var(--margin)*3 + 4rem));
	padding-bottom: 2rem;
}
.podcast-episodes h4 {
	margin-bottom: 1rem;
}
.podcast-episodes .episode {
	display: block;
	border-top: solid 1px var(--black);
	padding: 2rem 0;
}
.podcast-episodes .episode:hover {
	opacity: .4;
}
.podcast-episodes .episode time {
	display: block;
	margin: 1rem 0 2rem;
}


/* Episode */
.episode-description {
	grid-column: 1 / span 6;
}
.episode-cover {
	display: block;
	position: relative;
	overflow: hidden;
	max-width: 300px;
}
.episode-podcasts {
	grid-column: 8 / span 3;
}
.episode-podcasts .cover {
	max-height: 150px;
}
.episode-podcasts h4 {
	margin-bottom: 1rem;
}
.episode-podcasts .podcast {
	border-top: solid 1px var(--black);
	display: block;
	padding-top: 2rem;
	padding-bottom: 1rem;
}
/* .episode-podcasts .cover {
	max-width: 300px;
} */


/* Playlist */
.playlist-description {
	grid-column: 1 / span 6;
}
.playlist-content {
	grid-column: 1 / span 10;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}
.playlist-content h4 {
	margin-top: 4rem;
	margin-bottom: 1rem;
}
.playlist-active-video {
	grid-column: 1 / span 7;
}
.playlist-active-video-cover {
	display: block;
	position: relative;
	overflow: hidden;
	width: 100%;
}
.watch {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
.playlist-videos {
	grid-column: 8 / span 3;
}
.playlist-videos .item {
	width: 100%;
	display: block;
}
.playlist-videos .item + .item:not(.active) {
	border-top: solid 1px var(--black);
}
.playlist-videos .opener {
	height: 0;
	overflow: hidden;
}
.playlist-videos .title {
	padding: var(--gutter);
	border-radius: 1rem;
}
.playlist-videos .item.active .title {
	background-color: var(--gray);
}
.playlist-videos .authors {
	padding: 0;
}
.playlist-videos .author {
	display: inline-block;
	text-decoration: underline;
}
.playlist-videos .item.active .opener {
	height: auto;
	padding: var(--gutter);
}
.playlist-videos .body {
	margin: 2rem 0 4rem;
}
.embed.yt {
	width: 100%;
	height: 100%;
	position: absolute;
	display: block;
	top: 0;
	left: 0;
}

/* Video */
.video-description {
	grid-column: 1 / span 6;
}
.video-playlists {
	grid-column: 8 / span 3;
}
.video-playlists h4 {
	margin-bottom: 1rem;
}
.video-playlists .podcast {
	border-top: solid 1px var(--black);
	display: block;
	padding-top: 2rem;
	padding-bottom: 1rem;
}
/* .video-playlists .cover {
	border-radius: 1rem;
	max-width: 300px;
} */
</style>