import { useState } from 'react';
import Login    from './pages/Login';
import Register from './pages/Register';
import Todos    from './pages/Todos';

export default function App() {
  // Check if a token already exists (returning user)
  const [user, setUser]     = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      // Decode payload (not verification — API verifies on each request)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.id, email: payload.email, name: payload.name || payload.email };
    } catch { return null; }
  });
  const [page, setPage] = useState('login'); // 'login' | 'register'

  if (user) return <Todos user={user} onLogout={() => setUser(null)} />;

  if (page === 'register')
    return <Register onAuth={setUser} goToLogin={() => setPage('login')} />;

  return <Login onAuth={setUser} goToRegister={() => setPage('register')} />;
}