import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { getCharacterByDiscordId, getCharacterByName, getCharacters } from "../utils/util";
import { Character } from "../types/Character";

const CHARACTER_NAME = 'character_name'

const buildDescription = (char: Character): string => {
    const description = 
`Level ${char.level} ${char.class}
HP: ${char.hp_current} / ${char.hp_max}
AC: ${char.ac}

Strength: ${char.strength}
Dexterity: ${char.dexterity}
Constitution: ${char.constitution}
Intelligence: ${char.intelligence}
Wisdom: ${char.wisdom}
Charisma: ${char.charisma}`

    return description
}

const getCharacterChoices = () => {
    const characters = getCharacters()

    const characterChoices = characters.map((char): [name: string, value: string] => {
        return [ char.name, char.name.toLowerCase() ]
    })

    return characterChoices
}

const execute = async (interaction: CommandInteraction) => {
    const choice = interaction.options.getString(CHARACTER_NAME, false)

    const character = choice 
        ? getCharacterByName(choice)
        : getCharacterByDiscordId(interaction.user.id)

    if (!character) {
        await interaction.reply('Character not found')
        return
    }

    const embeddedResponse = new MessageEmbed()
        .setTitle(character.name)
        .setImage(character.avatar)
        .setDescription(buildDescription(character))

    await interaction.reply({ embeds: [embeddedResponse] })
}

const character: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Show character sheet')
        .addStringOption(option =>
            option.setName(CHARACTER_NAME)
                .setDescription('Character to display')
                .addChoices(getCharacterChoices())
                .setRequired(false)),
    enabled: true,
    execute
}

export default character