import { MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import fs from 'fs'
import { CustomClient } from '../classes/CustomClient'
import { SelectMenu } from '../types/SelectMenu'

const name = 'itemMenu'
const getMenu = () => {
    const menu = new MessageSelectMenu()
        .setCustomId(name)
        .setPlaceholder('Nothing selected')
    const itemFiles = fs.readdirSync(`${__dirname}/../markdown/items`).filter(file => file.endsWith('.md'))

    for (const file of itemFiles) {
        const itemName = file.substring(0, file.indexOf('.'))

        menu.addOptions([
            {
                label: itemName,
                value: itemName
            }
        ])
    }

    return menu
}
const handleSelection = async (interaction: SelectMenuInteraction) => {
    const client = interaction.client as CustomClient
    
    const itemName = interaction.values[0]
    const itemPath = `${__dirname}/../markdown/items/${itemName}.md`
    const itemText = fs.existsSync(itemPath) ? fs.readFileSync(itemPath, 'utf8') : `There is no information on ${itemName}...`

    const embeddedResponse = new MessageEmbed()
        .setDescription(itemText)

    interaction.reply({ embeds: [embeddedResponse] })
}

const itemMenu: SelectMenu = {
    name,
    getMenu,
    handleSelection
}

export default itemMenu