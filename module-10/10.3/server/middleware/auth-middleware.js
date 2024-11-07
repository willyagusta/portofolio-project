import { isAuthenticated  } from "../controllers/auth.js";

//Validate the user is logged in with authenticated token
export function isLoggedIn(req, res, next) {
    if (!isAuthenticated(req)) {
        let user
        req.user = null;
        return res.status(403).json({ error: 'login validation failed' });
    } else {
        req.user = isAuthenticated(req);
        console.log('login validation successful');
        next();
    }
}

// Validate if user has an admin role
export function isAdmin(req, res, next) {
    // Assuming req.user is set if user is authenticated
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'admin access required' });
    }
}