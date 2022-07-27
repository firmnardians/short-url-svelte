<script lang="ts">
	import { generateRandomString, urlValidation } from '../../helper/index';
	import Button from '../../components/button/index.svelte';
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Icon from '../../assets/svg/icon.svelte';

	// string
	let value: string = '';
	let url: String = '';
	let shortUrl: String = '';

	// boolean
	let isShortUrlSuccess: Boolean = false;
	let isUrlValid: Boolean = true;

	function handleSubmit() {
		const isValid = urlValidation.test(value);
		isShortUrlSuccess = false;
		isUrlValid = true;

		if (isValid) {
			url = value;
			value = '';
			const x = generateRandomString();
			shortUrl = `saiki.link/${x}`;
			isShortUrlSuccess = true;
		} else {
			isUrlValid = false;
		}
	}
</script>

<div class="w-full md:w-8/12 lg:w-6/12 m-auto">
	<div class="flex items-center justify-center">
		<input
			class="text-sm w-8/12 placeholder:text-slate-400 block bg-white border border-r-0 border-slate-100 rounded-l-lg py-3 px-2 pr-3 shadow-sm focus:outline-none"
			placeholder="https://yourdomain.com/very-long-link-bla-bla-bla"
			type="url"
			name="input-url"
			bind:value
		/>

		<Button
			disabled={value.length === 0}
			titleButton="Short it"
			handleClick={() => handleSubmit()}
		/>
	</div>

	{#if !isUrlValid}
		<div class="mt-2">
			<small class="text-rose-500">Unable to shorten that link. It is not a valid url.</small>
		</div>
	{/if}
</div>

{#if isShortUrlSuccess}
	<div class="mt-4" transition:scale={{ delay: 50, duration: 500, easing: quintOut }}>
		<div class="shadow-md rounded-lg border border-slate-100">
			<div class="p-5 bg-white rounded-lg">
				<div class="block md:flex flex-row justify-between items-center">
					<div class="basis-8/12 flex items-center justify-center md:justify-start">
						<h5 class="break-words text-center text-slate-600">{url}</h5>
					</div>

					<div class="basis-1/12 flex items-center justify-center md:justify-start">
						<span class="hidden md:block">
							<Icon name="arrow-right" />
						</span>

						<span class="block md:hidden py-4">
							<Icon name="arrow-bottom" />
						</span>
					</div>

					<div class="basis-3/12 flex items-center justify-center md:justify-start">
						<h5 class="break-words text-center">{shortUrl}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
