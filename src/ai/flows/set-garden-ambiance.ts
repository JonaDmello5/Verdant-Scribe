// Implemented Genkit flow for automatically adjusting the digital garden's ambiance based on the mood of the latest post.

'use server';

/**
 * @fileOverview Adjusts the garden ambiance based on the mood of the latest post.
 *
 * - setGardenAmbiance - A function that sets the garden ambiance.
 * - SetGardenAmbianceInput - The input type for the setGardenAmbiance function.
 * - SetGardenAmbianceOutput - The return type for the setGardenAmbiance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SetGardenAmbianceInputSchema = z.object({
  latestPostContent: z
    .string()
    .describe('The content of the latest post in the digital garden.'),
});
export type SetGardenAmbianceInput = z.infer<typeof SetGardenAmbianceInputSchema>;

const SetGardenAmbianceOutputSchema = z.object({
  ambianceDescription: z
    .string()
    .describe(
      'A description of the garden ambiance, including visual and auditory elements, that reflects the mood of the latest post.'
    ),
});
export type SetGardenAmbianceOutput = z.infer<typeof SetGardenAmbianceOutputSchema>;

export async function setGardenAmbiance(
  input: SetGardenAmbianceInput
): Promise<SetGardenAmbianceOutput> {
  return setGardenAmbianceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'setGardenAmbiancePrompt',
  input: {schema: SetGardenAmbianceInputSchema},
  output: {schema: SetGardenAmbianceOutputSchema},
  prompt: `You are a poetic digital garden designer. Your task is to evoke a mood that mirrors the provided text. Create a short, beautiful, and imaginative description of a garden scene.

Latest Post Content: {{{latestPostContent}}}

Based on the content above, describe the ideal garden ambiance. Be evocative. Think about light, color, and feeling.

*   **Visuals**: Is it a sun-drenched meadow, a misty moonlit clearing, a rain-slicked path at twilight? Describe the quality of light, the dominant colors, and one or two key natural features (e.g., ancient stones, swaying willows, vibrant moss).
*   **Sounds**: The only available ambient sounds are **wind**, **gentle rain**, or a **soft musical pad**. Describe which of these sounds would best complement your visual scene. For example, is it the sound of wind whispering through tall grass, the gentle patter of a brief shower on broad leaves, or a soft, ambient chord that hangs in the air?

Craft a single, flowing paragraph that brings this scene to life, creating a peaceful and contemplative atmosphere that enhances the user's connection to their writing.`,
});

const setGardenAmbianceFlow = ai.defineFlow(
  {
    name: 'setGardenAmbianceFlow',
    inputSchema: SetGardenAmbianceInputSchema,
    outputSchema: SetGardenAmbianceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
