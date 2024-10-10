# AI-Powered Changelog Generator

This project is an AI-powered changelog generator that helps developers quickly create changelogs from git commits. It includes both a developer-facing tool and a public-facing website to display the generated changelogs.

## Features

- AI-generated changelogs from git commits
- Manual input or GitHub repository import
- Export changelogs as CSV or Markdown
- Streaming generation of changelogs (similar to ChatGPT)
- Public-facing website to display changelogs

## Technology Stack

- Frontend: Next.js with React
- Backend: Node.js with Express
- AI: OpenAI GPT-3.5 for changelog generation
- Styling: Tailwind CSS
- UI Components: shadcn/ui

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see .env.example)
4. Run the development server: `npm run dev`

## Usage

1. Navigate to the developer tool page
2. Enter commits manually or provide a GitHub repository URL
3. Click "Generate Changelog" to create the changelog
4. Copy or export the generated changelog as needed

## Design Decisions

- Used Next.js for both the developer tool and public website to maintain a consistent tech stack
- Implemented streaming generation for a more responsive user experience
- Chose shadcn/ui for rapid development of a clean and modern UI
- Separated the changelog generation logic into a reusable API endpoint

## Future Improvements

- Add authentication for the developer tool
- Implement pagination for large changelogs
- Allow customization of AI prompts for changelog generation

## AI Tools Used

- GitHub Copilot for code suggestions
- ChatGPT for brainstorming and problem-solving

## License

This project is licensed under the MIT License.