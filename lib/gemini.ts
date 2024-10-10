import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function generateChangelog(commits: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Given the following git commits, generate a concise and user-friendly changelog:

    ${commits}

    Please format the changelog as follows:
    - Group related changes under appropriate headings (e.g., Features, Bug Fixes, Performance Improvements)
    - Use bullet points for each change
    - Keep descriptions brief but informative
    - Focus on changes that are relevant to end-users
    - Exclude minor code refactors or internal changes that don't affect users
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}