import authAPI from '../api/authAPI';

export async function login({ email, password }) {
    console.log('===debug: POST to /api/login ...');
    const response = await authAPI.login({ email, password });
    console.log('===debug: API response: ', response);
    if (!response.success) {
        throw new Error ('login failed: ', response?.message || 'unknown error');
    }
    const { user, token } = response.data;
    if (!user || !token) {
        throw new Error('response user or token is empty');
    }
    console.log(`=== debug: user:`, user);
    console.log(`=== debug: token:`, token);

    console.log('login successful');
    saveAuthToken(token);
    return user;
}

export async function logout() {
    try {
        clearAuthToken();
    }   catch (err) {
        console.error('Logout error: ', err);
    }
}

const saveAuthToken = (token) => {
    console.log('FIXME: Save Auth Token');
}
const clearAuthToken = () => {
    console.log('FIXME: Clear Auth Token');
}