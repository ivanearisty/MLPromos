from mlmodel.secret import secret

import asyncio
from twscrape import API, gather
from twscrape.logger import set_log_level

async def main():
    api = API()

    # add accounts
    await api.pool.add_account(secret.user1, secret.password1, secret.user1email, secret.password1email)

    await api.pool.login_all()

    doc = await gather(api.search("elon musk", limit=20))  # list[Tweet]



if __name__ == "__main__":
    asyncio.run(main())

