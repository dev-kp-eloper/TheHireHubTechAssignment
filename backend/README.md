# Backend - TheHireHub API Server

The backend is a Node.js + Express REST API server that handles all data operations for the recruitment dashboard.

## What This Does

Provides REST API endpoints for:
- Managing job positions
- Managing candidate profiles
- Filtering and searching candidates
- Tracking candidate progress through hiring pipeline
- Storing notes and interview information
- Database operations with MongoDB

## Quick Start

```bash
npx install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

Server runs on: `http://localhost:5000`

## File Structure

```
backend/
├── server.js              # Main Express app setup
├── models/
│   ├── Job.js            # Job position data schema
│   └── Candidate.js      # Candidate profile schema
├── controllers/
│   ├── jobController.js  # Job logic (get, create, update, delete)
│   └── candidateController.js  # Candidate logic
├── routes/
│   ├── jobRoutes.js      # /api/jobs endpoints
│   └── candidateRoutes.js # /api/candidates endpoints
├── middleware/           # Express middlewares (empty - ready for auth)
├── package.json
├── .env.example
└── .gitignore
```

## Key Files Explained

### server.js
Main entry point that:
1. Initializes Express
2. Connects to MongoDB
3. Sets up middleware (CORS, JSON parser)
4. Registers routes
5. Starts listening on PORT

### Models (MongoDB Schemas)

**Job.js**
Defines structure of job documents:
```javascript
{
  _id: ObjectId,
  title: String,
  department: String,
  location: String,
  openPositions: Number,
  hiringManager: String,
  description: String,
  requirements: Array,
  createdAt: Date,
  updatedAt: Date
}
```

**Candidate.js**
Defines structure of candidate documents:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  currentRole: String,
  company: String,
  experience: Number,
  skills: Array,
  jobId: ObjectId (reference to Job),
  stage: String (Applied|Shortlisted|Interview|Offered|Hired),
  matchScore: Number,
  notes: Array,
  interviewStatus: String,
  interviewDate: Date,
  lastActivity: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Controllers
Business logic functions:
- `getAllJobs()` - Get all job listings
- `createJob()` - Create new job
- `getCandidatesByJob()` - Get candidates for specific job with filters
- `updateCandidate()` - Update candidate information
- `addNote()` - Add note to candidate

### Routes
Maps HTTP endpoints to controller functions:
```
GET    /api/jobs              → getAllJobs
GET    /api/jobs/:id          → getJobById
POST   /api/jobs              → createJob
PATCH  /api/candidates/:id/stage → updateCandidateStage
```

## Database Schema Relationships

```
Job (One)
  ↓ 1...*
Candidate (Many)
```

One job has many candidates applying for it.

## Environment Variables (.env)

```
MONGODB_URI=mongodb+srv://...    # MongoDB connection string
PORT=5000                         # Server port
NODE_ENV=development              # Mode (development/production)
JWT_SECRET=secret                 # For future authentication
```

## API Response Format

All endpoints return JSON:

**Success Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "stage": "Interview",
  ...
}
```

**Error Response:**
```json
{
  "error": "Error message describing what went wrong"
}
```

## Common Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/jobs | Get all jobs |
| POST | /api/jobs | Create job |
| GET | /api/candidates/job/:jobId | Get candidates for job |
| PATCH | /api/candidates/:id/stage | Move candidate to stage |
| POST | /api/candidates/:id/notes | Add note |

See [API_REFERENCE.md](../API_REFERENCE.md) for complete endpoint documentation.

## Development Workflow

1. **Edit a file** (e.g., modify a controller)
2. **Save the file** - nodemon auto-restarts server
3. **Test the endpoint** using:
   - Frontend app
   - Postman
   - curl command

## Debugging

### Enable Logs
Add `console.log()` in controllers:
```javascript
export const getCandidatesByJob = async (req, res) => {
  console.log('Fetching candidates for job:', req.params.jobId);
  console.log('Filters:', req.query);
  
  try {
    const candidates = await Candidate.find(query);
    console.log('Found candidates:', candidates.length);
    res.json(candidates);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
```

### Check MongoDB Connection
```javascript
// In server.js
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err));
```

## Future Enhancements

1. **Authentication** - Add JWT-based auth
2. **Validation** - Input validation middleware
3. **Caching** - Redis for frequent queries
4. **Rate Limiting** - Prevent API abuse
5. **Logging** - Morgan or Winston for logs
6. **Testing** - Jest or Mocha test suite
7. **API Documentation** - Swagger/OpenAPI
8. **Error Handling** - Centralized error handler
9. **Pagination** - Limit/offset for large datasets
10. **Search Optimization** - MongoDB Text Search

## Common Issues

### MongoDB Connection Failed
- Check `MONGODB_URI` in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure password is URL encoded

### Port Already in Use
- Change PORT in `.env`
- Or stop other process using port

### CORS Errors
- Check frontend URL is correct
- CORS is enabled in server.js

## Performance Tips

- Add database indexes on frequently queried fields
- Use pagination for large datasets
- Cache common queries
- Use MongoDB aggregation pipeline
- Monitor with APM tools

## Production Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB Atlas password-protected
- [ ] IP whitelist configured
- [ ] Error logging enabled
- [ ] Validation implemented
- [ ] Rate limiting added
- [ ] HTTPS enabled
- [ ] Database backups scheduled

---

**Next Steps:** Check [SETUP_GUIDE.md](../SETUP_GUIDE.md) to run the full project.
