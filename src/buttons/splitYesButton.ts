import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js"
import { Button } from "../types/Button"
import { WAGER, KNEE, HALFLING1, HALFLING2 } from '../utils/constants'
import { processRound } from "../utils/giantsAndHalflings"
import { rollDie } from "../utils/util"

const name = 'splitYesButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Split!')
    .setStyle('SUCCESS')
const handleClick = async (interaction: ButtonInteraction) => {
    const player = interaction.message.content
    const embed = interaction.message.embeds[0] as MessageEmbed
    const wager = embed.fields?.find(field => field.name == WAGER)
    const knee = embed.fields?.find(field => field.name == KNEE)
    const halfling1 = embed.fields?.find(field => field.name == HALFLING1)
    const halfling2 = embed.fields?.find(field => field.name == HALFLING2)
    embed.setColor("DEFAULT")

    await interaction.update({ embeds: [embed], components: []})

    if (!player || !wager || !knee || !halfling1 || !halfling2) return

    await processRound(interaction, player, parseInt(wager.value),
        parseInt(knee.value), parseInt(halfling1.value), rollDie(6))
    await processRound(interaction, player, parseInt(wager.value),
        parseInt(knee.value), parseInt(halfling2.value), rollDie(6))
}

const splitYesButton: Button = {
    name,
    button,
    handleClick
}

export default splitYesButton