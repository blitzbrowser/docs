<script>
	import {
		PUBLIC_CLERK_ORIGIN,
		PUBLIC_UMAMI_ORIGIN,
		PUBLIC_UMAMI_WEBSITE_ID
	} from '$env/static/public';
	import '../app.css';

	let is_navbar_open = $state(false);
	let { children } = $props();
</script>

<svelte:head>
	<script
		defer
		src={`${PUBLIC_UMAMI_ORIGIN}/script.js`}
		data-website-id={PUBLIC_UMAMI_WEBSITE_ID}
	></script>
</svelte:head>

<div class="fixed w-screen border-b border-neutral-200 p-4 lg:p-8 bg-white z-10">
	<div class="flex flex-row justify-between items-center container mx-auto">
		<div class="lg:flex-1">
			<a
				onclick={() => (is_navbar_open = false)}
				data-umami-event="navbar-logo"
				href="/"
				class="flex flex-row items-center gap-1"
			>
				<img alt="BlitzBrowser logo" class="h-8" src="/logo-color.svg" />
				<span class="text-3xl font-extrabold">BlitzBrowser | Docs</span>
			</a>
		</div>
		<button
			onclick={() => (is_navbar_open = !is_navbar_open)}
			data-umami-event="navbar-hamburger"
			class="lg:hidden cursor-pointer"
		>
			{#if !is_navbar_open}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M18 6 6 18" /><path d="m6 6 12 12" />
				</svg>
			{/if}
		</button>
		<div class="hidden lg:flex flex-1 flex-row justify-end gap-1">
			<a
				data-umami-event="navbar-sign-in"
				href={`${PUBLIC_CLERK_ORIGIN}/sign-in`}
				class="btn-primary-outline"
			>
				Sign In
			</a>
			<a
				data-umami-event="navbar-register"
				href={`${PUBLIC_CLERK_ORIGIN}/sign-up`}
				class="btn-primary"
			>
				Register
			</a>
		</div>
	</div>
	{#if is_navbar_open}
		<div class="flex flex-col container mx-auto mt-4">
			<div class="grid grid-cols-2 gap-3">
				<a
					data-umami-event="navbar-sign-in"
					href={`${PUBLIC_CLERK_ORIGIN}/sign-in`}
					class="btn-primary-outline text-center"
				>
					Sign In
				</a>
				<a
					data-umami-event="navbar-register"
					href={`${PUBLIC_CLERK_ORIGIN}/sign-up`}
					class="btn-primary text-center"
				>
					Register
				</a>
			</div>
		</div>
	{/if}
</div>

<div class="min-h-[100dvh] container mx-auto">
	<div class="pt-36 flex flex-row gap-12">
		<div class="flex-none w-48 border-r border-neutral-300 flex flex-col gap-10">
			<div class="flex flex-col gap-2">
				<h2 class="font-semibold text-lg">Getting Started</h2>
				<div class="flex flex-col border-l border-neutral-300 py-1">
					<a href="#" class="hover:underline hover:text-yellow-500 p-2">How to use Crawl4AI</a>
					<a href="#" class="hover:underline hover:text-yellow-500 p-2">How to use Puppeteer</a>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<h2 class="font-semibold text-lg">Tutorials</h2>
				<div class="flex flex-col border-l border-neutral-300 py-1">
					<a href="#" class="hover:underline hover:text-yellow-500 p-2">How to use Playwright</a>
					<a href="#" class="hover:underline hover:text-yellow-500 p-2">How to use Crawl4AI</a>
				</div>
			</div>
		</div>
		<div class="shrink">
			{@render children()}
		</div>
	</div>
</div>

<div class="bg-neutral-100">
	<div
		class="py-12 lg:py-20 px-4 lg:px-0 container mx-auto flex flex-col lg:flex-row lg:items-center justify-between"
	>
		<div class="flex flex-col gap-3 pb-4 lg:pb-0">
			<a data-umami-event="footer-logo" href="/" class="flex flex-row items-center gap-1">
				<img class="h-8" src="/logo-color.svg" />
				<span class="text-3xl font-extrabold">BlitzBrowser | Docs</span>
			</a>
		</div>
		<div class="flex flex-col gap-1 lg:gap-2">
			<a
				data-umami-event="footer-terms-of-service"
				href="https://blitzbrowser.com/terms-of-service"
			>
				Terms of Service
			</a>
			<a data-umami-event="footer-privacy-policy" href="https://blitzbrowser.com/privacy-policy">
				Privacy Policy
			</a>
		</div>
		<div class="pt-4 lg:pt-0">
			<p class="font-semibold">Contact Us</p>
			<a
				data-umami-event="footer-contact-us"
				href="mailto:support@blitzbrowser.com"
				class="text-sm"
			>
				support@blitzbrowser.com
			</a>
		</div>
	</div>
</div>
