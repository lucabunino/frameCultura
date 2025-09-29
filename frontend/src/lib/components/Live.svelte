<script>
import { isPast } from "$lib/utils/date";
import { urlFor } from "$lib/utils/image";
import { onMount } from "svelte";
let {
	live,
} = $props()

let now = $state(new Date());
onMount(() => {
	const interval = setInterval(() => now = Date.now(), 1000);
	return () => clearInterval(interval);
});

let countdown = $derived.by(() => {
	if (!live?.start) return 0;
	const liveStart = new Date(live.start);
	return Math.max(0, liveStart - now);
});
function formatCountdown(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
	const seconds = String(totalSeconds % 60).padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}
function extractYouTubeID(url) {
	const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
	const match = url.match(regExp);
	return match ? match[1] : '';
}
function extractVimeoID(url) {
	const regExp = /vimeo\.com\/(\d+)/;
	const match = url.match(regExp);
	return match ? match[1] : '';
}
</script>

<div id="live" class="rounded jost-15 bold" style="background-color:{live.bgColor.hex}">
	<div class="title-container">
		<h1 class="uppercase">{live.title}</h1>
		{#if live.subtitle}<h2>{live.subtitle}</h2>{/if}
	</div>
	<div class="live-container">
		{#if isPast(live.start)}
			{#if live.embed && live.embed.url}
				{#if live.embed.provider === 'YouTube'}
					<iframe
					width="560"
					height="315"
					src={`https://www.youtube.com/embed/${extractYouTubeID(live.embed.url)}`}
					title="YouTube video"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					></iframe>
				{:else if live.embed.provider === 'Vimeo'}
					<iframe
					src={`https://player.vimeo.com/video/${extractVimeoID(live.embed.url)}`}
					width="640"
					height="360"
					frameborder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowfullscreen
					></iframe>
				{:else if live.embed.provider === 'Facebook'}
					<iframe
					src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(live.embed.url)}&show_text=0&width=560`}
					width="560"
					height="315"
					style="border:none;overflow:hidden"
					scrolling="no"
					frameborder="0"
					allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
					allowfullscreen
					></iframe>
				{/if}
			{/if}
		{:else}
			<img src={urlFor(live.cover)} alt="">
			<button class="countdown btn bg-white">Live tra {formatCountdown(countdown)}</button>
		{/if}
	</div>
</div>

<style>
#live {
	width: 400px;
	height: auto;
	position: fixed;
	right: calc(var(--margin)/2);
	bottom: 2rem;
	color: var(--white);
}
.title-container {
	display: flex;
	gap: var(--margin);
}
.live-container {
	position: relative;
}
.countdown {
	width: 50%;
	background-color: var();
	white-space: pre;
	text-align: center;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
}
</style>