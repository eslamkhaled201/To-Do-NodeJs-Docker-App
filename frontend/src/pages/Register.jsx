import { useState } from 'react';
import api from '../api';

export default function Register({ onAuth, goToLogin }) {
  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      onAuth(data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handle}>
          <input style={styles.input} placeholder="Full name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          <button style={styles.btn} disabled={loading}>
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>
        <p style={styles.link}>Already have an account?{' '}
          <span style={styles.anchor} onClick={goToLogin}>Log in</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' },
  card:    { background: '#fff', padding: '2rem', borderRadius: 12, width: 360, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
  title:   { marginBottom: '1.5rem', fontSize: 22, fontWeight: 600 },
  input:   { display: 'block', width: '100%', padding: '10px 12px', marginBottom: 12, border: '1px solid #ddd', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' },
  btn:     { width: '100%', padding: '11px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, cursor: 'pointer', marginTop: 4 },
  error:   { color: '#d00', marginBottom: 12, fontSize: 14 },
  link:    { marginTop: '1rem', fontSize: 14, textAlign: 'center' },
  anchor:  { color: '#0070f3', cursor: 'pointer' },
};