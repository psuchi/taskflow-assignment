# Task Management App - Design Guidelines

## Design Approach
**System Selected:** Linear + Notion hybrid approach  
Modern productivity aesthetic emphasizing clarity, efficiency, and professional polish. Clean interfaces with strong hierarchy, minimal distractions, and focus on content and actions.

## Typography System
- **Headings:** Inter or System UI stack, semibold (600) for primary headings, medium (500) for subheadings
- **Body:** Regular (400) for descriptions and content, 16px base size
- **Task titles:** Medium weight, 15-16px
- **Labels/Meta:** 13-14px, medium weight, slightly muted
- **Buttons:** Medium weight, 14-15px

## Layout & Spacing
**Spacing Units:** Use Tailwind units of 2, 3, 4, 6, 8, 12, 16  
- Component padding: p-4 to p-6
- Section spacing: gap-4 to gap-6
- Page margins: px-6 to px-8
- Vertical rhythm: space-y-6 for major sections

**Layout Structure:**
- Sidebar navigation: 240-280px fixed width on desktop, collapsible on mobile
- Main content: max-w-6xl with responsive padding
- Dashboard: Two-column layout on desktop (task list + details panel), single column on mobile
- Forms: max-w-md centered with generous spacing

## Component Library

### Navigation
- **Sidebar:** Fixed left navigation with logo, user profile section at top, main nav links, logout at bottom
- **Top Bar:** Mobile hamburger menu, page title, user avatar dropdown
- Links with icon + label, active state with subtle background highlight

### Authentication Pages
- **Layout:** Centered card (max-w-md) with generous padding (p-8)
- Form inputs stacked with space-y-4
- Primary CTA button full-width
- Link to alternate action below (e.g., "Don't have an account? Register")
- Minimal decoration, focus on form clarity

### Dashboard
- **Task List View:** Card-based layout with each task as a distinct card
- Task cards include: checkbox, title (prominent), description (truncated), status badge, action menu (3-dot)
- Search bar at top with filter dropdowns (by status)
- "Create Task" button prominently placed (top-right)
- Empty state with illustration placeholder and CTA when no tasks

### Task Cards
- Rounded corners (rounded-lg)
- Subtle border, padding p-4 to p-6
- Hover state with slight elevation
- Status badges: rounded-full px-3 py-1, small text
- Three status types: "To Do", "In Progress", "Completed"

### Forms (Task Create/Edit)
- **Modal/Slide-over:** Right-side panel (lg:w-1/3) for task creation/editing
- Inputs: Full-width with consistent height (h-10 to h-12)
- Textarea for description: min-h-32
- Labels above inputs, required indicators
- Action buttons: Save (primary) + Cancel (secondary) aligned right

### Profile Page
- Two-column layout: Profile info card (left) + Edit form (right) on desktop
- Profile card: Avatar placeholder (large circle), name, email, member since date
- Edit form: Same input styling as auth pages
- Update button at bottom of form

### UI Elements
- **Buttons:** 
  - Primary: Solid with medium weight text, px-4 py-2, rounded-md
  - Secondary: Subtle border, transparent background
  - Icon buttons: Square (h-10 w-10) with centered icon
- **Icons:** Use Heroicons (outline style for nav, solid for actions)
- **Input Fields:** border, rounded-md, px-3 py-2, focus ring
- **Dropdowns:** Consistent with input styling, chevron icon
- **Badges:** Small, rounded-full, px-2.5 py-0.5

### Data Display
- **Task Statistics:** Dashboard top section with 3-4 metric cards in grid (grid-cols-1 md:grid-cols-3)
- Each metric card: Count (large), label (small), icon
- **Empty States:** Centered icon, heading, description, CTA button

## Accessibility
- All interactive elements have focus states (ring-2)
- Form inputs have associated labels
- Sufficient contrast ratios
- Keyboard navigation support
- ARIA labels for icon-only buttons

## Animations
Minimal, purposeful animations only:
- Smooth transitions on hover states (transition-colors duration-200)
- Modal/slide-over entrance (slide-in from right)
- No page transitions or complex animations

## Images
**No hero images needed.** This is a productivity application focused on functionality. Use:
- Icon library for all interface icons (Heroicons)
- Empty state illustrations: Use placeholder comments for illustration spots
- Avatar placeholders: Circular containers with user initials

## Responsive Behavior
- **Mobile (< 768px):** Single column, hamburger nav, full-width cards, stacked forms
- **Tablet (768px - 1024px):** Collapsible sidebar, two-column dashboard
- **Desktop (> 1024px):** Fixed sidebar, multi-column layouts, slide-over panels