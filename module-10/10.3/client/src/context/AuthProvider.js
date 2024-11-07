import { createContext, useContext, useEffect, useState } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext({
    user: undefined,
    token: undefined,
    isLoggedIn: false,
    login: async () => {},
    logout: async () => {},
});

// Define our AuthContext Provider. This can be used to wrap the app to provide access to the AuthContext.
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState({});

    // Load the previously stored login token when our app first loads.
    // This allows persistent login
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        if(user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            setIsLoggedIn(true);
        }
    }, [user]);

    async function login({ email, password }) {
        const response = await authAPI.login({ email, password });
        console.log('API response:', response);
        if (!response.success) {
            throw new Error('login failed:', response?.message || 'unknown error');
        }
        const { user, token } = response.data;
        if (!user || !token) {
            console.error('User or token missing in API response.')
            throw new Error('response user or token is empty');
        }

        // Save user and auth token to localstorage
        console.log('login successful');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);

        // Save user and auth token to state
        setUser(user);
        setToken(token);
        setIsLoggedIn(true);

        return user;
    }
    async function logout() {
        try {
            // Clear user and auth token  from localstorage
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');

            // Clear user and auth token to state
            setUser(null);
            setToken(null);
            setIsLoggedIn(false);
            console.log('logged out');
        }   catch (err) {
            console.log('Logout error:', err);
        }
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a hook we can use to access AuthContext in our components.
export const useAuth = () => useContext(AuthContext);