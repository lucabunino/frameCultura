<!-- PersonTextStyle -->
<script>
import { urlFor } from '$lib/utils/image';
let { portableText } = $props();
let { value } = $derived(portableText)
</script>

{#if value._type === 'person1'}
	<div class="person person1">
		{#if value.person.portrait}
			<img class="portrait" src={urlFor(value.person.portrait)} alt="">
		{:else}
			<div class="portrait"></div>
		{/if}
		<div>
			<h2 class="jost-30">{value.person.name} {value.person.surname}</h2>
			{#if value.person.role}<h3 class="jost-18">{value.person.role}</h3>{/if}
		</div>
	</div>
{:else if value._type === 'person3'}
	<div class="person person3">
		{#if value.person.portrait}
			<img class="portrait" src={urlFor(value.person.portrait)} alt="">
		{:else}
			<div class="portrait"></div>
		{/if}
		<div>
			<h2 class="jost-30">{value.person.name} {value.person.surname}</h2>
			{#if value.person.role}<h3 class="jost-18">{value.person.role}</h3>{/if}
		</div>
	</div>
{/if}

<style>
.person {
	display: flex;
	gap: var(--margin);
}
.person1 {
	flex-basis: 100%;
}
.person3 {
	flex-basis: calc(100%/3);
	flex-direction: column;
}
.portrait {
	width: 100%;
	max-width: 250px;
	background-color: var(--gray);
}
</style>