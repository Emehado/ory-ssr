# Welcome to Custom UI with Ory Authentication and SSR!

A modern, production-ready template for building full-stack React applications with custom UI, Ory authentication, and server-side rendering (SSR). This template supports both Ory Kratos (self-hosted) and Ory Network.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- 🔐 Ory authentication integration
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [Ory Documentation](https://www.ory.sh/docs/)

## Getting Started

### Clone the repo
```bash
git clone https://github.com/Emehado/ory-ssr.git
```

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.


## Using with Ory Kratos (Self-Hosted)

Coming soon!!

## Using with Ory Network

Coming soon!!

In the meantime, you can checkout ory's documentation.
## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling 

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using [Ory](https://www.ory.sh/) and [React Router](https://reactrouter.com/home).

