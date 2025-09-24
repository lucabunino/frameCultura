<script>
import { formatDate } from "$lib/utils/date";
import { urlFor } from "$lib/utils/image";
let {event} = $props()
$inspect(event)
</script>

<div class="event jost-18">
	<a href={`/live/${event.slug.current}`}>
		<img class="cover _5-7" src={urlFor(event.cover)} alt="">
		<time datetime={event.start}>{formatDate(event.start, event.end)}</time>
		<h2 class="jost-24">{event.title}</h2>
		{#if event.subtitle}<h3>{event.subtitle}</h3>{/if}
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
</style>