import { ButtonInteraction, MessageButton } from "discord.js"
import { Button } from "../types/Button"

const name = 'splitNoButton'
const button = new MessageButton()
    .setCustomId(name)
    .setLabel('No...')
    .setStyle('DANGER')
const handleClick = async (interaction: ButtonInteraction) => {
    interaction.reply('Great!')
}

const splitNoButton: Button = {
    name,
    button,
    handleClick
}

export default splitNoButton