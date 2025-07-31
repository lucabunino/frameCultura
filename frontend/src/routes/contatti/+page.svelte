<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data)
</script>

<section id="contact">
	{#each data.contact.boxedTexts as item, i}
		<div class="box"
		style={`--color: ${item.activeColor?.hex}`}
		>
			<div class="box-content">
				<h2 class="jost-45">{item.title}</h2>
				{#if item.abstract}
					<p class="jost-18">{item.abstract}</p>
				{/if}
			</div>
			{#if item.ctaLabel && item.ctaLink}
				<a class="btn" href={item.ctaLink} target="_blank" rel="noopener noreferrer">{item.ctaLabel}</a>
			{/if}
		</div>
	{/each}
</section>

<style>
#contact {
	padding: var(--margin);
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--gutter);
}
.box {
	min-width: 80%;
	scroll-snap-align: start;
	border-radius: 1rem;
	background-color: var(--gray);
	padding: var(--margin);
	min-height: 35vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.box:hover {
	background-color: var(--color);
}
h2 {
	margin-bottom: 1rem;
}
.btn {
	width: fit-content;
}
</style>