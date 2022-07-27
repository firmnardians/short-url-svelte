<script lang="ts">
	export let name: string;
	export let width = 20;
	export let height = 20;

	let icons = [
		{
			box: 24,
			name: 'arrow-right',
			svg: `<path d="M5 12h13M12 5l7 7-7 7"/>`
		},
		{
			box: 24,
			name: 'arrow-bottom',
			svg: `<path d="M12 5v13M5 12l7 7 7-7"/>`
		}
	];

	let displayIcon = icons.find((e) => e.name === name);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	stroke="#000000"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={$$props.class}
	{width}
	{height}
	viewBox="0 0 {displayIcon?.box} {displayIcon?.box}">{@html displayIcon?.svg}</svg
>
