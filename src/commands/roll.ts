import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const NUMBER_DICE = 'dice'
const NUMBER_SIDES = 'sides'
const BONUS = 'bonus'
const ROLL_LABEL = 'label'

const execute = async (interaction: CommandInteraction) => {
    const numberOfDice = interaction.options.getNumber(NUMBER_DICE, true)
    const numberOfSides = interaction.options.getNumber(NUMBER_SIDES, true)
    const bonusModifier = interaction.options.getNumber(BONUS)
    const label = interaction.options.getString(ROLL_LABEL)
    const labelText = label ? ` for ${label}` : ``
    const results: number[] = []

    for (let i = 0; i < numberOfDice; i++) {
        results.push(Math.floor(Math.random() * (numberOfSides + 1)) + 1)
    }

    const sum = results.reduce((x1, x2) => x1 + x2) + (bonusModifier ?? 0)
    const bonusTitleText = bonusModifier ? ` + ${bonusModifier} ` : ''
    const bonusDescText = bonusModifier ? ` (${sum} + ${bonusModifier})` : ''
    
    const embeddedResponse = new MessageEmbed()
        .setTitle(`Rolling ${numberOfDice}d${numberOfSides}${bonusTitleText}${labelText}`)
        .setDescription(`${sum}${bonusDescText}`)

    if (numberOfDice > 1) {
        embeddedResponse.addField('Rolls', results.join(', '), true)
    }

    interaction.reply({ embeds: [embeddedResponse] })
}

const roll: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll the dice')
        .addNumberOption(option => 
            option.setName(NUMBER_DICE)
                .setDescription('Number of dice')
                .setMinValue(1)
                .setMaxValue(1000000)
                .setRequired(true))
        .addNumberOption(option => 
            option.setName(NUMBER_SIDES)
                .setDescription('Number of sides')
                .setMinValue(1)
                .setMaxValue(1000000)
                .setRequired(true))
        .addNumberOption(option =>
            option.setName(BONUS)
                .setDescription('Bonus modifier')
                .setMinValue(1)
                .setMaxValue(1000000))
        .addStringOption(option => 
            option.setName(ROLL_LABEL)
                .setDescription('What are you rolling for?')),
    enabled: true,
    execute
}

export default roll