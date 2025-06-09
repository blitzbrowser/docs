<script lang="ts">
	import crawl4aiOllamaTutorial from '$lib/data/languages/tutorials/crawl4ai-ollama.py.html?raw';
</script>

<svelte:head>
	<title>Crawl with Crawl4AI, Ollama and Blitzbrowser | BlitzBrowser Docs</title>
</svelte:head>

<h1>Crawl with Crawl4AI, Ollama and Blitzbrowser</h1>
<div class="flex flex-row items-center justify-center gap-6 rounded border p-4 text-4xl">
	<span>Crawl4AI</span>
	<span>+</span>
	<img class="h-18 border-0" src="/ollama-logo.webp" alt="Ollama logo" />
</div>
<p>
	In this tutorial, we will see how we can use
	<a href="https://github.com/unclecode/crawl4ai" target="_blank">Crawl4AI</a>,
	<a href="https://ollama.com/" target="_blank">Ollama</a> and BlitzBrowser to crawl and extract data
	from unstructed websites.
</p>
<p>
	This stack is perfect when you need to extract unstructured information from websites. <a
		href="https://github.com/unclecode/crawl4ai"
		target="_blank">Crawl4AI</a
	>
	will manage your crawler orchestration, <a href="https://ollama.com/" target="_blank">Ollama</a> will
	provide the LLM of your choice to format the unstructured data and BlitzBrowser will operate your headless
	browsers.
</p>
<h3>Requirements for this tutorial</h3>
<ul>
	<li>You need basic python knowledge.</li>
</ul>
<h2>Prepare your environment</h2>
<h3>Install Crawl4AI</h3>
<p>
	<a href="https://github.com/unclecode/crawl4ai" target="_blank">Crawl4AI</a> has to be installed
	in your environment. You can find
	<a href="https://github.com/unclecode/crawl4ai?tab=readme-ov-file#-quick-start" target="_blank">
		how to install Crawl4AI
	</a> on their GitHub.
</p>
<h3>Install Ollama</h3>
<p>
	If you have access to a remote <a href="https://ollama.com/" target="_blank">Ollama</a> instance,
	you can skip the local installation. Otherwise you have to
	<a href="https://ollama.com/download" target="_blank">install it locally</a>.
</p>
<p>
	In this tutorial, we will use the <a href="https://ollama.com/library/gemma3" target="_blank">
		Gemma 3
	</a>
	model. To run the model locally, you need to pull the image <code>ollama pull gemma3:latest</code>
	and then <code>ollama serve</code>.
</p>

<h2>Run your web scraper</h2>
<p>
	Now that your environment is ready, we will use our website <a
		href="https://blitzbrowser.com/"
		target="_blank"
	>
		https://blitzbrowser.com/
	</a>
	to find the pricing plans. The following code example contains everything to run
	<a href="https://github.com/unclecode/crawl4ai" target="_blank">Crawl4AI</a>,
	<a href="https://ollama.com/" target="_blank">Ollama</a> and BlitzBrowser out-of-the-box.
</p>
<p>
	The only configuration you need is an access key to connect to BlitzBrowser headless browsers. You
	can find <a href="/" target="_blank">how to get an access key</a> for free. Once you have an access
	key, you have to set the environment variable <code>BLITZBROWSER_ACCESS_KEY</code> to your key.
</p>
<h3>Scrape pricing plans of BlitzBrowser example</h3>
<pre class="language-typescript overflow-hidden rounded">{@html crawl4aiOllamaTutorial}</pre>

<h2>Conclusion</h2>
<p>
	At this point, you should now be ready to web scrape any websites you want with <a
		href="https://github.com/unclecode/crawl4ai"
		target="_blank">Crawl4AI</a
	>,
	<a href="https://ollama.com/" target="_blank">Ollama</a> and BlitzBrowser.
</p>
