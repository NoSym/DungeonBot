import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageActionRow } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import mapMenu from "../menus/mapMenu";
import { CustomClient } from "../classes/CustomClient";

const execute = async (interaction:CommandInteraction) => {
    const row = new MessageActionRow()
        .addComponents(mapMenu.getMenu(interaction.client as CustomClient))
        
    await interaction.reply({content: 'Select a map', components: [row] })
}

const map: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Show a map'),
    enabled: true,
    execute
}

export default map