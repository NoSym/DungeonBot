import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply('You asked for a price!');
}

// @TODO: figure out why addStringOption can't be last
const price: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('Price an item by rarity')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Item name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('rarity')
                .setDescription('Item rarity')
                .setRequired(true)
                .addChoices([
                    ['Common', 'rarity_common'],
                    ['Uncommon', 'rarity_uncommon'],
                    ['Rare', 'rarity_rare'],
                    ['Very Rare', 'rarity_veryrare'],
                    ['Legendary', 'rarity_legendary'],
                ]))
        .addStringOption(option =>
            option.setName('tier')
                .setDescription('Relative quality within rarity category')
                .addChoices([
                    ['Low', 'tier_low'],
                    ['Medium', 'tier_medium'],
                    ['High', 'tier_high'],
                ]))
        .addBooleanOption(option =>
            option.setName('consumable')
                .setDescription('Is item consumable, like a scroll or potion?')),
    execute
}

export default price