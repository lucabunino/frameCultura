<script>
import { urlFor } from "$lib/utils/image";
let { data } = $props();
let activeOrganization = $state(0)
</script>

{#if data.network.introduction}
	<section id="intro">
		<h1 class="jost-74">{data.about.introduction}</h1>
	</section>
{/if}

<section id="network">
	<nav class="navigator">
		{#each data.network.network as cluster, i}
			<a class="navigator-item jost-18 uppercase bold" href="#{cluster.slug.current}"
			class:active={activeOrganization == i}
			onclick={() => activeOrganization = i}
			style={`--color: ${cluster.activeColor?.hex}`}
			>{cluster.title}</a>
		{/each}
	</nav>
	<div class="network">
		{#each data.network.network as cluster, i}
			<h4 class="jost-12 uppercase bold" id={cluster.slug.current}>{cluster.title}</h4>
			<div class="organizations">
				{#each cluster.organizations as organization, j}
					<div class="organization">
						<img src={urlFor(organization.logo)} alt="">
						<h2>{organization.title}</h2>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
#network {
	padding: var(--margin);
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
}
/* Navigator */
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
/* Network */
.network {
	grid-column: 4 / span 7;
	display: flex;
	flex-wrap: wrap;
}
.organizations {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: var(--gutter);
	row-gap: 6rem;
}
.organization {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}
h4 {
	flex-basis: 100%;
	border-bottom: solid 1px var(--black);
	margin-top: 2rem;
	margin-bottom: 1rem;
	padding-top: 8rem;
	padding-bottom: 1rem;
}
h4:first-of-type {
	margin: 0;
	padding-top: 0;
}
</style>