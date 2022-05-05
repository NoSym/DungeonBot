import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { rollDie } from "../utils/util";
import { WAGER } from '../utils/constants'
import { processRound } from "../utils/giantsAndHalflings";

const execute = async (interaction: CommandInteraction) => {
    const player = interaction.user.tag
    const wager = interaction.options.getNumber(WAGER, true)
    const knee = rollDie(10)
    const halfling1 = rollDie(6)
    const halfling2 = rollDie(6)

    await interaction.reply(`The Knee is ${knee}...`)

    await processRound(interaction, player, wager, knee, halfling1, halfling2)
}

const giantsAndHalflings: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('giantsandhalflings')
        .setDescription('Slay the giant')
        .addNumberOption(option => 
            option.setName(WAGER)
                .setDescription('Your bet')
                .setMinValue(1)
                .setMaxValue(1000000)
                .setRequired(true)),
    enabled: true,
    execute
}

export default giantsAndHalflings