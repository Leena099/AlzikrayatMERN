import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isRegister ? '/api/auth/register' : '/api/auth/login';
      const body = isRegister ? form : { email: form.email, password: form.password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onLogin(data);
      navigate('/gallery');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
          </>
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        <button className="btn" disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
        </button>
        <button type="button" className="btn" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Have an account? Login' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
}