# Netlify Deployment Checklist

## Issues Fixed

The blank screen issue on Netlify had TWO root causes:

### 1. Missing React Plugin
- ✅ Added `@vitejs/plugin-react` for proper React/JSX transformation
- ✅ Updated `vite.config.ts` to use React plugin
- ✅ Fixed environment variable handling (VITE_GEMINI_API_KEY)
- ✅ Added sourcemaps for debugging

### 2. Immediate Module-Level Error (CRITICAL FIX)
- ✅ **geminiService.ts was throwing error on module load** if API key wasn't set
- ✅ Changed to lazy initialization - API client only created when actually needed
- ✅ App now loads successfully even without API key set
- ✅ Error shown only when user tries to use AI features

### 3. Netlify Configuration
- ✅ Created proper `netlify.toml` configuration
- ✅ Added `_redirects` file for SPA routing

## Steps to Deploy

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Configure Environment Variable on Netlify

**This is the most important step!**

1. Go to https://app.netlify.com/sites/animated-travesseiro-f724bf/configuration/env
2. Click "Add a variable"
3. Add:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyBxDCMOXDe3mbSsBEgWSEQp9Kr0l_fbsuQ`
4. Click "Save"

### 3. Trigger New Deploy

After pushing code and setting the environment variable:

1. Go to https://app.netlify.com/sites/animated-travesseiro-f724bf/deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"

## Verification Steps

Once deployed, check:

1. **Site loads**: Visit https://animated-travesseiro-f724bf.netlify.app
2. **No blank screen**: Dashboard should display with all 8 tools
3. **Console errors**: Open browser DevTools (F12) and check Console tab for errors
4. **Pill Identifier works**: Test the AI-powered pill identification feature

## If Still Not Working

### Check Build Logs

1. Go to https://app.netlify.com/sites/animated-travesseiro-f724bf/deploys
2. Click on the latest deploy
3. Scroll down to "Deploy log" and check for:
   - Build errors
   - Missing dependencies
   - Environment variable issues

### Common Issues

**Issue**: Site still shows blank screen
**Solution**:
- Verify `VITE_GEMINI_API_KEY` is set in Netlify (not just local .env.local)
- Check browser console for JavaScript errors
- Make sure build completed successfully without errors

**Issue**: Pill Identifier doesn't work
**Solution**:
- Verify API key is correct and valid
- Check that environment variable starts with `VITE_` prefix

**Issue**: 404 on page refresh
**Solution**:
- Already fixed with `_redirects` file
- If still occurring, check that `_redirects` file exists in published deploy

## Build Configuration

The app is configured with:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

These settings are in `netlify.toml` and will be auto-detected by Netlify.

## Local Testing

To test the production build locally before deploying:

```bash
npm run build
npm run preview
```

Then open http://localhost:4173 to verify everything works.
