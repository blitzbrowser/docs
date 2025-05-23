<script>
	import '../app.css';
	import {
		PUBLIC_CLERK_ORIGIN,
		PUBLIC_UMAMI_ORIGIN,
		PUBLIC_UMAMI_WEBSITE_ID
	} from '$env/static/public';

	import { page } from '$app/state';

	let is_navbar_open = $state(false);
	let { children } = $props();

	let menus = [
		{
			label: 'Getting Started',
			links: [
				{
					label: 'Get Started With BlitzBrowser',
					slug: '/'
				},
				{
					label: 'Connect Puppeteer To BlitzBrowser',
					slug: '/connect-puppeteer-to-blitzbrowser'
				},
				{
					label: 'Connect Playwright To BlitzBrowser',
					slug: '/connect-playwright-to-blitzbrowser'
				}
			]
		}
	];
</script>

<svelte:head>
	<script
		defer
		src={`${PUBLIC_UMAMI_ORIGIN}/script.js`}
		data-website-id={PUBLIC_UMAMI_WEBSITE_ID}
	></script>
</svelte:head>

<div class="fixed z-10 w-screen border-b border-neutral-200 bg-white p-4 lg:p-8">
	<div class="container mx-auto flex flex-row items-center justify-between">
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
			class="cursor-pointer lg:hidden"
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
		<div class="hidden flex-1 flex-row justify-end gap-1 lg:flex">
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
		<div class="container mx-auto mt-4 flex flex-col">
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

<div class="container mx-auto">
	<div class="flex flex-row pb-12 pt-36">
		<div class="flex w-72 flex-none flex-col gap-10">
			{#each menus as menu}
				<div class="flex flex-col gap-2">
					<h2 class="text-lg font-semibold">{menu.label}</h2>
					<div class="flex flex-col border-l border-neutral-300 py-1">
						{#each menu.links as link}
							<a
								href={link.slug}
								class={`hover:underline ${page.url.pathname === link.slug ? 'text-yellow-500' : 'hover:text-yellow-500'} p-2`}
							>
								{link.label}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="min-h-[100dvh] w-full shrink border-l border-neutral-300 pl-8">
			{@render children()}
			<div class="content border-t pt-8">
				<h3 class="text-xl font-semibold">Contribute to the Docs</h3>
				<p>
					Found an issue or have an idea for an improvement? Our documentation is open source. Feel
					free to contribute directly on GitHub.
				</p>
				<a
					href="https://github.com/blitzbrowser/docs"
					target="_blank"
					class="flex flex-row items-center gap-2"
				>
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
						class="w-8 border-0"
						alt="GitHub logo"
					/>
					<span>GitHub Project</span>
				</a>
			</div>
		</div>
	</div>
</div>

<div class="bg-neutral-100">
	<div
		class="container mx-auto flex flex-col justify-between px-4 py-12 lg:flex-row lg:items-center lg:px-0 lg:py-20"
	>
		<div class="flex flex-col gap-3 pb-4 lg:pb-0">
			<a
				data-umami-event="footer-logo"
				href="https://blitzbrowser.com"
				class="flex flex-row items-center gap-1"
			>
				<img class="h-8" src="/logo-color.svg" />
				<span class="text-3xl font-extrabold">BlitzBrowser</span>
			</a>
		</div>
		<div class="flex flex-col gap-1 lg:gap-2">
			<a data-umami-event="footer-use-cases" href="https://blitzbrowser.com/#use-cases">
				Use Cases
			</a>
			<a data-umami-event="footer-how-to-use" href="https://blitzbrowser.com/#how-to-use">
				How To Use
			</a>
			<a data-umami-event="footer-pricing" href="https://blitzbrowser.com/#pricing">Pricing</a>
		</div>
		<div class="flex flex-col gap-1 lg:gap-2">
			<a data-umami-event="footer-dev-docs" href="/"> Developer Docs </a>
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
