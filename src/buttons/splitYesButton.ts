import { ButtonInteraction, MessageButton } from "discord.js"
import { Button } from "../types/Button"

const name = 'splitYesButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('Split!')
    .setStyle('SUCCESS')
const handleClick = async (interaction: ButtonInteraction) => {
    interaction.reply('Too bad!')
}

const splitYesButton: Button = {
    name,
    button,
    handleClick
}

export default splitYesButton