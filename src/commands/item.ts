import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageActionRow } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import itemMenu from "../menus/itemMenu";
import { CustomClient } from "../classes/CustomClient";

const execute = async (interaction:CommandInteraction) => {
    const row = new MessageActionRow()
        .addComponents(itemMenu.getMenu(interaction.client as CustomClient))
        
    await interaction.reply({content: 'Select an item', components: [row] })
}

const item: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('item')
        .setDescription('Show item info'),
    enabled: true,
    execute
}

export default item