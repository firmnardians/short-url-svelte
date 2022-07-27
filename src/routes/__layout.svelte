<script>
	import '../assets/css/app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<p>
		Built by <a class="text-emerald-700" target="_blank" href="https://firmnardians.vercel.app/"
			>firmnardians</a
		>
		for everyone.
	</p>

	<p>
		Open Source:
		<a href="https://github.com/firmnardians/saiki-link" class="text-stone-700" target="_blank"
			>Github</a
		>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: 600;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
