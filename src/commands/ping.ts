import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

// Example command implementation
const ping: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    enabled: false,
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!')
    }
}

export default ping