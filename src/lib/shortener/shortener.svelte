<script>
	let value = '';
</script>

<div class="flex items-center justify-center">
	<input
		class="text-sm w-full md:w-6/12 placeholder:text-slate-400 block bg-white border border-r-0 border-slate-100 rounded-l-lg py-3 px-2 pr-3 shadow-sm focus:outline-none"
		placeholder="https://yourdomain.com/very-long-link-bla-bla-bla"
		type="text"
		name="input-url"
		bind:value
	/>

	<button
		on:click={() => alert(value)}
		class="text-sm rounded-r-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border border-l-0 border-slate-100 py-3 px-2 text-white"
	>
		Save changes
	</button>
</div>
