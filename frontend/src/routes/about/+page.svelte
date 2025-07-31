<script>
import { PortableText } from '@portabletext/svelte'
import AboutTextStyle from "$lib/components/portableTextStyles/AboutTextStyle.svelte";
import BoxedTextStyle from "$lib/components/portableTextStyles/BoxedTextStyle.svelte";
import BoxedTextSliderStyle from "$lib/components/portableTextStyles/BoxedTextSliderStyle.svelte";
import PersonTextStyle from "$lib/components/portableTextStyles/PersonTextStyle.svelte";
import StatTextStyle from "$lib/components/portableTextStyles/StatTextStyle.svelte";
import { urlFor } from "$lib/utils/image";
let { data } = $props();
$inspect(data.about.body)

let activeSection = $state(0)
let rawBlocks = data.about.body;
let processedBlocks = [];

for (let i = 0; i < rawBlocks.length; ) {
	if (rawBlocks[i]._type === 'boxedText') {
		let group = [];
		while (rawBlocks[i]?._type === 'boxedText') {
			group.push(rawBlocks[i]);
			i++;
		}
		processedBlocks.push({
			_key: crypto.randomUUID?.() ?? Math.random().toString(36),
			_type: 'boxedTextGroup',
			items: group
		});
	} else {
		processedBlocks.push(rawBlocks[i]);
		i++;
	}
}
</script>

{#if data.about.introduction}
	<section id="intro">
		<h1 class="jost-74">{data.about.introduction}</h1>
	</section>
{/if}

<section id="about">
	<nav class="navigator">
		{#each data.about.body as block, i}
			{#if block._type === 'anchor'}
				<a class="navigator-item jost-18 uppercase bold" href="#{block.slug.current}"
				class:active={activeSection == i}
				onclick={() => activeSection = i}
				style={`--color: ${block.activeColor?.hex}`}
				>{block.title}</a>
			{/if}
		{/each}
	</nav>
	<div class="body">
		<PortableText
		value={processedBlocks}
		components={{
		block: {
			normal: AboutTextStyle,
			h1: AboutTextStyle,
		},
		listItem: AboutTextStyle,
		marks: {
			link: AboutTextStyle,
		},
		types: {
			anchor: AboutTextStyle,
			boxedText: BoxedTextStyle,
			boxedTextGroup: BoxedTextSliderStyle,
			person1: PersonTextStyle,
			person3: PersonTextStyle,
			stat: StatTextStyle,
		}
		}}/>
	</div>
</section>

<style>
/* Intro */
#intro {
	padding: var(--margin);
}

/* Explore */
#about {
	padding: var(--margin);
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}
.navigator {
	grid-column: 1 / span 2;
	display: flex;
	flex-direction: column;
	position: sticky;
	top: calc(var(--margin)*2 + 4rem);
	height: fit-content;
}
.navigator-item {
	padding: var(--gutter);
}
.navigator-item:hover, .navigator-item.active {
	border-top: none;
	background-color: var(--color);
}
.navigator-item + .navigator-item {
	border-top: solid 1px;
}
.body {
	grid-column: 4 / span 7;
	display: flex;
	flex-wrap: wrap;
}
</style>