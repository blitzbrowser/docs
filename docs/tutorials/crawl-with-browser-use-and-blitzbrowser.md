# Crawl with Browser Use and Blitzbrowser

In this tutorial, we will see how we can use [Browser Use](https://browser-use.com/) and BlitzBrowser as a AI browser agent.

This stack is perfect when you want to automate repetitive work and not manage multiple browsers. Use the power of AI to automate your browser tasks.

## Requirements for this tutorial

- Python installed.
- An [OpenAI account](https://openai.com/index/hello-gpt-4o/).
- [BlitzBrowser](/getting-started#docker) installed with the dashboard.

## Prepare your environment

Create a new directory named `blitzbrowser-browser-user` where you will run this tutorial.

[Browser Use](https://browser-use.com/) is easy to install on your machine. You have to follow their [quickstart documentation](https://docs.browser-use.com/quickstart) and you will be ready in few minutes.

If you don't have an account, you need to [create an OpenAI account](https://openai.com/index/hello-gpt-4o/) to run the code. Once you have an OpenAI API key, you have to set the environment variable `OPENAI_SECRET_KEY`. If you want to use another LLM, you can follow Browser Use [documentation here](https://docs.browser-use.com/customize/supported-models).

Create the `main.py` file and run the insert the following code.

```python
from langchain_openai import ChatOpenAI
from browser_use import BrowserSession, Agent
import os
import asyncio

# Browser config to use BlitzBrowser browsers
browser_session = BrowserSession(cdp_url=f"ws://localhost:9999")

async def main():
    agent = Agent(
        task="Go to https://docs.blitzbrowser.com, find their documentation and create a summary of each doc into a JSON array. Once the JSON list extracted you can stop your task.",
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

## Run your AI browser agent

This example contains everything to run [Browser Use](https://browser-use.com/) and BlitzBrowser out-of-the-box. This example will go on [docs.blitzBrowser.com](https://blitzbrowser.com/), find all the documentation and return the results in a JSON array.

## Conclusion

You are now be ready to automate any web task with [Browser Use](https://browser-use.com/) and BlitzBrowser.
