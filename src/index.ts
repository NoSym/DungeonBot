// Require the necessary discord.js classes
import { Intents } from 'discord.js'
import { CustomClient } from './classes/CustomClient'
import 'dotenv/config'

const ENV_TEST = 'test'
const ENV_PROD = 'prod'

const environment = process.argv.length > 2 ? process.argv[2] : ENV_TEST
const token = environment === ENV_PROD ? process.env.DISCORD_TOKEN : process.env.DISCORD_TOKEN_TEST

// Create a new client instance
const client = new CustomClient({ intents: [Intents.FLAGS.GUILDS] })

// Login to Discord with your client's token
client.login(token)