# Crawl with Browser Use and Blitzbrowser

In this tutorial, we will see how we can use [Browser Use](https://browser-use.com/) and BlitzBrowser as a AI browser agent.

This stack is perfect when you want to automate repetitive work and not manage multiple browsers. Use the power of AI to automate your browser tasks and our infrastructure to have an hassle free experience.

**Requirements for this tutorial**

- Basic python knowledge.

## Prepare your environment

### Install Browser Use

[Browser Use](https://browser-use.com/) is easy to install on your machine. You have to follow their [quickstart documentation](https://docs.browser-use.com/quickstart) and you will be ready in few minutes.

## Run your AI browser agent

The following code example contains everything to run [Browser Use](https://browser-use.com/) and BlitzBrowser out-of-the-box. This example will go on [BlitzBrowser.com](https://blitzbrowser.com/) and find the pricing plans available. It will return the results in a JSON array.

Here you will find how to get an [access key for free](/cloud/getting-started). Once you have an access key, you have to set the environment variable `ACCESS_KEY` to your key.

In this example, we are using the GPT-4o model of OpenAI. You need to [create an OpenAI account](https://openai.com/index/hello-gpt-4o/) to run the code. Once you have an OpenAI API key, you have to set the environment variable `OPENAI_SECRET_KEY`. If you want to use another LLM, you can follow their [documentation here](https://docs.browser-use.com/customize/supported-models).

### Scrape pricing plans of BlitzBrowser

```python
from langchain_openai import ChatOpenAI
from browser_use import BrowserSession, Agent
import os
import asyncio

# Browser config to use BlitzBrowser browsers
browser_session = BrowserSession(cdp_url=f"wss://cdp.blitzbrowser.com?accessKey={os.environ.get('ACCESS_KEY')}")

async def main():
    agent = Agent(
        task="Go to BlitzBrowser.com, find their pricing section and extract all of the plans in a JSON list. Once the JSON list extracted, you can stop your task.",
        # LLM config to connect to OpenAI
        llm=ChatOpenAI(
            model="gpt-4o",
            api_key=os.environ.get('OPENAI_SECRET_KEY')
        ),
        browser_session=browser_session
    )
    result = await agent.run()
    print(result.extracted_content())

asyncio.run(main())
```

## Conclusion

At this point, you should now be ready to automate any web task with [Browser Use](https://browser-use.com/) and BlitzBrowser.
