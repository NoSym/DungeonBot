import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageActionRow } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import tavernMenu from "../menus/tavernMenu";

const execute = async (interaction: CommandInteraction) => {
    const row = new MessageActionRow()
        .addComponents(
            tavernMenu.menu
        )
        
    await interaction.reply({content: 'This message has all your random tavern info', components: [row] })
}

const ping: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('tavern')
        .setDescription('Create a random tavern'),
    execute
}

export default ping