# MOIC Leave Portal - AI Coding Agent Instructions

## Project Overview

Medical Officer In-Charge (MOIC) leave management system built with React 19, Vite, React Router DOM 7, and Tailwind CSS 4. Implements a multi-stage approval workflow for healthcare staff leave applications.

## Architecture & Data Flow

### State Management Pattern

All application state lives in `App.jsx` - **no external state management library**. State is passed down as props:

- `formData` - current leave application form state
- `applications` - user's leave history (for regular users)
- `allApplications` - all employee applications (for admin roles)
- `isLoggedIn`, `userRole` - authentication state

### 4-Stage Approval Workflow

Leave applications progress through stages tracked by `currentStage`:

1. **Stage 1 (Applied)** - Submitted by employee, visible to MOIC
2. **Stage 2 (MOIC Review)** - MOIC approved, visible to Civil Surgeon
3. **Stage 3 (CS Review)** - Civil Surgeon approved, visible to Health Dept
4. **Stage 4 (Archived)** - Final approval or rejection

**Critical**: `handleApprove()` in `App.jsx` implements progressive advancement - MOIC can only approve stage 1→2, CS can only approve stage 2→3. Each role sees filtered applications based on `currentStage`.

### Role-Based Routing

Four user roles with different access patterns:

- `doctor`, `practitioner` → `/dashboard`, `/apply-leave`
- `moic`, `cs` → `/admin` (filtered by currentStage)

Routes use `<Navigate>` for role-based redirects. Hardcoded auth: username=role.id, password="1234".

## Key Components & Patterns

### AdminPortal.jsx - List Format Convention

**Do NOT use card grids**. Applications display as horizontal list rows with:

```jsx
// Each row: Avatar + Name + ID + Dept + Leave Type + Dates + Days + Status
<div className="space-y-3">  // NOT grid layout
  <div className="bg-white rounded-lg border..."> // Row format
```

### Color Scheme - Black/Gray Only

**No teal, blue, green, or yellow** in admin interfaces. Approved conventions:

- Status badges: `bg-gray-900` (Approved), `bg-gray-200` (Pending), `bg-gray-700` (Rejected)
- Buttons: `bg-gray-900` (primary), `bg-gray-600` (secondary/reject)
- Avatars: `bg-gray-900` with `rounded-lg` (NOT rounded-full)

### Modal Pattern

All modals use backdrop blur: `backdrop-blur-sm bg-black/30`. Modal content uses sticky headers/footers:

```jsx
<div className="sticky top-0 bg-white border-b..."> // Header
<div className="sticky bottom-0 bg-gray-50 border-t..."> // Footer
```

### Date Handling

Uses `react-datepicker` with `null` initialization (NOT empty strings):

```jsx
fromDate: null,  // Correct
toDate: null,    // Correct
// NOT fromDate: ""
```

### File Uploads

Always use optional chaining for file access:

```jsx
const file = e.target.files?.[0]; // Prevents crashes
setFormData((prev) => ({ ...prev, attachments: file || null }));
```

## Development Workflow

**Start dev server**: `npm run dev` (Vite on port 5173)
**Build**: `npm run build`
**Preview**: `npm run preview`

### Component Creation Rules

1. All components in `src/components/`
2. Import in `App.jsx` and pass state as props
3. Use inline SVGs for icons (no icon library)
4. Tailwind utility classes only - no custom CSS files except `index.css` for global styles

### Styling Conventions

- Black navbar gradient: `bg-gradient-to-r from-black/80 via-black/85 to-black/90`
- Form inputs: `px-4 py-2.5` (compact), `border-gray-300`, `rounded-lg`
- Spacing: Use `space-y-4` (compact forms), `space-y-6` (dashboard sections)
- Hover effects: `hover:shadow-md` + `hover:border-gray-400` for list items

## Critical Patterns to Preserve

### Authentication Flow

Two-step login: role selection → username/password form. Role buttons ordered: Doctor, MOIC, Civil Surgeon, Practitioner.

### Approval Logic

```jsx
// MOIC sees stage 1 applications
if (userRole === "moic") return app.currentStage === 1;
// CS sees stage 2 applications (MOIC-approved)
if (userRole === "cs") return app.currentStage === 2;
```

### Empty States

Always provide informative empty states with icon + message:

```jsx
<div className="text-center py-16 bg-white rounded-lg border">
  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg...">
```

## Data Structures

### Application Object Schema

```javascript
{
  id: number,
  employeeName: string,      // Admin only
  employeeId: string,         // Admin only
  leaveType: string,          // From predefined list in App.jsx
  subject: string,
  fromDate: string,           // Format: "DD/MM/YY"
  toDate: string,             // Format: "DD/MM/YY"
  numberOfDays: number,
  status: "Pending" | "Archived",
  currentStage: 1 | 2 | 3 | 4,
  submittedDate: string,
  department: string,         // Admin only
  approvedDate?: string,      // If archived
  rejectedDate?: string       // If rejected
}
```

## When Making Changes

- **Adding new routes**: Update role-based redirects in all route guards
- **Modifying approval flow**: Update both `handleApprove()` and filter logic in AdminPortal
- **New form fields**: Add to `formData` initial state in App.jsx
- **Styling changes**: Follow black/gray monochrome scheme, avoid rounded-full for admin UI
- **List layouts**: Use `space-y-3` with horizontal rows, NOT card grids
