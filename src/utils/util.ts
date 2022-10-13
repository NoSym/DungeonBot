import fs from 'fs'
import { Character } from '../types/Character'
import { Player } from '../types/Player'

export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const getCharacters = (): Character[] => {
    const path = `${__dirname}/../../data/characters.json`
    const charactersJson = fs.readFileSync(path, 'utf-8')

    return JSON.parse(charactersJson)
}

export const getCharacterByName = (name: string): Character | undefined => {
    return getCharacters().find(char => char.name.toLowerCase() == name.toLowerCase())
}

export const getCharacterByDiscordId = (discordId: string) => {
    const mappings = getPlayerMappings()
    const playerId = mappings.get(discordId)
    
    return getCharacters().find(char => char.player_id == playerId)
}

export const getMaps = (): Map<string, string> => {
    const path = `${__dirname}/../../data/maps.json`
    const mapsJson = fs.readFileSync(path, 'utf-8')

    try {
        const maps = new Map<string, string>()
        const jsonMap = JSON.parse(mapsJson)

        Object.entries<string>(jsonMap).forEach(entry => maps.set(entry[0], entry[1]))
        
        return maps
    } catch {
        return new Map<string, string>()
    }
}

export const getPlayers = (): Player[] => {
    const path = `${__dirname}/../../data/players.json`
    const playersJson = fs.readFileSync(path, 'utf-8')

    return JSON.parse(playersJson)
}

export const getPlayerByName = (name: string): Player | undefined => {
    return getPlayers().find(player => player.name.toLowerCase() == name.toLowerCase())
}

export const getPlayerMappings = (): Map<string, string> => {
    const path = `${__dirname}/../../data/player_mappings.json`
    const playerMappingsJson = fs.readFileSync(path, 'utf-8')

    try {
        const mappings = new Map<string, string>()
        const jsonMap = JSON.parse(playerMappingsJson)

        Object.entries<string>(jsonMap).forEach(entry => mappings.set(entry[0], entry[1]))
        
        return mappings
    } catch {
        return new Map<string, string>()
    }
}

export const setPlayerMappings = (mappings: Map<string, string>) => {
    const path = `${__dirname}/../../data/player_mappings.json`
    const jsonMap: any = {}

    mappings.forEach((value, key) => jsonMap[key] = value)

    fs.writeFileSync(path, JSON.stringify(jsonMap))
}

export const rollDie = (numberOfSides: number): number => {
    return Math.floor(Math.random() * numberOfSides) + 1
}