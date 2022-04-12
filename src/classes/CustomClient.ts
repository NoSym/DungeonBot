import { Client, ClientOptions, Collection } from 'discord.js'
import fs from 'node:fs'
import { CustomCommand } from '../types/CustomCommand'
import { DiscordEvent } from '../types/DiscordEvent'

export class CustomClient extends Client {
    commands: Collection<string, CustomCommand>

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.handleEvents
        this.loadCommands()
    }

    private handleEvents() {
        const eventFiles = fs.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.js'))

        for (const file of eventFiles) {
            const event: DiscordEvent = require(`${__dirname}/../events/${file}`).default

            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args))
            }
            else {
                this.on(event.name, (...args) => event.execute(...args))
            }
        }        
    }

    private loadCommands() {
        const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.js'))

        for (const file of commandFiles) {
            const command: CustomCommand = require(`${__dirname}/../commands/${file}`).default

            this.commands.set(command.data.name, command)
        }
    }
}