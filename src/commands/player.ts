import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { getPlayers, getPlayerMappings, setPlayerMappings, getPlayerByName } from "../utils/util";

const PLAYER_NAME = 'player_name'
const PLAYER_NONE = 'none'

const getPlayerChoices = () => {
    const players = getPlayers()

    const playerChoices = players.map((player): [name: string, value: string] => {
        return [ player.name, player.name.toLowerCase() ]
    })

    playerChoices.push(['None', PLAYER_NONE])

    return playerChoices
}

const execute = async (interaction: CommandInteraction) => {
    const choice = interaction.options.getString(PLAYER_NAME, true)
    const mappings = getPlayerMappings()
    const player = getPlayerByName(choice)

    if (choice == PLAYER_NONE) {
        mappings.set(interaction.user.id, '')
        setPlayerMappings(mappings)
        await interaction.reply('You are no longer playing as anyone')
        return
    }

    if (!player) {
        await interaction.reply('Player not found')
        return
    }
    
    if (Array.from(mappings.values()).includes(player.id)) {
        await interaction.reply('Player is already claimed')
        return
    }

    mappings.set(interaction.user.id, player.id)

    setPlayerMappings(mappings)

    await interaction.reply(`You are now playing as ${player.name}`)
}

const ping: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('Identify yourself')
        .addStringOption(option =>
            option.setName(PLAYER_NAME)
                .setDescription('Who are you?')
                .addChoices(getPlayerChoices())
                .setRequired(true)),
    enabled: true,
    execute
}

export default ping