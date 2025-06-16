# Welcome to Custom UI with Ory Authentication and SSR!

A modern, production-ready template for building full-stack React applications with custom UI, Ory authentication, and server-side rendering (SSR). This template supports both Ory Kratos (self-hosted) and Ory Network.


## Features

- 🚀 Server-side rendering
- 🔐 Ory authentication integration with Custom UI
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

## Using with Ory Network (Cloud)

To connect this application to Ory Network:

### 1. Create an Ory Network Project

First, sign up for [Ory Network](https://console.ory.sh/) and create a new project.

### 2. Install Ory CLI

Install the Ory CLI which includes the tunnel for local development:

```bash
# macOS with Homebrew
brew install ory/tap/cli

# Or download directly from https://github.com/ory/cli/releases
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# For Ory Network with Tunnel (for local development)
VITE_ORY_SDK_URL=http://localhost:4000
VITE_APP_URL=http://localhost:5173
ORY_PROJECT_ID=<your-project-id>
```

Replace `<your-project-id>` with your actual Ory Network project ID.

### 4. Configure Ory Network Settings

In your Ory Network Console, you need to update the Self-Service Flow URLs to use your custom UI:

1. **Navigate to** ` Branding` tab → `UI URLs`

2. **Update the following URLs** to point to your application:
   - Login UI: `http://localhost:5173/login`
   - Registration UI: `http://localhost:5173/sign-up`
   - Verification UI: `http://localhost:5173/verification`
   - Settings UI: `http://localhost:5173/settings`
   - Recovery UI: `http://localhost:5173/recovery`
   - Error UI: `http://localhost:5173/error`

3. **Switch to the "Browser Redirects" tab** and configure:
   - Default redirect URL: `http://localhost:5173/`

### 5. Run the Application with Ory Tunnel

The Ory Tunnel is required for local development to handle cookie domains between localhost and Ory Cloud.

1. **Start your React app** (in one terminal):
   ```bash
   npm run dev
   ```

2. **Start the Ory Tunnel** (in another terminal):
   ```bash
   ./start-tunnel.sh
   ```

3. **Access your application** at `http://localhost:5173`
   - The app runs on port 5173
   - The Ory Tunnel runs on port 4000 and proxies Ory API requests

### 6. How It Works

- Your React app runs on `localhost:5173`
- The Ory Tunnel runs on `localhost:4000`
- When your app makes requests to Ory APIs (via `localhost:4000`), the tunnel forwards them to Ory Cloud
- The tunnel handles cookie domain issues automatically
- After login/registration, Ory redirects back to your custom UI URLs

### 7. Production Deployment

For production deployments:

1. Update the environment variables:
   ```bash
   VITE_ORY_SDK_URL=https://<your-project-slug>.projects.oryapis.com
   VITE_APP_URL=https://yourdomain.com
   ```

2. Update all the UI URLs in Ory Console to your production domain

3. You don't need the Ory Tunnel in production - cookies will work correctly when both your app and Ory are on HTTPS

### Troubleshooting

- **Cookie domain errors**: Make sure you're running the Ory Tunnel for local development
- **"Bad Request" on verification**: This usually means the flow ID is missing - check your Ory Console redirect settings
- **Redirect to Ory's UI instead of custom UI**: Ensure all Self-Service Flow URLs in Ory Console point to your app
- **CSRF token errors**: The CSRF token is automatically included in hidden form fields - make sure you're rendering all form nodes
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

