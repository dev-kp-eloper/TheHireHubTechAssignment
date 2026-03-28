# Frontend - TheHireHub Dashboard UI

The frontend is a React + TypeScript web application that provides the user interface for the recruitment dashboard.

## What This Does

Displays:
- Job listings and selection
- Candidate pipeline Kanban board
- Job overview statistics
- Candidate profiles and details
- Search and filtering interface
- Notes and interview tracking

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

App runs on: `http://localhost:3000`

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── Navbar.tsx        # Top navigation bar
│   │   ├── Sidebar.tsx       # Job selection sidebar
│   │   ├── JobOverview.tsx   # Statistics cards
│   │   ├── CandidatePipeline.tsx # Kanban board
│   │   ├── CandidateCard.tsx # Individual candidate item
│   │   └── CandidateDrawer.tsx # Detail view panel
│   ├── pages/
│   │   └── Dashboard.tsx     # Main dashboard page
│   ├── utils/
│   │   ├── api.ts          # API calls
│   │   └── types.ts        # TypeScript interfaces
│   ├── styles/
│   │   └── index.css       # Global styles
│   ├── App.tsx             # App root component
│   └── main.tsx            # React entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind styling
├── tsconfig.json          # TypeScript config
├── package.json
├── .env.example
└── .gitignore
```

## Component Architecture

### Component Hierarchy
```
App
  ├── Layout
  │   ├── Navbar
  │   ├── Sidebar
  │   └── Dashboard
  │       ├── JobOverview
  │       ├── Filters
  │       ├── CandidatePipeline
  │       │   ├── CandidateCard (Applied)
  │       │   ├── CandidateCard (Shortlisted)
  │       │   └── ... (other stages)
  │       └── CandidateDrawer (modal)
```

### Key Components Explained

**App.tsx**
Root component that:
- Loads all jobs from API
- Manages selected job
- Passes down props to Layout

**Layout.tsx**
Wrapper component:
- Manages sidebar visibility
- Handles responsive design
- Contains Navbar and Sidebar

**Navbar.tsx**
Top navigation showing:
- Logo and app name
- Menu toggle button
- User profile

**Sidebar.tsx**
Left navigation with:
- List of all jobs
- Quick links
- User logout

**Dashboard.tsx**
Main page with:
- Filters section
- Job overview stats
- Candidate pipeline
- Candidate drawer

**JobOverview.tsx**
5 stat cards showing:
- Open positions
- Location
- Department
- Total applicants
- Hiring manager

**CandidatePipeline.tsx**
Kanban board with:
- 5 columns (Applied, Shortlisted, Interview, Offered, Hired)
- Candidate cards in each column
- Candidate count per stage

**CandidateCard.tsx**
Individual candidate display with:
- Name and company
- Match score
- Skills tags
- Last activity

**CandidateDrawer.tsx**
Side panel for candidate details:
- Full profile
- Skills tags
- Interview scheduling
- Notes section
- Update/delete actions

## Data Flow

```
1. App renders
   ↓
2. Load all jobs from /api/jobs
   ↓
3. Select first job as default
   ↓
4. Dashboard loads candidates for job
   ↓
5. Display in pipeline with filters applied
   ↓
6. Click candidate → open drawer
   ↓
7. Update candidate → API call → refresh
   ↓
8. Close drawer → back to pipeline
```

## Environment Variables

**.env file:**
```
VITE_API_URL=http://localhost:5000/api
```

This tells the app where the backend API is located.

## Styling with Tailwind CSS

Components use Tailwind utility classes:
```tsx
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
  <h2 className="text-lg font-bold text-gray-900">Title</h2>
  <p className="text-gray-600 mt-2">Description</p>
</div>
```

Key Tailwind utilities:
- `bg-*` - Background color
- `text-*` - Text color
- `p-*` - Padding
- `m-*` - Margin
- `border-*` - Borders
- `rounded-*` - Border radius
- `hover:*` - Hover effects

## TypeScript Interfaces

Defined in `utils/types.ts`:

```typescript
interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  openPositions: number;
  hiringManager: string;
}

interface Candidate {
  _id: string;
  name: string;
  email: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offered' | 'Hired';
  matchScore: number;
  skills: string[];
  notes: string[];
}
```

## API Integration

All API calls go through `utils/api.ts`:

```typescript
// Usage in components
import { jobAPI, candidateAPI } from '@/utils/api';

// Get all jobs
const response = await jobAPI.getAll();

// Get candidates for job
const candidates = await candidateAPI.getByJob(jobId);

// Update candidate
await candidateAPI.update(candidateId, { stage: 'Interview' });
```

## State Management

Uses React hooks:

```tsx
// Component state
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [filters, setFilters] = useState({ stage: '', search: '' });

// Load data on mount
useEffect(() => {
  loadCandidates();
}, [jobId, filters]);
```

## Responsive Design

Mobile-first breakpoints:

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

Using Tailwind's responsive prefixes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

## Event Handling

Common patterns:

```tsx
// Button click
<button onClick={() => setStage('Interview')}>
  Move to Interview
</button>

// Input change
<input 
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

// Form submit
<form onSubmit={(e) => {
  e.preventDefault();
  handleSave();
}}>
```

## Error Handling

Try-catch in API calls:

```tsx
try {
  const response = await candidateAPI.getByJob(jobId);
  setCandidates(response.data);
} catch (error) {
  console.error('Error loading candidates:', error);
  // Show error message to user
}
```

## Loading States

Visual feedback while loading:

```tsx
{loading ? (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
) : (
  <CandidatePipeline candidates={candidates} />
)}
```

## Empty States

User-friendly messages:

```tsx
{candidates.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-500">No candidates found</p>
    <p className="text-gray-400 text-sm">Try adjusting your filters</p>
  </div>
) : (
  <CandidatePipeline candidates={candidates} />
)}
```

## Performance Optimization

- Components only re-render when needed due to hooks
- API calls abstracted and reusable
- Conditional rendering prevent unused DOM
- Lazy loading for large candidate lists (future)

## Development Workflow

1. **Edit component** (e.g., `CandidatePipeline.tsx`)
2. **Save file** - Vite auto-refreshes in browser
3. **Check result** in `http://localhost:3000`
4. **Check console** for errors/logs

## Debugging

### React DevTools
Install browser extension to inspect:
- Component hierarchy
- Props and state
- Performance

### Browser Console
Check for JavaScript errors:
```javascript
// In components
console.log('Candidate:', candidate);
```

### Network Tab
Check API calls:
1. Open DevTools → Network
2. Perform action that makes API call
3. See request/response

## Future Enhancements

1. **Drag-and-drop** - Move candidates between stages by dragging
2. **Bulk actions** - Select multiple candidates
3. **CSV export** - Export candidate list
4. **Activity log** - See all changes to candidate
5. **Real-time updates** - WebSocket for live updates
6. **Dark mode** - Toggle theme
7. **Mobile app** - React Native version
8. **Notifications** - Alerts for important changes
9. **Calendar** - Interview scheduling
10. **Analytics** - Charts and metrics

## Common Issues

### API 404 Errors
- Check `VITE_API_URL` in `.env`
- Verify backend is running on port 5000
- Check network tab in DevTools

### Styling Issues
- Clear browser cache
- Make sure Tailwind CSS is imported
- Check class names are correct

### Loading Hangs
- Check backend logs
- Check MongoDB connection
- Check browser console

## Production Build

```bash
npm run build    # Creates optimized build
npm run preview  # Test build locally
```

Output in `dist/` folder ready for deployment.

---

**Next Steps:** Check [SETUP_GUIDE.md](../SETUP_GUIDE.md) to run the full project.
