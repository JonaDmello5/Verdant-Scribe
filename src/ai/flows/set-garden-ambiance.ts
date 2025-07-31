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
  prompt: `You are an expert digital garden designer. You will analyze the latest post content and determine the appropriate ambiance for the garden, considering both visual and auditory elements.

Latest Post Content: {{{latestPostContent}}}

Based on the content above, describe the ideal garden ambiance. Consider the following aspects:

*   Visual elements: Overall lighting (e.g., sunny, moonlit, misty), color palette, and any specific visual features (e.g., flowers, trees, winding vines).
*   Auditory elements: Ambient sounds that would complement the visual ambiance (e.g., gentle wind, chirping crickets, somber music).

Provide a concise description of the ambiance that captures the essence of the post's mood.`,
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
