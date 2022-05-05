import { ButtonInteraction, MessageButton } from "discord.js"
import { Button } from "../types/Button"
import { WAGER, KNEE, HALFLING1, HALFLING2, PLAYER } from '../utils/constants'
import { processRound } from "../utils/giantsAndHalflings"
import { rollDie } from "../utils/util"

const name = 'splitYesButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Split!')
    .setStyle('SUCCESS')
const handleClick = async (interaction: ButtonInteraction) => {
    const player = interaction.message.embeds[0].fields?.find(field => field.name == PLAYER)
    const wager = interaction.message.embeds[0].fields?.find(field => field.name == WAGER)
    const knee = interaction.message.embeds[0].fields?.find(field => field.name == KNEE)
    const halfling1 = interaction.message.embeds[0].fields?.find(field => field.name == HALFLING1)
    const halfling2 = interaction.message.embeds[0].fields?.find(field => field.name == HALFLING2)

    await interaction.update({ components: []})

    if (!player || !wager || !knee || !halfling1 || !halfling2) return

    await processRound(interaction, player.value, parseInt(wager.value),
        parseInt(knee.value), parseInt(halfling1.value), rollDie(6))
    await processRound(interaction, player.value, parseInt(wager.value),
        parseInt(knee.value), parseInt(halfling2.value), rollDie(6))
}

const splitYesButton: Button = {
    name,
    button,
    handleClick
}

export default splitYesButton