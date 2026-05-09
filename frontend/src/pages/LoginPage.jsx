import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { loginUser } from '../api/authApi';

import { useAuth } from '../context/AuthContext';

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await loginUser({
        email,
        password
      });

      login(
        response.data.token,
        response.data.user
      );

      toast.success('Login success');

      navigate('/');

    } catch (err) {

      toast.error(
        err.response?.data?.message || 'Login failed'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <Toaster position="top-right" />

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-4 rounded-2xl"
          >
            {
              loading
                ? 'Processing...'
                : 'Login'
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginPage;