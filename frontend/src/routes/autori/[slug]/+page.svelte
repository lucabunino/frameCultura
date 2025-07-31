<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data.author)
const author = data.author
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
	<div class="author">
		<div class="author-description">
			{#if author.portrait}
				<img class="portrait" src={urlFor(author.portrait)} alt="">
			{:else}
				<img class="portrait" src={urlFor(data.info.authorsPlaceholder)} alt="">
			{/if}
			<div>
				<h1 class="jost-74">{author.name} {author.surname}</h1>
				{#if author.occupation}<h3 class="jost-24">{author.occupation[0].toUpperCase() + author.occupation.slice(1)}</h3>{/if}
			</div>
			{#if author.bio}<p class="jost-18 bio">{author.bio}</p>{/if}
		</div>
		{#if author.productions.length > 0}
			<div class="author-appears">
				<h4 class="jost-12 uppercase">Compare in</h4>
				<div class="author-contents">
					{#each author.productions as production, i}
						<a class="author-content jost-15" href={`/esplora/${production.slug.current}`}>
							<img src={urlFor(production.cover)} alt="">
							<h2 class="uppercase bold">{production.title}</h2>
							{#if production.subtitle}<h3>{production.subtitle}</h3>{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	{#if author.highlightedContents}	
		<div class="author-highlighted-contents">
			<h4 class="jost-12 uppercase">In evidenza</h4>
			{#each author.highlightedContents as production, i}
				<a class="active-author-highlighted-content jost-15" href={`/esplora/${production.slug.current}`}>
					<img src={urlFor(production.cover)} alt="">
					<h2 class="uppercase bold">{production.title}</h2>
					{#if production.subtitle}<h3>{production.subtitle}</h3>{/if}
				</a>
			{/each}
		</div>
	{/if}
</section>

<style>
#author {
	display: flex;
}
.author {
	width: 70%;
	padding: var(--margin);
}
/* Description */
.author-description {
	display: flex;
	flex-wrap: wrap;
	gap: var(--margin);
}
.portrait {
	border-radius: 100%;
	max-width: 200px;
}
.bio {
	max-width: 700px;
	flex-basis: 100%;
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
}
.author-contents img {
	border-radius: 1rem;
}
/* Highlights */
.author-highlighted-contents {
	width: 30%;
	right: 0;
	border-left: solid 1px;
	padding: var(--margin);
}
.author-highlighted-contents img {
	border-radius: 1rem;
}
</style>