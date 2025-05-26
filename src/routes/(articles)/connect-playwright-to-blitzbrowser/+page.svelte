<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import typescriptPlaywright from '$lib/data/languages/typescript-playwright.ts.html?raw';
	import javaPlaywright from '$lib/data/languages/java-playwright.java.html?raw';
	import pythonPlaywright from '$lib/data/languages/python-playwright.py.html?raw';
</script>

<h1>Connect Playwright To BlitzBrowser</h1>
<p>
	To connect Playwright to BlitzBrowser, you have to change the method <code> launch() </code>
	to
	<code>connectOverCDP(`...`)</code>.
</p>
<h2>Code Example</h2>
<p>
	In this example, we've replaced <code>launch()</code> with
	<code>connectOverCDP(`...`)</code>. We've also introduced the
	<code>BLITZBROWSER_ACCESS_KEY</code> environment variable to avoid hardcoding your access key
	directly in the code. The <code>connectOverCDP(`...`)</code> establishes a connection between your
	Playwright instance and BlitzBrowser via the Chrome DevTools Protocol (CDP). An headless browser will
	be assigned to your connection until the browser is closed.
</p>
<Tabs.Root value="TypeScript">
	<Tabs.List class="grid w-full grid-cols-3">
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
		<Tabs.Trigger value="Python">
			<div class="flex flex-row items-center gap-2">
				<img
					class="w-4 border-0"
					src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
					alt="Python logo"
				/>
				<span>Python</span>
			</div>
		</Tabs.Trigger>
		<Tabs.Trigger value="Java">
			<div class="flex flex-row items-center gap-2">
				<img
					class="w-4 border-0"
					src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
					alt="Java logo"
				/>
				<span>Java</span>
			</div>
		</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="TypeScript">
		<pre class="language-typescript overflow-hidden rounded">{@html typescriptPlaywright}</pre>
	</Tabs.Content>
	<Tabs.Content value="Python">
		<pre class="language-python overflow-hidden rounded">{@html pythonPlaywright}</pre>
	</Tabs.Content>
	<Tabs.Content value="Java">
		<pre class="language-java overflow-hidden rounded">{@html javaPlaywright}</pre>
	</Tabs.Content>
</Tabs.Root>
