# Theme Documentation for HireHub

This document explains the **role-based theming system** used in HireHub, covering how themes are determined, applied, and updated across client navigation.

---

## 🎨 Theme Determination

### 1. Role-Based Themes
- The app uses three role types: `public` (landing page), `HR`, and `Recruiter`.
- Each role has a **primary color** and a shared secondary color:
  | Role      | Primary Color | Secondary Color |
  |-----------|---------------|----------------|
  | Public    | #98FF98       | #1E3A8A        |
  | HR        | #0891B2       | #1E3A8A        |
  | Recruiter | #475569       | #1E3A8A        |

### 2. How Role is Determined
- Server sets an **HttpOnly JWT cookie** named `session` on login/registration.
- The layout reads this cookie using `cookies().get('session')` and decodes the JWT to extract the role.
- If no cookie exists, the role defaults to `public`.

### 3. CSS Variables
- `globals.css` contains CSS variables for **color tokens**:
```css
:root {
  --color-primary: #0d9488;
  --color-secondary: #1e3a8a;
  --color-accent: #f59e0b;
  --color-foreground: #111827;
}

:root[data-role="hr"] {
  --color-primary: #0891B2;
  --color-secondary: #1E3A8A;
}

:root[data-role="recruiter"] {
  --color-primary: #475569;
  --color-secondary: #1E3A8A;
}
```
- The `layout.js` sets `data-role` attribute on `<html>`:
```jsx
<html lang="en" data-role={role}>
  <body>{children}</body>
</html>
```
- Components use `var(--color-primary)` and other CSS variables to automatically apply the role-specific theme.

---

## 🔄 Theme Updates on Navigation

### 1. Initial Page Load
- Layout reads the JWT cookie and sets `data-role` on `<html>`.
- Components automatically use the correct CSS variables.

### 2. Login / Logout
- On login, the app does `router.push('/workspace/hr')` or `router.push('/workspace/recruiter')`.
- After logout, the app navigates back to `/`.
- To ensure **layout re-evaluation**, `router.refresh()` is called after `router.push()` to trigger re-rendering of the layout.

### 3. Why Refresh is Needed
- **Next.js App Router layouts** do **not remount on client-side navigation**.
- Calling `router.refresh()` forces the layout to read the latest cookie and apply the correct role.
- This approach prevents stale themes after login/logout without refreshing the whole page manually.

---

## ⚡ Client-Side Considerations

- **No theme context or external library** is used (like `next-themes` or `ThemeProvider`).
- The layout reads the cookie and sets HTML attribute; CSS variables handle the rest.
- This ensures **server-driven theme** and keeps **theme synchronized with authentication state**.

### Optional LocalStorage Approach
- Storing role in `localStorage` can be used for **quick client-side access**.
- Layout can read the role from `localStorage` as a fallback.
- Pitfall: if user logs in on another tab or session, localStorage may be stale.

---

## 🏗️ Summary of Role-Based Theme Flow

1. User logs in → backend sets JWT session cookie.
2. Layout reads cookie, decodes JWT, extracts role.
3. `<html data-role={role}>` applied.
4. CSS variables automatically style components based on role.
5. On client-side navigation after login/logout:
   - `router.push(...)` navigates to new page.
   - `router.refresh()` triggers layout re-render to apply updated theme.

---

## ✅ Key Points

- **Server-driven**: Role is authoritative from JWT cookie.
- **No extra theme libraries** needed.
- **CSS variables** provide flexible styling.
- **router.refresh()** ensures immediate theme update after login/logout.
- **Landing page** always uses `public` theme.
- **HR/Recruiter workspaces** use their respective themes.
- LocalStorage can supplement role access but is **not primary source** for theme.

---

## 📌 Example Usage in Component
```jsx
<div className="min-h-screen bg-primary text-foreground">
  <h1>Welcome to your workspace</h1>
</div>
```
- `bg-primary` picks the correct color based on `data-role` on `<html>`.

