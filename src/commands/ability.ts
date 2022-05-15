import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { getCharacterByDiscordId, rollDie } from "../utils/util";

const CHECK = 'check'
const SAVE = 'save'

const CHECK_OPTIONS = new Array<[name: string, value: string]>(
    ['Acrobatics', 'acrobatics_bonus'],
    ['Animal Handling', 'animal_handling_bonus'],
    ['Arcana', 'arcana_bonus'],
    ['Athletics', 'athletics_bonus'],
    ['Charisma', 'charisma_mod'],
    ['Constitution', 'constitution_mod'],
    ['Deception', 'deception_bonus'],
    ['Dexterity', 'dexterity_mod'],
    ['History', 'history_bonus'],
    ['Initiative', 'initiative_bonus'],
    ['Insight', 'insight_bonus'],
    ['Intelligence', 'intelligence_mod'],
    ['Intimidation', 'intimidation_bonus'],
    ['Investigation', 'investigation_bonus'],
    ['Medicine', 'medicine_bonus'],
    ['Nature', 'nature_bonus'],
    ['Perception', 'perception_bonus'],
    ['Performance', 'performance_bonus'],
    ['Persuasion', 'persuasion_bonus'],
    ['Relgion', 'religion_bonus'],
    ['Sleight of Hand', 'sleight_of_hand_bonus'],
    ['Strength', 'strength_mod'],
    ['Survival', 'survival_bonus'],
    ['Wisdom', 'wisdom_mod'],
)

const SAVE_OPTIONS = new Array<[name: string, value: string]>(
    ['Charisma Save', 'charisma_save_bonus'],
    ['Constitution Save', 'constitution_save_bonus'],
    ['Dexterity Save', 'dexterity_save_bonus'],
    ['Intelligence Save', 'intelligence_save_bonus'],
    ['Strength Save', 'strength_save_bonus'],
    ['Wisdom Save', 'wisdom_save_bonus'],
)

const execute = async (interaction: CommandInteraction) => {
    const character = getCharacterByDiscordId(interaction.user.id)

    const options = interaction.options.getSubcommand() == CHECK
        ? CHECK_OPTIONS
        : SAVE_OPTIONS

    const choice = interaction.options.getSubcommand() == CHECK
        ? interaction.options.getString(CHECK, true)
        : interaction.options.getString(SAVE, true)

    if (!character) {
        await interaction.reply('Character not found')
        
        return
    }

    const abilityEntry = options.find(([, value]) => value == choice)

    if (!abilityEntry) {
        await interaction.reply(`That isn't a valid option, somehow...`)

        return
    }

    const [choiceName, ] = abilityEntry
    const entry = Object.entries(character).find(([key]) => key == choice)

    if (!entry) {
        await interaction.reply(`${character.name} doesn't have ${choiceName}, somehow...`)
        
        return
    }
    
    const [, val] = entry

    if (typeof val != 'number') {
        await interaction.reply(`${choiceName} is not a number, somehow...`)
        
        return
    }

    const roll = rollDie(20)
    
    const embeddedResponse = new MessageEmbed()
        .setTitle(`${character.name} rolled for ${choiceName}`)
        .setDescription(`${roll + val} (${roll} + ${val})`)

    interaction.reply({ embeds: [embeddedResponse] })
}

const ping: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('ability')
        .setDescription('Roll an ability check or save')
        .addSubcommand(subcommand =>
            subcommand.setName(CHECK)
                .setDescription('Roll an ability check')
                .addStringOption(option =>
                    option.setName(CHECK)
                        .setDescription('Which ability check to roll')
                        .addChoices(CHECK_OPTIONS)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName(SAVE)
                .setDescription('Roll an ability save')
                .addStringOption(option =>
                    option.setName(SAVE)
                        .setDescription('Which ability save to roll')
                        .addChoices(SAVE_OPTIONS)
                        .setRequired(true))),
    enabled: true,
    execute
}

export default ping