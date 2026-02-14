# Crawl with Crawl4AI, Ollama and Blitzbrowser

<video width="100%" controls src="/videos/blitzbrowser-crawl4ai.mp4"></video>

In this tutorial, we will see how we can use [Crawl4AI](https://github.com/unclecode/crawl4ai), [Ollama](https://ollama.com/) and BlitzBrowser to crawl and extract data from any websites.

This stack will allow you to do web scraping from any websites while running everything locally. [Crawl4AI](https://github.com/unclecode/crawl4ai) will manage your crawler orchestration, [Ollama](https://ollama.com/) will provide the LLM of your choice to extract data and BlitzBrowser will run your browsers.

## Requirements for this tutorial

- Python installed.
- [UV](https://github.com/astral-sh/uv) to create your virtual python environment.
- [Ollama](https://ollama.com/) installed with `ollama/gemma3:4b`.
- [BlitzBrowser](/self-hosted/features/dashboard) installed with the dashboard.

## Prepare your environment

Create a new directory named `blitzbrowser-crawl4ai` where you will run the following commands.

```sh
uv init
```

```sh
uv add crawl4ai
```

```sh
uv add pydantic
```

Open the file `main.py` and replace its content by the python code below.

```python
import asyncio
import json

from typing import List
from crawl4ai import *
from crawl4ai.deep_crawling import BFSDeepCrawlStrategy
from crawl4ai.deep_crawling.filters import FilterChain, URLPatternFilter
from pydantic import BaseModel, Field


class Page(BaseModel):
    url: str = Field(description="URL of the page.")
    title: str = Field(description="Title of the page.")
    summary: str = Field(description="Summary of the page content.")


class PageList(BaseModel):
    pages: List[Page]


# Browser config to use BlitzBrowser browsers with Chrome DevTools Protocol
browser_config = BrowserConfig(
    headless=False,
    verbose=True,
    browser_mode="cdp",
    cdp_url=f"ws://localhost:9999?liveView=true",
)

# Crawl strategy.
deep_crawl_strategy = BFSDeepCrawlStrategy(
    max_depth=3,             # How many "clicks" away from the home page to go
    include_external=False,  # Stay on the same domain
    max_pages=10,            # Safety cap to prevent infinite crawling
    filter_chain=FilterChain([URLPatternFilter(patterns=["*docs.blitzbrowser.com*"])])
)

# LLM strategy to format the data extracted
extraction_strategy = LLMExtractionStrategy(
    llm_config=LLMConfig(provider="ollama/gemma3:4b",
                         base_url="http://localhost:11434"),
    schema=PageList.model_json_schema(),
    extraction_type="schema",
    instruction="Find all the pages and extract their URL, title and create a summary of the page content.",
    chunk_token_threshold=500,
    apply_chunking=True,
    input_format="markdown"
)

# Config for crawler
crawl_config = CrawlerRunConfig(
    extraction_strategy=extraction_strategy,
    deep_crawl_strategy=deep_crawl_strategy,
    cache_mode=CacheMode.BYPASS
)


async def main():
    async with AsyncWebCrawler(config=browser_config) as crawler:
        results = await crawler.arun(url="https://docs.blitzbrowser.com", config=crawl_config)
        pages: List[Page] = []

        for result in results:
            if result.success:                
                pages.extend(json.loads(result.extracted_content))

        print(json.dumps(pages, indent=4))


if __name__ == "__main__":
    asyncio.run(main())
```

## Run the local web scraper

Now that your environment is ready, you are ready to crawl. The python code you copied will start Crawl4AI with Ollama and BlitzBrowser. Crawl4AI will crawl the documentation [https://docs.blitzbrowser.com/](https://docs.blitzbrowser.com/) and create a summary of each page it will find. The summary will be done with Ollama and Gemma. To navigate on the website, Crawl4AI will connect through the Chrome DevTools Protocol to BlitzBrowser.

Start the crawler with the following command.

```sh
uv run main.py
```

The expected output should be a JSON array of all the pages found.

```json
[
    // ...
    {
        "url": "https://docs.blitzbrowser.com/cloud/api/upload-user-data",
        "title": "Upload user data",
        "summary": "This page describes the API endpoint for uploading user data. It provides information about the POST request method and the expected response codes and schema.",
        "error": false
    },
    {
        "url": "https://docs.blitzbrowser.com/cloud/api/delete-user-data",
        "title": "Delete user data",
        "summary": "This page describes the API endpoint for deleting user data. It provides information about the DELETE request method and the expected response codes and schema.",
        "error": false
    },
    {
        "url": "https://docs.blitzbrowser.com/cloud/proxy",
        "title": "Proxy",
        "summary": "This page describes the API endpoint for proxy functionality.",
        "error": false
    },
    // ...
]
```

## Conclusion

You are now ready to run and scale your local web scraper to any websites.

Happy web scraping! 🎉
