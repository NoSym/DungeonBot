import { ButtonInteraction, MessageButton } from "discord.js"
import { Button } from "../types/Button"
import { WAGER, KNEE } from '../utils/constants'
import { getPayout } from "../utils/giantsAndHalflings";

const name = 'splitNoButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Cash Out')
    .setStyle('DANGER')
const handleClick = async (interaction: ButtonInteraction) => {
    const wager = interaction.message.embeds[0].fields?.find(field => field.name == WAGER)
    const knee = interaction.message.embeds[0].fields?.find(field => field.name == KNEE)
    
    await interaction.update({ components: []})

    if (!wager || !knee) return

    const payout = getPayout(parseInt(wager.value), parseInt(knee.value))

    await interaction.channel?.send(`You gain ${payout} gold`)
}

const splitNoButton: Button = {
    name,
    button,
    handleClick
}

export default splitNoButton