<script lang="ts">
	import { disabledSaikiDomain, generateRandomString, urlValidation } from '../../helper/index';
	import Button from '../../components/button/index.svelte';
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Icon from '../../assets/svg/icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import ClipboardJS from 'clipboard';
	import { createShortUrl } from '../../repository';

	let value: string = '';
	let url: string = '';
	let shortUrl: string = '';

	let isShortUrlSuccess: boolean = false;
	let isUrlValid: boolean = true;
	let isHoverSVG: boolean = false;
	let isCopiedSuccess: boolean = false;
	let isServerError: boolean = false;
	let isDomainInvalid: boolean = false;

	function handleSubmit() {
		isShortUrlSuccess = false;
		isUrlValid = true;
		isServerError = false;
		isDomainInvalid = false;

		const isValid = urlValidation.test(value);

		if (isValid) {
			const checkDomain = disabledSaikiDomain({ url: value });
			if (checkDomain === 'saiki.link') {
				isDomainInvalid = true;
			} else {
				url = value;
				const x = generateRandomString();
				shortUrl = `saiki.link/${x}`;

				createShortUrl({ shortString: x, originalUrl: value })
					.then(() => {
						value = '';
						isShortUrlSuccess = true;
					})
					.catch((err) => {
						if (err) {
							isShortUrlSuccess = false;
							isServerError = true;
						}
					});
			}
		} else {
			isUrlValid = false;
		}
	}

	function handleMouseOver() {
		isHoverSVG = true;
	}

	function handleMouseOut() {
		isHoverSVG = false;
	}

	function handleCopyLink() {
		let clipboard = new ClipboardJS('#btn-copy');
		clipboard.on('success', function (e) {
			e.clearSelection();
		});

		isCopiedSuccess = true;
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

	<div class="mt-2">
		{#if !isUrlValid}
			<small class="text-rose-500">Unable to shorten that link. It is not a valid url.</small>
		{/if}

		{#if isServerError}
			<small class="text-rose-500"
				>Sorry, server error and was unable to complete your request.</small
			>
		{/if}

		{#if isDomainInvalid}
			<small class="text-rose-500">Sorry, the saiki.link domain cannot be used.</small>
		{/if}
	</div>
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

	<div class="mt-2">
		<div class="flex align-center justify-end">
			<button
				on:click={handleCopyLink}
				on:mouseover={handleMouseOver}
				on:focus={handleMouseOver}
				on:mouseout={handleMouseOut}
				on:blur={handleMouseOut}
				id="btn-copy"
				data-clipboard-text={shortUrl}
				class="bg-white-600 hover:bg-emerald-700 active:bg-white-800 text-sm rounded-lg border-2 border-emerald-700 py-3 px-4 w-full md:w-4/12 text-emerald-700 hover:text-white"
			>
				<span class="relative">
					<span class="absolute right-1.5">
						<Icon name="link" color={isHoverSVG ? '#ffffff' : 'rgb(21 128 61)'} />
					</span>
				</span>

				{isCopiedSuccess ? 'Copied' : 'Copy Link'}
			</button>
		</div>

		{#if isCopiedSuccess}
			<div
				in:fly={{ y: 50, duration: 2000 }}
				out:fade
				class="flex align-center justify-start md:justify-end mt-2"
			>
				<p class="text-emerald-800">Copied Successfully</p>
			</div>
		{/if}
	</div>
{/if}
