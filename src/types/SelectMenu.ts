import { Awaitable, MessageSelectMenu, SelectMenuInteraction } from "discord.js"

export type SelectMenu = {
    name: string,
    menu: MessageSelectMenu,
    handleSelection(interaction: SelectMenuInteraction): Awaitable<void>
}