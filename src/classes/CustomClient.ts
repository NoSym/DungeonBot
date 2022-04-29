import { ApplicationCommandPermissionData, Client, ClientOptions, Collection } from 'discord.js'
import fs from 'node:fs'
import { CustomCommand } from '../types/CustomCommand'
import { DiscordEvent } from '../types/DiscordEvent'
import { SelectMenu } from '../types/SelectMenu'

export class CustomClient extends Client {
    commands: Collection<string, CustomCommand>
    menus: Collection<string, SelectMenu>

    adminPermission: ApplicationCommandPermissionData[] = [
        {
            id: process.env.ADMIN_USER_ID ?? '',
            type: 'USER',
            permission: true
        }
    ]

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.menus = new Collection()
        this.handleEvents()
        this.loadCommands()
        this.loadMenus()

        this.guilds.cache.forEach(async guild => {
            const commands = await guild.commands.fetch()
            commands.forEach((command) => 
                command.permissions.set({ permissions: this.adminPermission }))
        })
    }

    private handleEvents() {
        const eventFiles = fs.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.ts'))

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
        const commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.ts'))

        for (const file of commandFiles) {
            const command: CustomCommand = require(`${__dirname}/../commands/${file}`).default

            this.commands.set(command.data.name, command)
        }
    }

    private loadMenus() {
        const menuFiles = fs.readdirSync(`${__dirname}/../menus`).filter(file => file.endsWith('.ts'))

        for (const file of menuFiles) {
            const menu: SelectMenu = require(`${__dirname}/../menus/${file}`).default

            this.menus.set(menu.name, menu)
        }
    }
}