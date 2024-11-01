import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

// Mock useAuth hook
jest.mock('../context/AuthProvider', () => ({
    useAuth: jest.fn(),
}));

describe('ProtectedRoute Component', () => {
    test('redirects to login if not logged in', () => {
        useAuth.mockReturnValue({ user: null, isLoggedIn: false });

        console.log(
            'Rendering ProtectedRoute component when user is not logged in...'
          );
        const { container } = render(
            <Router>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </Router>
        );
        console.log(
            'Checking if Protected Content is not present due to redirect.'
          );
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

        console.log('Protected Content is not present as expected.');
    });

    test('renders children if logged in', () => {
        useAuth.mockReturnValue({ user: { name: 'John Doe' }, isLoggedIn: true });
        console.log('Rendering ProtectedRoute component when user is logged in...');
        render(
            <Router>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </Router>
        );

        console.log('Checking if Protected Content is present for logged-in user.');
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        console.log('Protected Content is present as expected for logged-in user.');
    })
})