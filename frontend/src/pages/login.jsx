import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://my-first-application-ygu0.onrender.com/api/auth/login', {
                email,
                password,
            })
            localStorage.setItem('token', res.data.token)
            navigate('/home')
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div
                style={{
                    width: '360px',
                    padding: '40px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                }}
            >
                <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
                    My First Application
                </h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '4px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '4px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    {error && (
                        <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>
                    )}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login