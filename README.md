# Wolter Woxer Fight ⚔️

![App Preview](https://imgix.cosmicjs.com/5f3fa970-56d0-11f1-97f1-6d8ebd88a07e-autopilot-photo-1513104890138-7c749659a591-1779558837628.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

An epic battle showcase website featuring Wolter, Fexigirl, slime minions, and the villainous Woxer. Built with Next.js 16 and powered by Cosmic CMS.

## Features

- 🦸 Character profiles with powers, bios, and team affiliations
- 🛡️ Team pages with alignment (heroes vs villains)
- ⚔️ Epic battle showcase with stories and winners
- 📱 Fully responsive comic-book inspired design
- 🚀 Server-side rendering with Next.js App Router
- 🎨 Beautiful gradients and animations with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a11e95af2c683f5f2b2efcc&clone_repository=6a11ea77f2c683f5f2b2f005)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Wolter and woxer fight and the flamegirl named fexigirl is in the team of wolter and slimes are the mini attackers and mini bosses for the team of wolter and flexigirl and flexigirl likes ice wolte elites pizz and woxer likes doing bad thing like exploding."

### Code Generation Prompt

> Build a Next.js application for a website called "Wolter woxer fight". The content is managed in Cosmic CMS with the following object types: teams, characters, battles. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Wolter and woxer fight and the flamegirl named fexigirl is in the team of wolter and slimes are the mini attackers and mini bosses for the team of wolter and flexigirl and flexigirl likes ice wolte elites pizz and woxer likes doing bad thing like exploding.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- Cosmic account with bucket configured

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all characters with team data
const { objects } = await cosmic.objects
  .find({ type: 'characters' })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three Cosmic object types: `teams`, `characters`, and `battles`. The depth parameter is used to fetch related objects in a single query.

## Deployment

Deploy to Vercel or Netlify with your Cosmic environment variables set.

<!-- README_END -->