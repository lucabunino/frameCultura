<!-- StatTextStyle -->
<script>
let { portableText } = $props();
let { value } = $derived(portableText)
</script>

{#if value._type === 'stat'}
<div class="stat">
	<p class="jost-210"
	style={`color: ${value.numberColor?.hex}`}
	>{value.number}</p>
	<p class="jost-54">{value.title}</p>
</div>
{/if}

<style>
.stat {
	flex-basis: 50%;
	margin-top: 6rem;
	gap: 1rem;
	display: flex;
	flex-direction: column;
}
</style>