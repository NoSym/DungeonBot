import { Awaitable, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';

export type CustomCommand = {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> 
        | SlashCommandSubcommandsOnlyBuilder
    enabled: boolean
    execute(interaction: CommandInteraction): Awaitable<void>
}