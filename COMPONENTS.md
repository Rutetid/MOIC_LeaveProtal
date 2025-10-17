# MOIC Leave Portal - Component Structure

## Overview

The application has been refactored into a clean, modular component structure for better maintainability and organization.

## Component Structure

```
src/
├── App.jsx                      # Main application container
├── components/
│   ├── Navbar.jsx              # Navigation bar component
│   ├── Dashboard.jsx           # User dashboard view
│   ├── ApplyLeave.jsx          # Leave application form
│   └── AdminPortal.jsx         # MOIC admin portal
```

## Components Description

### App.jsx (Main Container)

- **Purpose**: Main application state management and routing
- **State Management**:
  - `currentView`: Controls which page is displayed (dashboard/apply/admin)
  - `adminTab`: Controls admin view tabs (pending/archived)
  - `formData`: Stores leave application form data
  - `applications`: User's leave applications
  - `allApplications`: All applications (for admin view)
- **Key Functions**:
  - `handleInputChange()`: Form input handler
  - `handleFileChange()`: File upload handler
  - `handleSubmit()`: Form submission handler
  - `handleApprove()`: Approve leave application
  - `handleReject()`: Reject leave application

### Navbar.jsx

- **Purpose**: Top navigation bar with medical theme
- **Props**:
  - `currentView`: Current active view
  - `setCurrentView`: Function to change views
- **Features**:
  - Medical-themed gradient design (teal to cyan to blue)
  - Three navigation buttons: Dashboard, Apply Leave, MOIC Portal
  - Active state styling
  - Responsive design

### Dashboard.jsx

- **Purpose**: Display user's leave applications with timeline
- **Props**:
  - `applications`: Array of user's leave applications
- **Features**:
  - Application cards with status badges
  - 4-stage timeline visualization (Applied → MOIC → Civil Surgeon → Health Dept.)
  - Status tracking with visual indicators
  - Responsive grid layout

### ApplyLeave.jsx

- **Purpose**: Leave application form with medical theme
- **Props**:
  - `formData`: Current form data
  - `handleInputChange`: Input change handler
  - `handleFileChange`: File change handler
  - `handleSubmit`: Form submit handler
  - `leaveTypes`: Array of available leave types
- **Features**:
  - 3-column layout (sidebar + form)
  - Date picker with DD/MM/YY format
  - PDF file upload
  - Half-day leave support (0.5 step)
  - Leave balance cards
  - Guidelines and help section
  - Medical-themed stethoscope SVG icon

### AdminPortal.jsx

- **Purpose**: MOIC portal for managing all applications
- **Props**:
  - `adminTab`: Current tab (pending/archived)
  - `setAdminTab`: Function to switch tabs
  - `pendingApplications`: Array of pending applications
  - `archivedApplications`: Array of archived applications
  - `handleApprove`: Function to approve applications
  - `handleReject`: Function to reject applications
- **Features**:
  - Tab navigation (Pending/Archived)
  - Employee information display
  - Application timeline
  - Approve/Reject buttons (for pending only)
  - Empty state handling
  - Status badges (Pending/Approved/Rejected)

## Data Structure

### User Application Object

```javascript
{
  id: number,
  leaveType: string,
  subject: string,
  fromDate: string,
  toDate: string,
  numberOfDays: number,
  status: string,
  currentStage: number (1-4),
  submittedDate: string
}
```

### Admin Application Object

```javascript
{
  id: number,
  employeeName: string,
  employeeId: string,
  leaveType: string,
  subject: string,
  fromDate: string,
  toDate: string,
  numberOfDays: number,
  status: string,
  currentStage: number (1-4),
  submittedDate: string,
  department: string,
  approvedDate?: string,
  rejectedDate?: string
}
```

## Timeline Stages

1. **Applied** - Initial submission
2. **MOIC** - Medical Officer In-Charge review
3. **Civil Surgeon** - Civil Surgeon approval
4. **Health Department** - Final approval

## Leave Types

- Earned Leave (EL)
- Casual Leave (CL)
- Maternity Leave
- Paternity Leave
- Childcare Leave
- Restricted Holiday
- Medical Leave
- Half Day leave
- Compensatory Off

## Styling

- **Framework**: Tailwind CSS
- **Color Scheme**: Teal (teal-500/600) & Cyan (cyan-600)
- **Theme**: Medical/Healthcare
- **Icons**: SVG-based medical icons (stethoscope, clipboard, etc.)

## Dependencies

- React 19.1.1
- react-datepicker (for date selection)
- Tailwind CSS 4.1.14

## Development

### Running the Application

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Future Enhancements

- [ ] Backend API integration
- [ ] Authentication system
- [ ] Real-time notifications
- [ ] Email notifications
- [ ] PDF generation for approved applications
- [ ] Advanced filtering and search
- [ ] Leave balance management
- [ ] Role-based access control
- [ ] Application history tracking
