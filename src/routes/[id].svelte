<script lang="ts">
	import { page } from '$app/stores';
	import { getShortUrl } from '../repository';
	import { onMount } from 'svelte';

	const getId = $page.params.id;

	let response: any = null;

	onMount(() => {
		response = null;
		getShortUrl({ shortString: getId })
			.then((res) => {
				response = true;

				const tempDoc = res.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});

				// @ts-ignore
				window.location.href = tempDoc.length > 0 ? tempDoc[0]?.original_url : 'https://link.1998s.dev';
			})
			.catch((err) => {
				if (err) {
					response = false;

					window.location.href = 'https://link.1998s.dev';
				}
			});
	});
</script>

<svelte:head>
	<title>Redirect URL - Saiki Link</title>
</svelte:head>

<div class="h-screen flex items-center justify-center">
	{#if response === null}
		<p>Wait a response...</p>
	{:else if response}
		<p>Redirect...</p>
	{:else}
		<p>Not Found</p>
	{/if}
</div>
