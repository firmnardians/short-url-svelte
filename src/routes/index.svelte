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

<section>
	<div class="w-full h-screen flex items-center justify-center flex-col">
		{#if isAnimate}
			<h1 in:scale out:fade>Link Shortener</h1>
		{/if}

		{#if isAnimate}
			<p class="text-slate-600">Fast, simple and open source.</p>
		{/if}

		<div class="pt-5 w-full">
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
