import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageActionRow, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { delay, rollDie } from "../utils/util";
import splitYesButton from "../buttons/splitYesButton";
import splitNoButton from "../buttons/splitNoButton";

const WAGER = 'wager'

type GameResult = {
    payout: number
    response: string
    responseFollowup?: string
}

const getPayout = (wager: number, knee: number): number => {
    if (knee >= 2 && knee <= 3) return wager
    if (knee >= 4 && knee <= 6) return wager * 2
    if (knee >= 7 && knee <= 6) return wager * 3
    if (knee == 10) return wager * 5

    return wager
}

const getResult = (wager: number, knee: number, h1: number, h2: number): GameResult => {
    if (knee == 1) return {
        payout: -wager,
        response: 'The giant kicks! Halflings lose!'
    }
    if (h1 == 1 && h2 == 1) return {
        payout: 0,
        response: 'A snake scares away the giant! Bets push!'
    }
    if (h1 + h2 < knee) return {
        payout: -wager,
        response: 'The halflings strike too low and are trampled!'
    }
    if (h1 + h2 > knee && h1 + h2 <= 10) return {
        payout: getPayout(wager, knee),
        response: 'The halflings struck above the Knee! Halflings win!'
    }
    if (h1 + h2 == knee) return {
        payout: getPayout(wager, knee),
        response: 'The halflings struck the Knee! Halflings win!',
        responseFollowup: '\nWould you like to split?'
    }
    if (h1 + h2 > 10) return {
        payout: -wager,
        response: 'The halflings got too close to the Maw and are eaten!'
    }
    
    return {
        payout: 0,
        response: 'I don\'t know how this happened',
    }
}

const execute = async (interaction: CommandInteraction) => {
    const wager = interaction.options.getNumber(WAGER, true)
    const knee = rollDie(10)
    const halfling1 = rollDie(6)
    const halfling2 = rollDie(6)
    const result = getResult(wager, knee, halfling1, halfling2)
    const descriptionText = `${result.response}${result.responseFollowup ?? ''}`
    const payoutText = result.payout < 0
        ? `You lose ${Math.abs(result.payout)} gold`
        : `You gain ${result.payout} gold`

    const splitRow = new MessageActionRow()
        .addComponents(splitYesButton.button, splitNoButton.button)

    await interaction.reply(`The Knee is ${knee}...`)

    await delay(2000)
    
    const embeddedResponse = new MessageEmbed()
        .setTitle(`The halflings roll ${halfling1} and ${halfling2}!`)
        .setDescription(descriptionText)
        .addField('Result', result.responseFollowup ? 'Split' : payoutText)

    await interaction.followUp({
        embeds: [embeddedResponse],
        components: result.responseFollowup ? [splitRow] : undefined
    })
}

const giantsAndHalflings: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('giantsandhalflings')
        .setDescription('Slay the giant')
        .addNumberOption(option => 
            option.setName(WAGER)
                .setDescription('Your bet')
                .setMinValue(1)
                .setMaxValue(1000000)
                .setRequired(true)),
    enabled: true,
    execute
}

export default giantsAndHalflings