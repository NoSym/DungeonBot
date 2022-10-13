import { MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from 'discord.js'
import { SelectMenu } from '../types/SelectMenu'
import { getMaps } from '../utils/util'

const name = 'mapMenu'
const getMenu = () => {
    const maps = getMaps()
    const menu = new MessageSelectMenu()
        .setCustomId(name)
        .setPlaceholder('Nothing selected')

    maps.forEach((mapUrl, mapKey) => menu.addOptions([
        {
            label: mapKey,
            value: mapUrl
        }
    ]))

    return menu
}
const handleSelection = async (interaction: SelectMenuInteraction) => {
    const maps = getMaps()
    const mapUrl = interaction.values[0]
    const mapName = [...maps.keys()].find(mapKey => maps.get(mapKey) === mapUrl)

    const embeddedResponse = new MessageEmbed()
        .setTitle(mapName ?? "")
        .setImage(mapUrl)

    interaction.reply({ embeds: [embeddedResponse] })
}

const mapMenu: SelectMenu = {
    name,
    getMenu,
    handleSelection
}

export default mapMenu