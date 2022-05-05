import { ButtonInteraction, MessageButton, MessageEmbed } from "discord.js"
import { Button } from "../types/Button"
import { WAGER, KNEE } from '../utils/constants'
import { getPayout } from "../utils/giantsAndHalflings";

const name = 'splitNoButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Cash Out')
    .setStyle('DANGER')
const handleClick = async (interaction: ButtonInteraction) => {
    const player = interaction.message.content
    const embed = interaction.message.embeds[0] as MessageEmbed
    const wager = embed.fields?.find(field => field.name == WAGER)
    const knee = embed.fields?.find(field => field.name == KNEE)

    await interaction.update({ components: []})

    if (!wager || !knee) return

    const payout = getPayout(parseInt(wager.value), parseInt(knee.value))

    await interaction.channel?.send(`${player} You gain ${payout} gold`)
}

const splitNoButton: Button = {
    name,
    button,
    handleClick
}

export default splitNoButton