<script>
import { formatAuthorName } from "$lib/utils/author";
import { formatDate } from "$lib/utils/date";
import { urlFor } from "$lib/utils/image";
let {
	event,
	slider = false
} = $props()
</script>

<div class="event jost-15" class:slider={slider}>
	<a href={`/live/${event.slug.current}`}>
		<img class="cover _5-7" src={urlFor(event.cover)} alt="">
	</a>
	{#if event.city || event.format}
		<div class="tags">
			{#if event.format}
				<a class="tag" href="/cerca?search={event.format.title}">{event.format.title}</a>
			{/if}
			{#if event.city}
				<a class="tag" href="/cerca?search={event.city.title}">{event.city.title}</a>
			{/if}
			{#if event.topics}
				{#each event.topics as topic, j}
					<a class="tag" href="/cerca?search={topic.title}">{topic.title}</a>
				{/each}
			{/if}
		</div>
	{/if}
	<time>{formatDate(event.start, event.end)}</time>
	<h2 class="jost-24 bold uppercase leading-105">{event.title}</h2>
	{#if event.subtitle}<h3 class="jost-24 bold leading-105">{event.subtitle}</h3>{/if}
	{#if event.abstract}
		<p class="abstract" style="margin-top: 1em;">{event.abstract}</p>
	{/if}
	{#if event.people}
		<p class="people" style={!event.abstract ? "margin-top: 1em;" : ''}>Con
			{#if event.people?.length < 4}
				{#each event.people as person, i}
					{#if person.isAuthor}
						<a class="person hover-gray" href="/autori/{person.slug.current}">{formatAuthorName(person)}</a>
					{:else}
						<span class="person">{formatAuthorName(person)}</span>
					{/if}{@html event.people.length > i+1 ? ', ' : ''}
				{/each}
			{:else if event.people?.length >= 4}
				Autori vari
			{/if}
		</p>
	{/if}
</div>

<style>
.event {
	position: relative;
}
.event .cover {
	margin-bottom: 1rem;
}
.event time {
	margin-bottom: 1rem;
	line-height: 1.1;
	display: block;
}
.tags {
	display: flex;
	flex-wrap: wrap;
	max-width: stretch;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	padding: .4em;
	gap: .2em;
}
.event.slider>a>*:not(img) {
	padding-right: 2rem;
}
.hover-gray {
	text-decoration: underline;
}
</style>