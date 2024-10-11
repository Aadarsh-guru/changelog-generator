# AI-Powered Changelog Generator

## Overview

This project is an AI-powered changelog generator built as part of the Greptile Software Engineer Interview Project. It aims to simplify the process of creating changelogs for developers by leveraging AI to summarize commit messages and generate user-friendly changelog entries.

The application consists of two main parts:
1. A developer-facing tool for quickly generating changelogs using AI.
2. A public-facing website where the generated changelogs can be viewed.

## Features

- Generate changelogs from manual commit messages or GitHub repository URLs
- AI-powered summarization of changes using Google's Gemini API
- Shareable links for each generated changelog
- Markdown preview and raw text view of changelogs
- Responsive design for both desktop and mobile users

## Tech Stack

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (for styling)
- Shadcn UI (for UI components)
- Google Gemini API (for AI-powered text generation)
- Neon (PostgreSQL database)

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-changelog-generator.git
   cd ai-changelog-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.sample` file to `.env.local`
   - Replace the placeholder values with your actual API keys and database URL:
     ```
     GEMINI_API_KEY="your_gemini_api_key_here"
     DATABASE_URL="your_neon_database_url_here"
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. On the homepage, you can either:
   - Enter commit messages manually in the text area
   - Provide a GitHub repository URL and branch name to import commits
2. Enter the version number for the changelog
3. Click "Generate Changelog" to create a new changelog entry
4. View the generated changelog in both raw text and markdown preview formats
5. Use the provided shareable link to view the changelog on a public page

## Design Decisions

1. **User-Centered Design**: The interface is designed to be intuitive and easy to use, with clear instructions and input fields for both manual entry and GitHub import.

2. **AI Integration**: We chose to use Google's Gemini API for its advanced language understanding capabilities, allowing for more accurate and relevant changelog summaries.

3. **Markdown Support**: Changelogs are presented in both raw text and rendered markdown formats, catering to different user preferences and use cases.

4. **Shareable Links**: Each generated changelog has a unique, shareable link, making it easy for developers to distribute changelogs to their users.

5. **Responsive Design**: The application is built with a mobile-first approach, ensuring a good user experience across various devices and screen sizes.

6. **Database Integration**: We use a Neon PostgreSQL database to store generated changelogs, allowing for persistence and easy retrieval of past entries.

7. **Modern Tech Stack**: The choice of Next.js 14, TypeScript, and Tailwind CSS ensures a modern, type-safe, and easily maintainable codebase.

## Future Improvements

- Implement user authentication to allow developers to manage their own changelogs
- Add support for more version control systems beyond GitHub
- Implement a tagging system for categorizing changes (e.g., bug fixes, new features, etc.)
- Create an API for programmatic access to the changelog generation service

## Conclusion

This AI-powered changelog generator aims to streamline the process of creating and maintaining changelogs for developers. By automating the summarization of changes and providing an easy-to-use interface, we hope to save developers time and improve the quality of changelogs for end-users.