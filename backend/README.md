# Reloop Backend

This folder contains the Express backend for the Reloop project. It provides user authentication and a simple marketplace API backed by MongoDB. It also serves the frontend `Public/` folder for local development.

## Requirements

- Node.js 18+ (or compatible)
- npm
- MongoDB running locally (or a connection string in `MONGO_URI`)

## Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Copy or create `.env` (an example is included)

```bash
cp .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET
```

3. Start the dev server

```bash
npm run dev
```

4. Open the frontend at http://localhost:5500 (or the `PORT` you set)

## API

- `POST /api/users/signup` - Sign up with { username, email, password }
- `POST /api/users/login` - Sign in with { email, password } => returns JWT
- `GET /api/marketplace` - List items
- `POST /api/marketplace` - Create item (Authorization: Bearer <token>)
- `GET /api/ping` - Health check

## Notes

- Frontend files are served from the repository `Public/` directory.
- For production, set `FRONTEND_URL` in `.env` to restrict CORS origins.
