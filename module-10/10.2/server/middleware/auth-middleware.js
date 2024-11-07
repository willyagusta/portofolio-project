import { isAuthenticated  } from "../controllers/auth.js";

//Validate the user is logged in with authenticated token
export function isLoggedIn(req, res, next) {
    if (!isAuthenticated(req)) {
        let userl
        req.user = user;
        return res.status(403).json({ error: 'login validation failed' });
    } else {
        console.log('login validation successful');
        next();
    }
}

// Validate if user has an admin role
function isAdmin(req, res, next) {
    next();
} 