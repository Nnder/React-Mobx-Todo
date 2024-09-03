import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import TaskStore from './store/TaskStore.ts'
import { SelectedTask } from "./components/SelectedTask/SelectedTask.tsx";
import { RouterProvider, createHashRouter } from 'react-router-dom'


const router = createHashRouter([
  {
    path: "/",
    element: <App taskStore={TaskStore}/>,
    errorElement: <div>error</div>,
    caseSensitive: true,
    children: [
      {
        path: "/task/:id",
        element: (<SelectedTask/>),
      },
    ]
  },
], {
  basename: '/React-Mobx-Todo'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
