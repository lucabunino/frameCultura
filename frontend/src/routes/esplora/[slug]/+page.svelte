<script>
import { PortableText } from '@portabletext/svelte'
import PlainTextStyle from '$lib/components/portableTextStyles/PlainTextStyle.svelte';
import { urlFor } from "$lib/utils/image";
import { formatDate } from '$lib/utils/date';

let { data } = $props();
$inspect(data)
const production = data.production
let activeVideoIndex = $state(0)
let activeVideo = $derived(production.videos?.[activeVideoIndex])
let activeVideoPlay = $state(false)
let productionVideoPlay = $state(false)
let videos = $state([])
let scrollY = $state(0)
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

<svelte:window bind:scrollY></svelte:window>

<section id="production" class={production._type}>

	<!-- Podcast -->
	{#if production._type == 'podcast'}
		<div class="description">
			<h1 class="jost-74 uppercase">{production.title}</h1>
			{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
			{#if production.authors?.length < 4}
				<div class="authors">
					<p class="authors-label jost-12 uppercase bold">Un podcast di</p>
					{#each production.authors as author, j}
						<a href="/autori/{author.slug.current}" class="author jost-24">
							<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p class="jost-27 authors">di Autori vari</p>
			{/if}
			{#if production.cover}
				<a class="cover-wrapper" href={production.link} target="_blank" rel="noopener noreferrer">
					<img class="cover rounded _1-1" src={urlFor(production.cover ? production.cover : data.info.placeholder)} alt="">
					<button class="btn listen">Ascolta</button>
				</a>
			{/if}
			{#if production.body}
				<div class="body jost-21">
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
			<div class="list episodes">
				<h4 class="jost-12 uppercase bold">Episodi</h4>
				{#each production.episodes as episode, i}
					<a class="episode"
					href={episode.link}
					target="_blank" rel="noopener noreferrer"
					>
						<h2 class="jost-24 uppercase bold">{#if episode.number}{episode.number}{@html '. '}{/if}{episode.title}</h2>
						{#if episode.subtitle}<h3 class="jost-24 bold">{episode.subtitle}</h3>{/if}
						{#if episode.date}<time class="jost-15" datetime={episode.date}>{formatDate(episode.date)}</time>{/if}
						{#if episode.body}
							<div class="body jost-15">
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
		<div class="description">
			<h1 class="jost-74 uppercase">{production.title}</h1>
			{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
			{#if production.authors?.length < 4}
				<div class="authors">
					<p class="authors-label jost-12 uppercase bold">Un podcast di</p>
					{#each production.authors as author, j}
						<a href="/autori/{author.slug.current}" class="author jost-24">
							<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p class="jost-27 authors">di Autori vari</p>
			{/if}
			{#if production.cover}
				<a class="cover-wrapper" href={production.link} target="_blank" rel="noopener noreferrer">
					<img class="cover rounded _1-1" src={urlFor(production.cover ? production.cover : data.info.placeholder)} alt="">
					<button class="btn listen">Ascolta</button>
				</a>
			{/if}
			{#if production.body}
				<div class="body jost-21">
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
			<div class="list podcasts">
				<h4 class="jost-12 uppercase bold">Podcast</h4>
				{#each production.podcasts as podcast, j}
					<a class="podcast jost-24" href="/esplora/{podcast.slug.current}">
						<img class="cover rounded _1-1" src={urlFor(podcast.cover ? podcast.cover : data.info.placeholder)} alt="">
						<h2 class="jost-18 uppercase bold">{podcast.title}</h2>
						{#if podcast.subtitle}<h3 class="jost-18 bold">{podcast.subtitle}</h3>{/if}
					</a>
				{/each}
			</div>
		{/if}
	{/if}

	<!-- Playlist -->
	{#if production._type == 'playlist'}
		<div class="description">
			<h1 class="jost-74 uppercase">{production.title}</h1>
			{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
			{#if production.authors?.length < 4}
				<div class="authors">
					<p class="authors-label jost-12 uppercase bold">Con</p>
					{#each production.authors as author, j}
						<a href="/autori/{author.slug.current}" class="author jost-24">
							<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
							{#if author.name || author.surname}
								<h3 class="jost-27">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h3>
							{:else if author.alias}
								<h3 class="jost-27">{author.alias}</h3>
							{/if}
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p class="jost-27 authors">di Autori vari</p>
			{/if}
			{#if production.body}
				<div class="body jost-24">
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
			<div class="content">
				<h4 class="jost-12 uppercase bold">Episodi</h4>
				<div class="active-video">
						<button class="active-video-cover"
						onclick={() => activeVideoPlay = true}
						>
							<img class="cover rounded _16-9" src={urlFor(activeVideo.cover ? activeVideo.cover : data.info.placeholder)} alt="">
							{#if !activeVideoPlay}
								<span class="btn watch">Guarda</span>
							{:else if activeVideo.youtubeVideoCode}
								<iframe class="embed yt"
								src="https://www.youtube.com/embed/{activeVideo.youtubeVideoCode}{production.youtubePlaylistCode ? `?list=${production.youtubePlaylistCode}&autoplay=1` : `?autoplay=1`}"
								title={activeVideo.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen>
								</iframe>
							{/if}
					</button>
				</div>
				<div class="list videos">
					{#each production.videos as video, i}
						<button class="item" class:active={activeVideoIndex == i}
						bind:this={videos[i]}
						onclick={() => {
							activeVideoIndex = i;
							activeVideoPlay = false;
							setTimeout(() => {
								if (production.videos.length - i > 4) {
									const offset = scrollY + videos[i].getBoundingClientRect().top - (12*4 + 12*7 - 1);
									window.scrollTo({ top: offset, behavior: 'smooth' });	
								}
							}, 100);
						}}
						>
							<div class="title">
								<h2 class="jost-18 uppercase bold">{i+1}. {video.title}</h2>
								{#if video.subtitle}<h3 class="jost-18 bold">{video.subtitle}</h3>{/if}
							</div>
							<div class="opener">
								{#if video.date}<time class="jost-15" datetime={video.date}>{video.date}</time>{/if}
								{#if video.authors?.length < 4}
									<div class="authors jost-15">
										<p class="authors-label">
											<span>Con</span>
											{#each video.authors as author, j}
												<a class="author inline" href="/autori/{author.slug.current}">
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
									<p class="authors">di Autori vari</p>
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
		<div class="description">
			<h1 class="jost-74 uppercase">{production.title}</h1>
			{#if production.subtitle}<h2 class="jost-74">{production.subtitle}</h2>{/if}
			{#if production.authors?.length < 4}
				<div class="authors">
					<p class="authors-label jost-12 uppercase bold">Con</p>
					{#each production.authors as author, j}
						<a href="/autori/{author.slug.current}" class="author jost-24">
							<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
							<h3>{author.name} {author.surname}</h3>
						</a>
					{/each}
				</div>
			{:else if production.authors?.length >= 4}
				<p class="authors">di Autori vari</p>
			{/if}
			{#if production.body}
				<div class="body jost-24">
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
				<div class="active-video">
					<button class="active-video-cover"
					onclick={() => productionVideoPlay = true}
					>
						<img class="cover rounded _16-9" src={urlFor(production.cover ? production.cover : data.info.placeholder)} alt="">
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
			<div class="list playlists">
				<h4 class="jost-12 uppercase bold">Playlist</h4>
				{#each production.playlists as playlist, j}
					<a class="playlist jost-24" href="/esplora/{playlist.slug.current}">
						<img class="cover rounded _16-9" src={urlFor(playlist.cover ? playlist.cover : data.info.placeholder)} alt="">
						<h2 class="jost-18 uppercase bold">{playlist.title}</h2>
						{#if playlist.subtitle}<h3 class="jost-18 bold">{playlist.subtitle}</h3>{/if}
					</a>
				{/each}
			</div>
		{/if}
	{/if}
</section>

<style>
#production {
	padding: 0 var(--margin);
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}
.description {
	grid-column: 1 / span 6;
	overflow-y: scroll;
	position: sticky;
	top: 0;
	height: fit-content;
	padding-top: calc((var(--margin)*2 + 8rem));
	padding-bottom: 4rem;
}
.playlist .description {
	position: relative;
}
.playlist .description, .podcast .description {
	max-height: 100vh;
}
.authors {
	display: flex;
	flex-wrap: wrap;
	row-gap: var(--gutter);
	column-gap: calc(var(--gutter)*2);
	align-items: center;
	margin-top: 3rem;
}
.list .authors {
	margin-top: 0;
}
.authors-label {
	flex-basis: 100%;
}
.author {
	display: flex;
	column-gap: calc(var(--gutter)/2);
	align-items: center;
}
.author.inline {
	display: inline !important;
}
.portrait {
	width: 3rem;
}
.listen, .watch {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
h1 {
	margin-right: var(--margin);
}
.body {
	margin-top: 3rem;
	margin-bottom: 4rem;
	max-width: 700px;
}
.podcast .cover-wrapper, .episode .cover-wrapper {
	margin-top: 3rem;
	display: block;
	position: relative;
	overflow: hidden;
	max-width: 300px;
}
.embed.yt {
	width: 100%;
	height: 100%;
	position: absolute;
	display: block;
	top: 0;
	left: 0;
}
.active-video-cover {
	display: block;
	position: relative;
	overflow: hidden;
	width: 100%;
}
.list {
	grid-column: 7 / span 4;
	padding: calc((var(--margin)*2 + 8rem)) 0 2rem;
}
.playlist .list {
	padding: 0;
}
.episode .list,
.playlist .list,
.video .list {
	grid-column: 8 / span 3;
}
h4 {
	margin-bottom: 1rem;
}


/* Podcast */
.podcast .episode {
	display: block;
	border-top: solid 1px var(--black);
	padding: 2rem 0;
}
.podcast .episode:hover {
	opacity: .4;
}
.podcast .episode time {
	display: block;
	margin: 1rem 0 2rem;
}


/* Episode */
.episode .cover {
	display: block;
	position: relative;
	overflow: hidden;
	max-width: 300px;
}
.episode .podcasts h4 {
	border-bottom: solid 1px var(--black);
	padding-bottom: 1rem;
}
.episode .podcasts h2 {
	margin-top: 1rem;
}
.episode .podcasts .cover {
	max-height: 150px;
	width: auto;
}
.episode .podcasts .podcast {
	display: block;
	padding-top: 1rem;
	padding-bottom: 3rem;
}



/* Playlist */
.playlist .content {
	grid-column: 1 / span 10;
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	column-gap: var(--gutter);
}
.playlist h4 {
	position: sticky;
	top: calc((var(--margin)*2 + 5.7rem));
}
.playlist .active-video {
	grid-column: 1 / span 7;
	position: sticky;
	height: fit-content;
	top: calc((var(--margin)*2 + 8rem));
}
.playlist .cover {
	max-height: calc(100vh - (var(--margin)*3 + 8rem));
	width: 100%;
	object-fit: contain;
}
.playlist .videos .item {
	width: 100%;
	display: block;
}
.playlist .videos .item:not(.active):hover .title {
	border-right: solid 5px var(--black);
	padding-right: calc(var(--gutter) - 5px);
	border-radius: 0;
}
.playlist .videos .item + .item:not(.active) {
	border-top: solid 1px var(--black);
}
.playlist .videos .opener {
	height: 0;
	overflow: hidden;
}
.playlist .videos .title {
	padding: var(--gutter);
	border-radius: .6rem;
}
.playlist .videos .item.active .title {
	background-color: var(--gray);
}
.playlist .videos .item.active:not(:first-of-type) .title {
	margin-top: 1px;
}
.playlist .videos .authors {
	padding: 0;
}
.playlist .videos .author {
	display: inline-block;
	text-decoration: underline;
}
.playlist .videos .item.active .opener {
	height: auto;
	padding: var(--gutter);
}

/* Video */
.video .description {
	grid-column: 1 / span 6;
}
.video .active-video {
	margin-top: 4rem;
}

.video .playlists {
	grid-column: 8 / span 3;
}
.video .playlists h4 {
	border-bottom: solid 1px var(--black);
	padding-bottom: 1rem;
}
.video .playlists h2 {
	margin-top: 1rem;
}
.video .playlists .cover {
	max-height: 150px;
	width: auto;
}
.video .playlists .playlist {
	display: block;
	padding-top: 1rem;
	padding-bottom: 3rem;
}
</style>