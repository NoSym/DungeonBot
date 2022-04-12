import { Awaitable, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type CustomCommand = {
    data: SlashCommandBuilder,
    execute(interaction: CommandInteraction): Awaitable<void>
}