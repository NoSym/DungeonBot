import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageEmbed } from "discord.js"
import splitNoButton from "../buttons/splitNoButton"
import splitYesButton from "../buttons/splitYesButton"
import { WAGER, KNEE, HALFLING1, HALFLING2 } from '../utils/constants'
import { delay } from "./util"

const DELAY = 2000

type GameResult = {
    payout: number
    response: string
    responseFollowup?: string
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
        responseFollowup: '\nWould you like to **split**?'
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

export const getPayout = (wager: number, knee: number): number => {
    if (knee >= 2 && knee <= 3) return wager
    if (knee >= 4 && knee <= 6) return wager * 2
    if (knee >= 7 && knee <= 6) return wager * 3
    if (knee == 10) return wager * 5

    return wager
}

export const processRound = async (interaction: CommandInteraction | ButtonInteraction, player: string,
    wager: number, knee: number, halfling1: number, halfling2: number) => {
    const result = getResult(wager, knee, halfling1, halfling2)
    const descriptionText = `${result.response}${result.responseFollowup ?? ''}`
    const payoutText = result.payout < 0
        ? `You lose ${Math.abs(result.payout)} gold`
        : `You gain ${result.payout} gold`

    const splitRow = new MessageActionRow()
        .addComponents(splitYesButton.button, splitNoButton.button)

    await delay(DELAY)
    
    const embeddedResponse = new MessageEmbed()
        .setColor(result.payout < 0 ? "RED" : "GREEN")
        .setTitle(`The halflings roll ${halfling1} and ${halfling2}!`)
        .setDescription(descriptionText)
        .addField('Result', result.responseFollowup ? 'Split' : payoutText)
        .addFields(
            { name: WAGER, value: wager.toString() },
            { name: KNEE, value: knee.toString(), inline: true },
            { name: HALFLING1, value: halfling1.toString(), inline: true },
            { name: HALFLING2, value: halfling2.toString(), inline: true }
        )

    await interaction.followUp({
        content: player,
        embeds: [embeddedResponse],
        components: result.responseFollowup ? [splitRow] : undefined
    })
}