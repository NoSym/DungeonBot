const fs = require('node:fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv')

dotenv.config();

const commands = []
const commandFiles = fs.readdirSync(`${__dirname}/../prod/commands`).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`${__dirname}/../prod/commands/${file}`).default
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)

rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)