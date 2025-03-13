
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only run this in web environment, not in Expo
if (typeof document !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}

// In Expo, the App component will be registered via App.jsx

export default App;
