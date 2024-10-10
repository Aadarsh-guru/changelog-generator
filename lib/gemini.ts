import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string)

export async function generateChangelog(commits: string, version: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `
    As an experienced developer and technical writer, your task is to create a comprehensive, user-friendly changelog for version ${version} based on the following git commits:

    ${commits}

    Please follow these guidelines to generate an informative and well-structured changelog:

    1. Start the changelog with a heading that includes the version number.
    2. Analyze each commit message carefully, extracting key information about the changes made.
    3. Group related changes under appropriate headings. Common categories include, but are not limited to:
       - Features
       - Enhancements
       - Bug Fixes
       - Performance Improvements
       - Security Updates
       - Documentation
       - Refactoring
       - Dependencies
    4. Under each heading, use bullet points to list individual changes.
    5. For each change:
       - Provide a clear and concise description of what was changed or added.
       - If applicable, briefly explain the impact or benefit of the change for end-users.
       - Include any relevant issue or pull request numbers in parentheses at the end of the description.
    6. Use active voice and present tense for consistency (e.g., "Add feature" instead of "Added feature").
    7. Highlight breaking changes or important updates that require user action.
    8. If a commit message is unclear, use your best judgment to interpret the change and describe it accurately.
    9. For features or significant changes, consider adding a brief explanation of how to use the new functionality.
    10. Exclude minor code refactors, internal changes, or commits that don't affect users unless they are part of a larger, relevant change.
    11. If multiple commits relate to the same change, combine them into a single, comprehensive bullet point.
    12. Order the changes within each category from most to least significant.
    13. Use proper markdown formatting for headings, bullet points, and any inline code references.

    Remember, the goal is to create a changelog that is informative, easy to read, and valuable for both technical and non-technical users. Strive for a balance between completeness and conciseness.
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}