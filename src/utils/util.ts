export const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const rollDie = (numberOfSides: number): number => {
    return Math.floor(Math.random() * numberOfSides) + 1
}