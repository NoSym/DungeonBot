import { MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { SelectMenu } from '../types/SelectMenu'

const name = 'tavernMenu'
const getMenu = () => new MessageSelectMenu()
    .setCustomId(name)
    .setPlaceholder('Nothing selected')
    .addOptions([
        {
            label: 'Drink Menu',
            description: 'Lists drinks available at this tavern',
            value: 'drink_menu'
        },
        {
            label: 'Rumors',
            description: 'Something has been happening...',
            value: 'rumors'
        }
    ])
const handleSelection = async (interaction: SelectMenuInteraction) => {
    interaction.reply(`You clicked ${interaction.values[0]}`)
}

const tavernMenu: SelectMenu = {
    name,
    getMenu,
    handleSelection
}

export default tavernMenu