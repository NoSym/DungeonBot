# Dungeon Bot

## Setup

- Run `npm install` from top level directory
- Create a .env file in top level directory and declare the following environment variables

```
ADMIN_USER_ID
DISCORD_CLIENT_ID
DISCORD_TOKEN
TEST_GUILD_ID
```

## Scripts

- `npm run deploy-test` deploys commands to the test guild
- `npm run deploy` deploys commands globally, which may take up to an hour to fully propagate
- `npm run start-test` starts the bot with logs printed to the console
- `npm run start` starts the bot with logs printed to the /logs directory