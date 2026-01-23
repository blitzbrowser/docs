# Crawl with Crawl4AI, Ollama and Blitzbrowser

In this tutorial, we will see how we can use [Crawl4AI](https://github.com/unclecode/crawl4ai), [Ollama](https://ollama.com/) and BlitzBrowser to crawl and extract data from unstructed websites.

This stack is perfect when you need to extract unstructured information from websites. [Crawl4AI](https://github.com/unclecode/crawl4ai) will manage your crawler orchestration, [Ollama](https://ollama.com/) will provide the LLM of your choice to format the unstructured data and BlitzBrowser will operate your browsers.

**Requirements for this tutorial**

- Basic python knowledge.

## Prepare your environment

### Install Crawl4AI

[Crawl4AI](https://github.com/unclecode/crawl4ai) has to be installed in your environment. You can find [how to install Crawl4AI](https://github.com/unclecode/crawl4ai?tab=readme-ov-file#-quick-start) on their GitHub.

### Install Ollama

If you have access to a remote Ollama instance, you can skip the local installation. Otherwise you have to [install it locally](https://ollama.com/download).

In this tutorial, we will use the Gemma 3 model. To run the model locally, you need to pull the image `ollama pull gemma3:latest` and then `ollama serve`.

## Run your web scraper

Now that your environment is ready, we will use our website [https://blitzbrowser.com/](https://blitzbrowser.com/) to find the pricing plans. The following code example contains everything to run Crawl4AI, Ollama and BlitzBrowser out-of-the-box.

The only configuration you need is an access key to connect to BlitzBrowser browsers. You can find how to get an [access key for free](/cloud/getting-started). Once you have an access key, you have to set the environment variable `ACCESS_KEY` to your key.

### Scrape pricing plans of BlitzBrowser

```python
import os
import asyncio

from typing import List
from crawl4ai import *
from pydantic import BaseModel

# Classes used as JSON schema to format the output of Gemma 3
class Pricing(BaseModel):
    name: str
    href: str

class PricingPlans(BaseModel):
    pricing_plans: List[Pricing]

# Browser config to use BlitzBrowser browsers with Chrome DevTools Protocol
browser_config = BrowserConfig(
    headless=False,
    verbose=True,
    browser_mode="cdp",
    cdp_url=f"wss://cdp.blitzbrowser.com?accessKey={os.environ.get('ACCESS_KEY')}",
)

# LLM strategy to format the data extracted
extraction_strategy = LLMExtractionStrategy(
    llm_config=LLMConfig(provider="ollama/gemma3:4b", base_url="http://localhost:11434"),
    extraction_type="schema",
    schema=PricingPlans.model_json_schema(),
    instruction="Extract all the pricing plans JSON array containing their 'name' and 'price'.",
    chunk_token_threshold=1200,
    overlap_rate=0.1,
    apply_chunking=True,
    input_format="markdown",
    verbose=True
)

# Config for crawler
crawl_config = CrawlerRunConfig(
    extraction_strategy=extraction_strategy,
    cache_mode=CacheMode.BYPASS
)

async def main():
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(url="https://blitzbrowser.com/", config=crawl_config)

        if result.success:
            print("Extracted content:", result.extracted_content)
        else:
            print("Error:", result.error_message)


if __name__ == "__main__":
    asyncio.run(main())
```

## Conclusion

At this point, you should now be ready to web scrape any websites you want with [Crawl4AI](https://github.com/unclecode/crawl4ai), [Ollama](https://ollama.com/) and BlitzBrowser.
