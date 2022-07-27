<script lang="ts">
	export let handleClick: () => void;
	export let titleButton: string;
	export let disabled: boolean;
</script>

<button
	on:click={handleClick}
	{disabled}
	class="disabled:opacity-50 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-sm rounded-r-lg border border-l-0 border-slate-100 py-3 px-4 w-4/12 text-white"
>
	{titleButton}
</button>
