import { useState, useEffect } from 'react';
import api from '../api';

export default function Todos({ user, onLogout }) {
  const [todos, setTodos]   = useState([]);
  const [title, setTitle]   = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/todos')
      .then(r => setTodos(r.data))
      .finally(() => setLoading(false));
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const { data } = await api.post('/todos', { title });
    setTodos(prev => [data, ...prev]);
    setTitle('');
  };

  const toggle = async (todo) => {
    await api.put(`/todos/${todo.id}`, { completed: !todo.completed });
    setTodos(prev => prev.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
  };

  const remove = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const logout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>My Todos</h1>
          <p style={{ margin: 0, fontSize: 13, color: '#666' }}>Logged in as {user.name}</p>
        </div>
        <button onClick={logout} style={{ padding: '7px 14px', border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13 }}>
          Log out
        </button>
      </div>

      <form onSubmit={add} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new todo…"
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
        />
        <button type="submit" style={{ padding: '10px 18px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {loading && <p style={{ color: '#999' }}>Loading…</p>}

      {todos.map(todo => (
        <div key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
          <input type="checkbox" checked={!!todo.completed} onChange={() => toggle(todo)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
          <span style={{ flex: 1, fontSize: 15, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : '#111' }}>
            {todo.title}
          </span>
          <button onClick={() => remove(todo.id)} style={{ background: 'none', border: 'none', color: '#d00', cursor: 'pointer', fontSize: 18 }}>
            ×
          </button>
        </div>
      ))}

      {!loading && todos.length === 0 && (
        <p style={{ color: '#999', textAlign: 'center', marginTop: 40 }}>No todos yet. Add one above!</p>
      )}
    </div>
  );
}