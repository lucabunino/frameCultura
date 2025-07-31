<script>
// Imports
import "../app.css";
import { dev } from '$app/environment';
import { page } from '$app/stores';
import { urlFor } from '$lib/utils/image';

// Variables
let { data, children } = $props();
$inspect(data)
let mouse = $state([])
let domLoaded = $state(false)
let innerWidth = $state(undefined)
let innerHeight = $state(undefined)
let scrollY = $state(0)
let menuUp = $state(false)
let menuOpen = $state(false)
let showBanner = $state(true)
let cookieAccepted = $state(false)

// Lifecycle
$effect(() => {

})

// Functions
function handleMousemove(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  showBanner = false;
  cookieAccepted = true;
}
function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  showBanner = false;
  cookieAccepted = false;
}
let lastScrollY = 0;
function handleScroll(e) {
	if (scrollY > lastScrollY && scrollY > 50) {
		menuUp = true
	} else {
		menuUp = false
	}
	lastScrollY = scrollY
}

// Dev
let viewGrid = $state(false)
const gridColumnsDesktop = 10
const gridColumnsMobile = 8
function handleKey({key}) {if (key === 'G' && dev) {viewGrid = !viewGrid}}
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY={scrollY} onkeyup={handleKey} onmousemove={handleMousemove} onscroll={(e) => handleScroll(e)}></svelte:window>

