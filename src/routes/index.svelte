<script context="module">
	export const prerender = true;
</script>

<script>
	import Shortener from '$lib/shortener/shortener.svelte';
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isAnimate = false;

	onMount(() => {
		const animateTime = setTimeout(() => {
			isAnimate = true;
		}, 100);

		return () => clearTimeout(animateTime);
	});
</script>

<svelte:head>
	<title>Saiki Link</title>
	<meta name="description" content="Saiki Link - Link Shortener" />
</svelte:head>

<section>
	<div class="pt-20 w-full">
		{#if isAnimate}
			<h1 in:scale out:fade>Link Shortener</h1>
		{/if}

		<div class="pt-5">
			<Shortener />
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		font-weight: bold;
	}
</style>
