<!-- PersonTextStyle -->
<script>
import { urlFor } from '$lib/utils/image';
let { portableText } = $props();
let { value } = $derived(portableText)
</script>

{#if value._type === 'person1'}
	<div class="person1">
		{#if value.person.portrait}
			<img class="portrait" src={urlFor(value.person.portrait)} alt="">
			{:else}
			<!-- <img class="portrait" src={urlFor(authorsPlaceholder)} alt=""> -->
		{/if}
		<h2 class="jost-30">{value.person.name} {value.person.surname}</h2>
		{#if value.person.role}<h3 class="jost-18">{value.person.role}</h3>{/if}
	</div>
{:else if value._type === 'person3'}
	<div class="person3">
		{#if value.person.portrait}
			<img class="portrait" src={urlFor(value.person.portrait)} alt="">
			{:else}
			<!-- <img class="portrait" src={urlFor(authorsPlaceholder)} alt=""> -->
		{/if}
		<h2 class="jost-30">{value.person.name} {value.person.surname}</h2>
		{#if value.person.role}<h3 class="jost-18">{value.person.role}</h3>{/if}
	</div>
{/if}

<style>
.person1 {
	flex-basis: 100%;
}
.person3 {
	flex-basis: calc(100%/3);
}
</style>