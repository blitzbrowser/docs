<script lang="ts">
	import browserUseTutorial from '$lib/data/languages/tutorials/browser-use.py.html?raw';
</script>

<svelte:head>
	<title>Crawl with Browser Use and Blitzbrowser | BlitzBrowser Docs</title>
</svelte:head>

<h1>Crawl with Browser Use and Blitzbrowser</h1>
<div class="flex flex-row items-center justify-center gap-6 rounded border p-4 text-4xl">
	<img class="h-18 border-0 bg-neutral-950 p-3" src="/browser-use.svg" />
	<span>+</span>
	<img class="h-18 border-0" src="/ollama-logo.webp" alt="Ollama logo" />
</div>
<p>
	In this tutorial, we will see how we can use
	<a href="https://browser-use.com" target="_blank">Browser Use</a> and BlitzBrowser as a AI browser
	agent.
</p>
<p>
	This stack is perfect when you want to automate repetitive work and not manage headless browsers.
	Use the power of AI to automate your browser tasks and our infrastructure to have an hassle free
	experience.
</p>
<h3>Requirements for this tutorial</h3>
<ul>
	<li>You need basic python knowledge.</li>
</ul>
<h2>Prepare your environment</h2>
<h3>Install Browser Use</h3>
<p>
	<a href="https://browser-use.com" target="_blank">Browser Use</a> is easy to install on your
	machine. You have to follow their
	<a href="https://docs.browser-use.com/quickstart" target="_blank">quickstart documentation</a> and
	you will be ready in few minutes.
</p>

<h2>Run your AI browser agent</h2>
<p>
	The following code example contains everything to run
	<a href="https://browser-use.com" target="_blank">Browser Use</a> and BlitzBrowser out-of-the-box.
	This example will go on <a href="https://blitzbrowser.com" target="_blank">BlitzBrowser</a> and find
	the pricing plans available. It will return the results in a JSON array.
</p>
<p>
	Here you will find <a href="/" target="_blank">how to get an access key</a>
	for free. Once you have an access key, you have to set the environment variable
	<code>BLITZBROWSER_ACCESS_KEY</code> to your key.
</p>
<p>
	In this example, we are using the GPT-4o model of OpenAI. You need to
	<a href="https://openai.com/index/hello-gpt-4o/" target="_blank">create an OpenAI account</a> to
	run the code. Once you have an OpenAI API key, you have to set the environment variable
	<code>OPENAI_SECRET_KEY</code>. If you want to use another LLM, you can follow their
	<a href="https://docs.browser-use.com/customize/supported-models" target="_blank">
		documentation here
	</a>.
</p>
<h3>Scrape pricing plans of BlitzBrowser example</h3>
<pre class="language-typescript overflow-hidden rounded">{@html browserUseTutorial}</pre>

<h2>Conclusion</h2>
<p>
	At this point, you should now be ready to automate any web task with <a
		href="https://browser-use.com/"
		target="_blank">Browser Use</a
	> and BlitzBrowser.
</p>
