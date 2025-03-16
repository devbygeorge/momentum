# Momentum - Kanban Board

Momentum is a **Next.js** web application designed as a **Kanban Board** to manage and track tasks efficiently. It is connected to **Redberry's backend** and fetches unique data using a personal public token.

---

## 🚀 Features

- **View Created Tasks** - See all tasks displayed on the Kanban board.
- **Filter Tasks** - Apply filters based on departments, priorities, and employees.
- **Create Tasks** - Open a dedicated page to create new tasks.
- **Task Details Page** - View task details, change status, and add comments.
- **Employee Management** - Add new employees using a modal.
- **Smooth UI & UX** - Uses modern styling, including custom scrollbars and intuitive inputs.

---

## 🏗 Project Structure

```
public/             # Static assets & images
src/
  ├── assets/       # Icons, images, and other UI assets
  ├── components/   # Reusable UI components
  ├── context/      # Global state management
  ├── features/     # Core business logic (task management, filters, etc.)
  ├── pages/        # Next.js pages (task creation, Kanban board, etc.)
  ├── services/     # API calls & backend interactions
  ├── styles/       # Global & component styles
  ├── types/        # TypeScript type definitions
  ├── utils/        # Helper functions
constants.ts        # App-wide constants
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js & npm/yarn installed

### Installation Steps

```sh
git clone https://github.com/devbygeorge/momentum
cd momentum
npm install   # or yarn install
```

### Running the Project

```sh
npm run dev   # or yarn dev
```

Then, open **http://localhost:3000** in your browser.


---

## 🎨 UI & Styling

- Uses **CSS modules** for scoped styles
- Implements **custom scrollbar packages** for better UX
- Styled **filters, dropdowns, and inputs** for smooth interactions

---

## 🛠 Tech Stack

- **Next.js** - React framework for server-side rendering
- **React** - UI library
- **TypeScript** - Ensures type safety
- **React Query** - Data fetching and state management
- **Axios** - HTTP client for API calls
- **Date-fns** - Date manipulation

---

## 📌 Future Improvements

- Implement **drag-and-drop** for task management
- Enhance **real-time updates** for task changes
- Introduce **dark mode** support

---

## 📜 License

Momentum is an open-source project. Feel free to contribute or modify it as needed.

---

## 👨‍💻 Author

Developed by **Giorgi Pasieshvili**

For any inquiries, feel free to contact me at **georgepasie@gmail.com**.