{#if viewGrid}
<div id="layout"
			style="grid-template-columns:repeat({innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile}, 1fr);pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;width: -moz-available;width: fill-available;height: -moz-available;height: -webkit-fill-available;margin:0 var(--margin);gap:var(--gutter);opacity:.2;">
	{#each Array(innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile) as _, i}
		<div style="background-color:red"></div>
	{/each}
</div>
{/if}



<svelte:head>
	{#if data.seo.SEOTitle}<title>{data.seo.SEOTitle}</title>{/if}
	{#if data.seo.SEODescription}<meta name="description" content={data.seo.SEODescription}>{/if}
	<link rel="canonical" href={$page.url}>
	<meta name="robots" content="index,follow">
	<meta name="googlebot" content="index,follow">
	{#if data.seo.SEOTitle}<meta property="og:title" content={data.seo.SEOTitle}>{/if}
	{#if data.seo.SEODescription}<meta property="og:description" content={data.seo.SEODescription}>{/if}
	{#if data.seo.SEOImage}<meta property="og:image" content={urlFor(data.seo.SEOImage).width(2000).url()}>{/if}
	<meta property="og:url" content={$page.url}>
	<meta property="og:type" content="website">
	{#if data.seo.SEOTitle}<meta property="og:site_name" content={data.seo.SEOTitle}>{/if}
</svelte:head>

<header>
	<!-- Menu -->
	<nav aria-label="menu" class="menu" class:open={menuOpen} class:up={menuUp}>
		{#if data.info.logo}
			<a class="logo" href="/" class:active={$page.url.pathname === "/"}>
				<img src={urlFor(data.info.logo)} alt="">
			</a>
		{/if}
		<ul class="jost-74">
			<li class="menu-item" class:active={$page.url.pathname === "/esplora" || $page.url.pathname.includes("/esplora/")}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/esplora">Esplora</a>
			</li>
			<li class="menu-item" class:active={$page.url.pathname === "/autori" || $page.url.pathname.includes("/autori/")}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/autori">Autori</a>
			</li>
			<li class="menu-item" class:active={$page.url.pathname === "/live" || $page.url.pathname.includes("/live/")}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/live">Live</a>
			</li>
			<li class="menu-item" class:active={$page.url.pathname === "/about"}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/about">About</a>
			</li>
			<li class="menu-item" class:active={$page.url.pathname === "/network"}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/network">Network</a>
			</li>
			<li class="menu-item" class:active={$page.url.pathname === "/contatti"}
			onclick={() => {menuOpen = false, menuUp = false}}>
				<a href="/contatti">Contatti</a>
			</li>
		</ul>
		<button id="menuSwitch" onclick={(e) => {menuOpen = !menuOpen, menuUp = false}}>
			{#if !menuOpen}Menu{:else}Chiudi{/if}
		</button>
	</nav>
</header>

<!-- Main -->
{#key data.pathname + cookieAccepted}
	<main class:marginTop={!$page.url.pathname.includes("/esplora/")}>
		{@render children()}
	</main>
{/key}


<div class="pre-footer">
	<input class="jost-54 footer-search" type="text" placeholder="Cerca nel sito (non funziona)" >
	{#if data.info.footerPattern}<div class="footer-pattern" style={`background-image: url(${urlFor(data.info.footerPattern)})`}></div>{/if}
</div>
<footer style={data.info.footerPattern ? `border-top:${urlFor(data.info.footerPattern)}` : ``}>
	<div>
		{#if data.info.ragioneSociale}<p>{data.info.ragioneSociale}</p>{/if}
		{#if data.info.adressLabel}
			{#if data.info.adressGoogleMaps}
				<a href={data.info.adressGoogleMaps} target="_blank" rel="noopener noreferrer">{data.info.adressLabel}</a>
			{:else}
				<p>{data.info.adressLabel}</p>
			{/if}
		{/if}
	</div>
	<div>
		{#if data.info.email}<a href="mailto:{data.info.email}">{data.info.email}</a>{/if}
		{#if data.info.socials}
			<div class="socials">
				{#each data.info.socials as social}
					<a href={social.link} target="_blank" rel="noopener noreferrer"><img class="social" src={urlFor(social.icon)} alt=""></a>
				{/each}
			</div>
		{/if}
	</div>
	<nav>
		<ul>
			<li class="footer-item" class:active={$page.url.pathname === "/esplora" || $page.url.pathname.includes("/esplora/")}>
				<a href="/esplora">Esplora</a>
			</li>
			<li class="footer-item" class:active={$page.url.pathname === "/autori" || $page.url.pathname.includes("/autori/")}>
				<a href="/autori">Autori</a>
			</li>
			<li class="footer-item" class:active={$page.url.pathname === "/live" || $page.url.pathname.includes("/live/")}>
				<a href="/live">Live</a>
			</li>
			<li class="footer-item" class:active={$page.url.pathname === "/about"}>
				<a href="/about">About</a>
			</li>
			<li class="footer-item" class:active={$page.url.pathname === "/network"}>
				<a href="/network">Network</a>
			</li>
			<li class="footer-item" class:active={$page.url.pathname === "/contatti"}>
				<a href="/contatti">Contatti</a>
			</li>
		</ul>
	</nav>
	<div>
		<h5>Newsletter</h5>
		{#if data.info.newsletter}<p class="jost-18">{data.info.newsletter}</p>{/if}
		<a class="btn" href="http://" target="_blank" rel="noopener noreferrer">Iscriviti</a>
	</div>
	<div class="jost-15">
		<div>
			<p>©{new Date().getFullYear()} {#if data.info.ragioneSociale}{data.info.ragioneSociale}{/if}</p>
			{#if data.info.pIva || data.info.ccia}
				<p>{#if data.info.pIva}P.IVA {data.info.pIva}{/if}</p>
			{/if}
			{#if data.policies}
				{#each data.policies as policy}
					<a href="/{policy.kind}">{policy.kind.charAt(0).toUpperCase() + policy.kind.slice(1)}</a>
				{/each}
			{/if}
		</div>
		<p>Design e sviluppo: <a class="underline" href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
	</div>
</footer>

<!-- {#if showBanner}
	<div>
		<p>Questo sito utilizza servizi di terze parti come Vimeo e Mapbox che possono impostare cookie. Avviando la riproduzione di un video o accettando questa policy, consenti l’uso dei relativi cookie.{#each data.policies as policy}{#if policy.kind == 'cookies'}{@html ' '}Per saperne di più, consulta la nostra <a href="/cookies" class="underline">cookie policy</a>{/if}{/each}
		<div id="cookie-btns">
			<button id="accept-cookies" onclick={acceptCookies} class="btn ronzino-12 uppercase">Accetta</button>
			<button id="reject-cookies" onclick={rejectCookies} class="btn ronzino-12 uppercase">Rifiuta</button>
		</div>
	</div>
{/if} -->

<style>
.menu {
	background: var(--white);
	display: flex;
	justify-content: space-between;
	padding: var(--margin);
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
	transition: var(--transition);
}
.menu.up:not(.open) {
	transform: translateY(-100%);
}
.menu ul {
	position: absolute;
	left: 0;
	background-color: var(--white);
	width: 100vw;
	height: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	line-height: 1;
	overflow: hidden;
	padding: 0;
}
.menu.open ul {
	height: 100vh;
	padding: calc(var(--margin)*2 + 4rem) var(--margin) var(--margin);
}
.logo {
	z-index: 2;
}
.logo img {
	height: 4rem;
}
#menuSwitch {
	top: var(--margin);
	right: var(--margin);
	z-index: 2;
}

/* Main */
main.marginTop {
	margin-top: calc(var(--margin)*2 + 4rem);
}

/* Pre-footer */
.pre-footer {
	margin-top: 20rem;
}
.footer-search {
	width: -webkit-fill-available;
	width: fill-available;
	margin: 2rem var(--margin);
	padding-bottom: 1rem;
	border: none;
	border-bottom: solid 1px;
}
.footer-pattern {
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* Footer */
footer {
	background-color: var(--black);
	color: var(--white);
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	gap: var(--gutter);
	padding: var(--margin);
}
footer > :nth-child(1) {grid-column: 1 / span 2;}
footer > :nth-child(2) {grid-column: 3 / span 2;}
footer .socials {
	display: flex;
	gap: .5rem;
	margin-top: 2rem;
}
footer .social {
	height: 2rem;
	width: auto;
}
footer > :nth-child(3) {grid-column: 5 / span 2;}
footer nav ul {
	padding: 0;
	list-style: none;
}
footer > :nth-child(4) {grid-column: 7 / span 4;}
footer > :nth-child(4) p {
	margin: 2rem 0;
	max-width: 600px;
}
footer > :nth-child(5) {
	grid-column: 1 / span 10;
	display: flex;
	justify-content: space-between;
	margin-top: 6rem;
}
footer > :nth-child(5) div {
	display: flex;
	gap: var(--margin);
}
</style>