<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data)
</script>

{#if data.liveSelection}
	<section id="liveSelection">
		Selezione di eventi in evidenza (slider):
		{#each data.liveSelection as event, i}
			<div>{event.title}</div>
		{/each}
	</section>
{/if}

<section id="live">
{#each data.live as event, i}
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
</section>

<style>
/* Highlights */
#liveSelection {
	background-color: var(--blue);
	height: 100vh;
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
	width: -webkit-fill-available;
	width: fill-available;
	position: absolute;
	padding: .2em;
	gap: .2em;
}
</style>