<script>
import { PortableText } from '@portabletext/svelte'
import PlainTextStyle from '$lib/components/portableTextStyles/PlainTextStyle.svelte';
import { urlFor } from "$lib/utils/image";
import { formatDate } from "$lib/utils/date";
let { data } = $props();
$inspect(data.author)
const author = data.author

let expanded = $state(false)
let plainTextBody = $derived(blocksToPlainText(author.body));
function blocksToPlainText(blocks) {
	if (!Array.isArray(blocks)) return '';
	return blocks
		.filter(block => block._type === 'block' && block.children)
		.map(block => block.children.map(child => child.text).join(''))
		.join('\n'); // Optional: use "\n\n" to preserve paragraph breaks
}
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

<section id="author">
	<div class="author-wrapper" class:noHighlights={!author.highlightedContents}>
		<div class="description">
			<div class="card">
				<img class="portrait" src={urlFor(author.portrait ? author.portrait : data.info.placeholder)} alt="">
				<div class="names">
					{#if author.name || author.surname}
						<h1 class="jost-74 name">{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}</h1>
					{:else if author.alias}
						<h1 class="jost-74 name">{author.alias}</h1>
					{/if}
					{#if author.occupation}<h3 class="jost-27 occupation">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if}
				</div>
			</div>
			{#if author.body}
				{#if plainTextBody.length > 400}
					{#if expanded}
						<div class="body bio jost-18">
							<PortableText
								value={author.body}
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
						<button class="btn bg-gray" on:click={() => expanded = false}>Leggi meno</button>
					{:else}
						<p class="jost-18 bio">{plainTextBody.slice(0, 400)}…</p>
						<button class="btn bg-gray" on:click={() => expanded = true}>Leggi di più</button>
					{/if}
				{:else}
					<div class="body bio jost-18">
						<PortableText
							value={author.body}
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
			{:else if author.bio}
				{#if author.bio.length > 400}
					{#if expanded}
						<p class="jost-18 bio">{author.bio}</p>
						<button class="btn bg-gray" on:click={() => expanded = false}>Leggi meno</button>
					{:else}
						<p class="jost-18 bio">{author.bio.slice(0, 400)}…</p>
						<button class="btn bg-gray" on:click={() => expanded = true}>Leggi di più</button>
					{/if}
				{:else}
					<p class="jost-18 bio">{author.bio}</p>
				{/if}
			{/if}
		</div>
		{#if author.productions.length > 0}
			<div class="author-appears">
				<h4 class="jost-12 uppercase bold">Compare in</h4>
				<div class="author-contents">
					{#each author.productions as production, i}
						<a class="author-content jost-15" href={`/esplora/${production.slug.current}`}>
							<img class="cover rounded _16-9" src={urlFor(production.cover ? production.cover : data.info.placeholder)} alt=""
							class:_1-1={production._type == "episode" || production._type == "podcast"}
							class:_16-9={production._type == "video" || production._type == "playlist"}
							>
							<h2 class="jost-18 uppercase bold">{production.title}</h2>
							{#if production.subtitle}<h3 class="jost-18 bold">{production.subtitle}</h3>{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	{#if author.highlightedContents}	
		<div class="author-highlighted-contents">
			<h4 class="jost-12 uppercase bold">In evidenza</h4>
			{#each author.highlightedContents as production, i}
				<a class="author-highlighted-content jost-15" href={`/esplora/${production.slug.current}`}>
					<img class="cover rounded" src={urlFor(production.cover ? production.cover : data.info.placeholder)} alt=""
					class:_1-1={production._type == "episode" || production._type == "podcast"}
					class:_16-9={production._type == "video" || production._type == "playlist"}
					>
					<h2 class="jost-18 uppercase bold">{production.title}</h2>
					{#if production.subtitle}<h3 class="jost-18 bold">{production.subtitle}</h3>{/if}
					<div class="info">
						{#if production.date}<time class="jost-15" datetime={production.date}>{formatDate(production.date)}</time>{/if}
						{#if production.authors?.length < 4}
							<div class="authors jost-15">
								<p class="episode-authors-label">
									<span>Con</span>
									{#each production.authors as author, j}
										<a class="author" href="/autori/{author.slug.current}">
											{#if author.name || author.surname}
												{author.name}{#if author.surname}{@html ' '}{author.surname}{/if}{#if author.alias}{@html ' '}({author.alias}){/if}
											{:else if author.alias}
												{author.alias}
											{/if}
										</a>{@html j < production.authors.length - 1  ? ', ' : ''}
									{/each}
								</p>
							</div>
						{:else if production.authors?.length >= 4}
							<p>di Autori vari</p>
						{/if}
					</div>
					{#if production.body}
						<div class="body jost-15">
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
				</a>
			{/each}
		</div>
	{/if}
</section>

<style>
#author {
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	padding: 0 var(--margin);
	gap: var(--gutter);
}
.author-wrapper {
	grid-column: 1 / span 7;
	overflow-y: scroll;
	position: sticky;
	top: 0;
	height: fit-content;
	max-height: 100vh;
}
.author-wrapper.noHighlights {
	grid-column: 1 / span 10;
}
/* Description */
.card {
	display: flex;
	align-items: center;
	gap: var(--margin);
	padding-top: 2rem;
}
.names {
	width: calc(100% - 200px - var(--margin));
}
.name {
	max-width: 800px;
}
.occupation {
	margin-top: 1rem;
	max-width: 600px;
}
.portrait {
	width: 200px;
}
.bio {
	margin-top: 2rem;
	max-width: 700px;
	margin-bottom: 2rem;
}
/* Productions */
.author-appears {
	margin-top: 8rem;
}
h4 {
	margin-bottom: 1rem;
}
.author-contents {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: var(--gutter);
	row-gap: 4rem;
	padding-bottom: 4rem;
}
.noHighlights .author-contents {
	grid-template-columns: repeat(5, 1fr);
}
.author-content img {
	margin-bottom: 1rem;
}
.author-content h2, .author-content h3 {
	line-height: 1.05;
}
/* Highlights */
.author-highlighted-contents {
	grid-column: 8 / span 3;
	padding-top: 2rem;
}
.author-highlighted-contents .cover {
	max-height: 250px;
	margin-bottom: 1rem;
}
.author-highlighted-content {
	display: block;
	border-top: solid 1px var(--black);
	padding-top: 2rem;
	margin-bottom: 4rem;
}
.author-highlighted-content .info {
	margin-top: 1rem;
}
.author-highlighted-content .author {
	display: inline-block;
	text-decoration: underline;
}
.author-highlighted-content .body {
	margin-top: 2rem;
}
</style>