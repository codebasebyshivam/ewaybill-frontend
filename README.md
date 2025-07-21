# E-Transport Frontend

A modern React application for E-Transport waybill management system with responsive design and sidebar navigation.

## Features

### 🎯 **Responsive Design**

- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for mobile devices
- Adaptive layouts for different screen sizes

### 📱 **Sidebar Navigation**

- **Dashboard**: Overview with analytics and recent waybills
- **E-Waybills**: Complete waybill management with search and filters
- **Transport**: Vehicle fleet management with maintenance tracking
- **Companies**: Business partner and client management

### 🎨 **UI Components**

- Modern card-based layouts
- Interactive tables with sorting and filtering
- Status indicators with color coding
- Search functionality across all pages
- Responsive data grids

## Pages Structure

### 1. **SelectCompany** (`/`)

- Landing page with organization selection
- Responsive design with decorative shapes
- Mobile-optimized form elements

### 2. **Dashboard** (`/app/dashboard`)

- Overview statistics and metrics
- Recent waybills table
- Performance indicators with trend analysis

### 3. **E-Waybills** (`/app/ewaybills`)

- Comprehensive waybill management
- Search and filter functionality
- Status tracking with color-coded badges
- CRUD operations interface

### 4. **Transport** (`/app/transport`)

- Fleet management with vehicle details
- Tabbed interface (Fleet, Maintenance, Drivers)
- Vehicle status tracking
- Fuel and maintenance monitoring

### 5. **Companies** (`/app/companies`)

- Business partner management
- Company profiles with contact information
- Rating system with star display
- Grid layout for easy browsing

## Navigation Features

### **Sidebar Components**

- **Responsive Design**: Collapsible on mobile, fixed on desktop
- **Active State**: Visual indicators for current page
- **User Profile**: Bottom section with user information
- **Mobile Menu**: Hamburger menu for mobile devices

### **Menu Items**

1. **Dashboard** - Overview and analytics
2. **E-Waybills** - Manage waybills
3. **Transport** - Vehicle management
4. **Companies** - Company profiles

## Technology Stack

- **React 19** with modern hooks
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Vite** for build tooling

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm dev
   ```

3. Navigate to the application:
   - Landing page: `http://localhost:5173/`
   - Main app: `http://localhost:5173/app`

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm-lg)
- **Desktop**: > 1024px (lg+)

## Mobile Optimizations

- Touch-friendly button sizes (minimum 44px)
- Responsive text sizing
- Collapsible sidebar navigation
- Optimized form elements for mobile input
- Proper spacing for thumb navigation
