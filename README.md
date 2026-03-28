# TheHireHub - Recruitment Dashboard

A full-stack candidate management system built with the MERN stack. A practical solution for recruiting teams to organize, track, and manage candidates through their recruitment pipeline.

## Overview

TheHireHub is a working recruitment dashboard where you can:
- Keep track of jobs you're hiring for
- Organize candidates at different stages (Applied → Shortlisted → Interview → Offered → Hired)
- Search for candidates and filter by experience, fit, or stage
- Add notes and schedule interviews
- See the big picture across all positions or dive deep into one role

Built with modern web technologies - straightforward code that actually works.

## Tech Stack

**Backend:**
- Node.js + Express for the server
- MongoDB for storing jobs and candidates
- RESTful API design

**Frontend:**  
- React with TypeScript for UI components
- Tailwind CSS for styling
- Vite as the build tool

**Why this combination?**
- Express keeps the backend simple and maintainable
- MongoDB's flexibility suits evolving candidate data
- React components are easy to understand and reuse
- TypeScript prevents runtime bugs
- Tailwind means less CSS boilerplate

## Getting Started

### Prerequisites

- Node.js (14+)
- MongoDB (local or MongoDB Atlas cloud)
- npm

### Installation & Running

1. **Backend setup:**
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Frontend setup (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`

3. **Access the application:**
Open `http://localhost:3000` in your browser
- Default login: `admin` / `admin123`

### Environment Variables

**Backend (.env):**
```
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/thehurehub

# For MongoDB Atlas (replace placeholders with your actual values):
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@<cluster_name>.mongodb.net/thehurehub

PORT=5000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## How to Use

### Job Selection
Pick a job from the left sidebar to see all candidates for that role.

### Candidate Pipeline
See candidates organized by stage:
- **Applied** - Just submitted
- **Shortlisted** - Worth interviewing
- **Interview** - In progress  
- **Offered** - Extended an offer
- **Hired** - Accepted and on board

### Finding Candidates
- **Search** - Type a name or email
- **Filter** - By stage, experience level, or match score
- **All Candidates** - View everyone across all jobs

### Managing Candidates
Click a candidate card to:
- View their full profile
- Add interview notes
- Schedule interviews
- Update their stage
- Delete them

## API Endpoints

**Jobs:**
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get one job
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

**Candidates:**
- `GET /api/candidates` - All candidates
- `GET /api/candidates/job/:jobId` - Candidates for a job (with filters)
- `POST /api/candidates` - Add candidate
- `PUT /api/candidates/:id` - Update candidate
- `PATCH /api/candidates/:id/stage` - Move candidate to new stage
- `POST /api/candidates/:id/notes` - Add a note
- `DELETE /api/candidates/:id` - Remove candidate

**Other:**
- `GET /api/health` - Check if API is running
- `GET /api/auth/login` - Login endpoint

## Project Structure

```
backend/
├── models/          # Job and Candidate schemas
├── controllers/     # Handles API logic
├── routes/          # API endpoints
├── server.js        # Express setup
└── seed.js          # Sample data

frontend/
├── src/
│   ├── components/     # UI building blocks
│   ├── pages/          # Full pages (Dashboard, etc)
│   ├── utils/          # API client, types
│   └── styles/         # CSS
├── public/            # Static files
└── vite.config.ts    # Build configuration
```

## Database Structure

**Jobs** store: title, department, location, open positions, hiring manager, description, requirements

**Candidates** store: name, email, role, company, experience, skills, which stage they're in, match score, interview notes, interview date

Each candidate is linked to a specific job.

## Design Choices

### Separation of Backend & Frontend
Easier to develop on separately, deploy to different servers, scale independently.

### Centralized API Call Handler  
All communication with the backend goes through one file (`api.ts`), so if the backend changes, there's one place to update.

### Component-Based UI
Pieces like `CandidateCard` are used in multiple places, reducing duplicate code.

### Tailwind for Styling
Utility classes let you style without opening a separate CSS file - everything stays in one place.

### TypeScript
Catches mistakes at development time instead of shipping bugs to production.

## Known Limitations

- Authentication is basic (demo user is hardcoded)
- No real user roles or permissions
- Settings save locally only, not to database
- No image/file uploads
- No real-time sync across sessions

## What Could Be Added

- Proper authentication with password reset
- Email notifications when candidates advance
- Calendar integration for scheduling
- Resume uploads
- Analytics on hiring metrics
- LinkedIn integration
- WebSocket for live updates
- Mobile native app

## Deployment

### Deploy to Production

**Option 1: Heroku**

1. Create Heroku account and install Heroku CLI
2. Backend deployment:
```bash
cd backend
heroku create your-app-name-api
heroku config:set MONGODB_URI=mongodb+srv://...
git push heroku main
```

3. Frontend deployment:
```bash
cd frontend
heroku create your-app-name
heroku config:set VITE_API_URL=https://your-app-name-api.herokuapp.com/api
npm run build
git push heroku main
```

**Option 2: Vercel (Frontend) + Railway (Backend)**

1. Frontend on Vercel:
   - Push to GitHub
   - Connect repo to Vercel
   - Set `VITE_API_URL` environment variable
   - Deploy automatically

2. Backend on Railway:
   - Push to GitHub
   - Connect repo to Railway
   - Set `MONGODB_URI` environment variable
   - Railway deploys automatically on push

**Option 3: AWS**

1. Backend: Deploy Node app to AWS EC2 or Elastic Beanstalk
2. Frontend: Deploy to S3 + CloudFront
3. Use RDS or Atlas for MongoDB
4. Set environment variables in each service

### Production Checklist

- [ ] Change default credentials (admin/admin123)
- [ ] Enable proper authentication
- [ ] Set secure MongoDB connection string
- [ ] Use HTTPS for all connections
- [ ] Configure CORS for your domain
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Use environment variables for all secrets

## Troubleshooting

**"Cannot connect to MongoDB"**
- Check your `MONGODB_URI` in backend/.env
- If using local MongoDB, ensure it's running: `mongod`
- If using MongoDB Atlas, verify connection string is correct
- Whitelist your IP in MongoDB Atlas Network Access

**"Frontend API calls failing / CORS errors"**
- Verify backend is running on port 5000
- Check `VITE_API_URL` matches your backend URL
- Backend may need CORS configuration for your frontend URL
- Restart both frontend and backend servers

**"Styling looks broken / CSS not loading"**
- Delete `node_modules` in both backend and frontend
- Run `npm install` again
- Clear browser cache (Ctrl+Shift+Delete)
- Restart `npm run dev`

**"Port already in use"**
- Backend port 5000: `netstat -ano | findstr :5000` (Windows)
- Kill process: `taskkill /PID <PID> /F`
- Or change PORT in backend/.env

**"Package dependencies issues"**
- Update npm: `npm install -g npm@latest`
- Delete package-lock.json and reinstall: `rm package-lock.json && npm install`
- Try `npm cache clean --force`

**"Build errors in frontend"**
- Check TypeScript errors: `npm run build` shows full errors
- Delete `.vite` folder: `rm -rf .vite`
- Restart dev server completely

## Development Guide

### Running Tests

Currently no automated tests are configured. To add testing:

**Backend (with Jest):**
```bash
npm install --save-dev jest
npm test
```

**Frontend (with Vitest):**
```bash
npm install --save-dev vitest
npm run test
```

### Code Structure & Best Practices

**Backend:**
- Controllers handle business logic
- Models define database schema
- Routes connect endpoints to controllers
- middleware/ would contain authentication, logging, etc.
- API design follows REST conventions

**Frontend:**
- Components are reusable UI pieces
- Pages are full-screen views
- utils/api.ts centralizes all API calls
- utils/types.ts defines TypeScript interfaces
- styles/index.css contains global styles

### Adding New Features

**New API endpoint:**
1. Define schema in models/ if needed
2. Create controller function in controllers/
3. Add route handler in routes/
4. Test with Postman or curl

**New UI page:**
1. Create component in pages/
2. Add route in frontend routing
3. Create TypeScript type in utils/types.ts
4. Use api.ts for backend calls

### Performance Tips

- Use React.memo() for components that don't change
- Implement pagination for large candidate lists
- Add database indexing for frequently queried fields
- Cache API responses when appropriate
- Use lazy loading for route components

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages
5. Push and open a pull request

## License

This project is provided as-is for educational and recruitment purposes.

---

Built as a complete full-stack recruitment solution. The code is written to be clear, maintainable, and ready for production use.
