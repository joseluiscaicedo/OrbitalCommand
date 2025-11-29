# 🚀 Deploy to Heroku

## Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- Git initialized in your project
- Heroku account

## Deployment Steps

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create a new Heroku app
```bash
heroku create orbital-command-app
```
Or use your own app name:
```bash
heroku create your-app-name
```

### 3. Add buildpack for Node.js
```bash
heroku buildpacks:set heroku/nodejs
```

### 4. Commit your changes
```bash
git add .
git commit -m "Prepare for Heroku deployment"
```

### 5. Deploy to Heroku
```bash
git push heroku main
```

If you're on a different branch:
```bash
git push heroku your-branch:main
```

### 6. Open your app
```bash
heroku open
```

### 7. View logs (if needed)
```bash
heroku logs --tail
```

## Environment Variables

If you need to add environment variables:
```bash
heroku config:set VARIABLE_NAME=value
```

## What happens during deployment:

1. Heroku installs root dependencies (`package.json`)
2. Runs `npm run heroku-postbuild` which:
   - Installs client dependencies
   - Builds the React app with Vite
3. Starts the server using the `Procfile`
4. Server serves the built React app as static files
5. WebSocket connection works through the same domain

## Troubleshooting

### Build fails
```bash
heroku logs --tail
```

### App crashes on startup
```bash
heroku restart
heroku logs --tail
```

### WebSocket connection issues
- Make sure CORS is properly configured
- Check that the client connects to the correct URL (it should auto-detect)

## Local Testing (Production Mode)

Test the production build locally:
```bash
npm run build
npm start
```

Then visit `http://localhost:4000`
