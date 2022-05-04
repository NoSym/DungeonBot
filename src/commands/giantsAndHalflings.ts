import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const giantsAndHalflings: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('giantsandhalflings')
        .setDescription('Slay the giant'),
    enabled: true,
    async execute(interaction: CommandInteraction) {
        await interaction.reply('This command does not work yet!')
    }
}

export default giantsAndHalflings