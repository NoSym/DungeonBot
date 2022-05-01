import { CustomCommand } from "../types/CustomCommand"
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const NAME = 'name'
const RARITY = 'rarity'
const TIER = 'tier'
const CONSUMABLE = 'consumable'

const RARITY_COMMON = 'rarity_common'
const RARITY_UNCOMMON = 'rarity_uncommon'
const RARITY_RARE = 'rarity_rare'
const RARITY_VERYRARE = 'rarity_veryrare'
const RARITY_LEGENDARY = 'rarity_legendary'

const TIER_LOW = 'tier_low'
const TIER_MEDIUM = 'tier_medium'
const TIER_HIGH = 'tier_high'

type PriceRange = {
    start: number
    end: number
}

const getPriceRange = (itemRarity: string): PriceRange => {
    if (itemRarity === RARITY_COMMON) return { start: 50, end: 100 }
    if (itemRarity === RARITY_UNCOMMON) return { start: 101, end: 500 }
    if (itemRarity === RARITY_RARE) return { start: 501, end: 5000 }
    if (itemRarity === RARITY_VERYRARE) return { start: 5001, end: 50000 }
    return { start: 50001, end: 500000 }
}

const getTieredPriceRange = (priceRange: PriceRange, itemTier?: string): PriceRange => {
    const totalRange = priceRange.end - priceRange.start

    if (itemTier === TIER_LOW) return { 
        start: priceRange.start, 
        end: priceRange.end - Math.floor(totalRange * .67) 
    }
    if (itemTier === TIER_MEDIUM) return {
        start: priceRange.start + Math.floor(totalRange * .33),
        end: priceRange.end - Math.floor(totalRange * .33)
    }
    if (itemTier === TIER_HIGH) return {
        start: priceRange.start + Math.floor(totalRange * .67),
        end: priceRange.end
    }
    return {
        start: priceRange.start,
        end: priceRange.end
    }
}

const getItemPrice = (itemRarity: string, itemTier: string, isItemConsumable: boolean): number => {
    const initialPriceRange = getPriceRange(itemRarity)
    const actualPriceRange = getTieredPriceRange(initialPriceRange, itemTier)
    const itemPrice = Math.random() * (actualPriceRange.end - actualPriceRange.start + 1) + actualPriceRange.start
    const priceCut = isItemConsumable ? 2 : 1

    return Math.floor(itemPrice / priceCut)
}

const execute = async (interaction: CommandInteraction) => {
    const itemName = interaction.options.getString(NAME, true)
    const itemRarity = interaction.options.getString(RARITY, true)
    const itemTier = interaction.options.getString(TIER)
    const isItemConsumable = interaction.options.getBoolean(CONSUMABLE)

    const itemPrice = getItemPrice(itemRarity, itemTier ?? '', isItemConsumable ?? false)

    const embeddedResponse = new MessageEmbed()
        .setTitle(itemName)
        .setDescription(`Price: ${itemPrice} gold`)

    interaction.reply({ embeds: [embeddedResponse] })
}

const price: CustomCommand = {
    data: new SlashCommandBuilder()
        .setName('price')
        .setDescription('Price an item by rarity')
        .addStringOption(option => 
            option.setName(NAME)
                .setDescription('Item name')
                .setRequired(true))
        .addStringOption(option => 
            option.setName(RARITY)
                .setDescription('Item rarity')
                .setRequired(true)
                .addChoices([
                    ['Common', RARITY_COMMON],
                    ['Uncommon', RARITY_UNCOMMON],
                    ['Rare', RARITY_RARE],
                    ['Very Rare', RARITY_VERYRARE],
                    ['Legendary', RARITY_LEGENDARY],
                ]))
        .addStringOption(option =>
            option.setName(TIER)
                .setDescription('Relative quality within rarity category')
                .addChoices([
                    ['Low', TIER_LOW],
                    ['Medium', TIER_MEDIUM],
                    ['High', TIER_HIGH],
                ]))
        .addBooleanOption(option =>
            option.setName(CONSUMABLE)
                .setDescription('Is item consumable, like a scroll or potion?')),
    enabled: true,
    execute
}

export default price