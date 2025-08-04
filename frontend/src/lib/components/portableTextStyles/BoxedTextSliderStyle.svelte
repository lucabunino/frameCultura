<!-- BoxedTextSliderStyle.svelte -->
<script>
let { portableText } = $props();
let { value } = $derived(portableText)
</script>

<div class="slider">
	{#each value.items as item, i}
		<div class="slide"
		style={`--color: ${item.activeColor?.hex}`}
		>
			<div class="slide-content">
				<p class="jost-45">{item.title}</p>
				{#if item.abstract}
					<p class="jost-18">{item.abstract}</p>
				{/if}
			</div>
			{#if item.ctaLabel && item.ctaLink}
				<a class="btn" href={item.ctaLink}>{item.ctaLabel}</a>
			{/if}
		</div>
	{/each}
</div>

<style>
.slider {
	display: flex;
	overflow-x: auto;
	gap: 1rem;
	scroll-snap-type: x mandatory;
	margin-top: 2rem;
}
.slide {
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
.slide:hover {
	background-color: var(--color);
}
.btn {
	width: fit-content;
}
</style>