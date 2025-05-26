<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import typescriptPuppeteer from '$lib/data/languages/typescript-puppeteer.ts.html?raw';
</script>

<h1>Connect Puppeteer To BlitzBrowser</h1>
<p>
	To connect Puppeteer to BlitzBrowser, you have to change the method <code>
		puppeteer.launch()
	</code>
	to
	<code>puppeteer.connect({`{ ... }`})</code>.
</p>
<h2>Code Example</h2>
<p>
	In this example, we've replaced <code>puppeteer.launch()</code> with
	<code>puppeteer.connect({`{ ... }`})</code>. We've also introduced the
	<code>BLITZBROWSER_ACCESS_KEY</code> environment variable to avoid hardcoding your access key
	directly in the code. The <code>connect({`{ ... }`})</code> establishes a connection between your Puppeteer
	instance and BlitzBrowser via the Chrome DevTools Protocol (CDP). An headless browser will be assigned
	to your connection until the browser is closed.
</p>

<Tabs.Root value="TypeScript">
	<Tabs.List class="grid w-full grid-cols-1">
		<Tabs.Trigger value="TypeScript">
			<div class="flex flex-row items-center gap-2">
				<img
					class="w-4 border-0"
					src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
					alt="Typescript logo"
				/>
				<span>TypeScript</span>
			</div>
		</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="TypeScript">
		<pre class="language-typescript overflow-hidden rounded">{@html typescriptPuppeteer}</pre>
	</Tabs.Content>
</Tabs.Root>