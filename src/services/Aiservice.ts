import Cerebras from '@cerebras/cerebras_cloud_sdk';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

dotenv.config();

export interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

export const generatePersonalizedMessage = async (profile: LinkedInProfile): Promise<string> => {
  try {
    if (!process.env.CEREBRAS_API_KEY) {
      throw new Error('Cerebras API key is missing');
    }

    // Build our prompt, including the personalization data.
    const prompt = `
Generate a personalized outreach message based on the following LinkedIn profile:
Name: ${profile.name}
Job Title: ${profile.job_title}
Company: ${profile.company}
Location: ${profile.location}
Summary: ${profile.summary}

The message should be friendly, professional, and mention how our campaign management 
platform can help with outreach and lead generation. Keep it under 150 words and tailor it 
to their role and industry.
    `;

    // The Cerebras SDK expects messages with tool_call_id to have a role exactly "tool".
    // Therefore, we set the role to "tool" for all messages.
    const messages = [
      {
        role: "tool" as const, // Using the literal "tool" required by the SDK
        content: prompt,
        tool_call_id: randomUUID(),
      },
    ];
    
    const stream = await cerebras.chat.completions.create({
      messages,
      model: 'llama3.1-8b',
      stream: true,
      max_completion_tokens: 200,
      temperature: 0.7,
      top_p: 1,
    });

    let generatedMessage = '';
    for await (const chunk of stream as AsyncIterable<any>) {
      generatedMessage += chunk.choices[0]?.delta?.content || '';
    }
    
    return generatedMessage.trim() ||
      `Hey ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company}. Our platform could help streamline your outreach campaigns. Would you be interested in learning more?`;
  } catch (error) {
    console.error('Error generating message:', error);
    return `Hey ${profile.name}, I noticed you're working as a ${profile.job_title} at ${profile.company}. Our platform could help streamline your outreach campaigns. Would you be interested in learning more?`;
  }
};
