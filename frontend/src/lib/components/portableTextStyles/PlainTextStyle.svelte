<!-- AboutTextStyle -->
<script lang="ts">
import type {BlockComponentProps} from '@portabletext/svelte'

interface Props {
	portableText: BlockComponentProps;
	children?: import('svelte').Snippet;
}

let { portableText, children }: Props = $props();
let {global, value} = $derived(portableText)
let {style, listItem, markDefs} = $derived(value);
</script>

{#if value._type === 'link'}
	<span class="link"><a href={value?.url} target={value?.blank ? '_blank' : undefined}>
	{@render children()}{#if value?.blank}<sup>{@html ' ↗'}</sup>{/if}
	</a></span>
{:else if style === 'normal' && !listItem}
	<p>{@render children()}</p>
{:else if listItem == 'bullet'}
	<li>{@render children()}</li>
{:else if style=== 'h3'}
	<h3 class="jost-12 uppercase bold">{@render children()}</h3>
{/if}
<style>
p {
	flex-basis: 100%;
}
.link {
	text-decoration: underline;
	cursor: pointer;
}
h3 {
	flex-basis: 100%;
	margin-top: 4rem;
	margin-bottom: 2rem;
}
li {
	padding: 0;
	text-indent: 0;
	list-style-type: "— ";
    list-style-position: inside;
}
</style>