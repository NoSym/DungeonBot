import { DMChannel, Interaction } from 'discord.js'
import { CustomClient } from '../classes/CustomClient';
import { DiscordEvent } from '../types/DiscordEvent'

const interactionCreate: DiscordEvent = {
    name: 'interactionCreate',
    once: false,
    async execute (interaction: Interaction) {
        if (!interaction.isCommand()) return

        const client = interaction.client as CustomClient
        const command = client.commands.get(interaction.commandName)
    
        if (!command) return

        if (interaction.channel instanceof DMChannel || interaction.channel?.partial) return

        console.log(`${interaction.user.tag} in #${interaction.channel?.name} triggered ${command.data.name}`);
    
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: `There was an error while executing ${command.data.name}`, ephemeral: true })
        }
    }
}

export default interactionCreate