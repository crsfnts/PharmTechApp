# Netlify Deployment Setup

## Build Configuration

The app is configured to build automatically on Netlify using the settings in `netlify.toml`:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

## Environment Variables

You need to set up the Gemini API key as an environment variable in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add the following:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key

## Important Notes

- The environment variable must be prefixed with `VITE_` to be accessible in the Vite build
- After adding the environment variable, trigger a new deploy for changes to take effect
- The API key from your `.env.local` file is NOT used in production - you must set it in Netlify's environment variables

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build the production bundle
npm run build

# Deploy the dist folder to Netlify
# You can drag and drop the dist folder to Netlify's deploy page
```

## Troubleshooting

If the site isn't loading:

1. Check the deploy logs in Netlify for build errors
2. Verify the environment variable is set correctly (key must be `VITE_GEMINI_API_KEY`)
3. Ensure the build command completed successfully
4. Check the browser console for JavaScript errors
5. Verify that the publish directory is set to `dist`
