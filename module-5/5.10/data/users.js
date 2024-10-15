//dummy users data

const VALID_ROLES = ['admin', 'normal']
var users = [
    {
        id: 1,
        name: 'user-1',
        email: 'user1@mail.com',
        role: 'admin',
    },
    {
        id: 2,
        name: 'user-2',
        email: 'user2@mail.com',
        role: 'normal',
    },
    {
        id: 3,
        name: 'user-3',
        email: 'user3@mail.com',
        role: 'normal',
    },
    {
        id: 4,
        name: 'user-4',
        email: 'user4@mail.com',
        role: 'normal',
    },
]

const isValid = (role) => VALID_ROLES.includes(role);

//Sort user by id
function sortById (arr) {
    return arr.sort((a,b) => a.id - b.id);
}

function getUser () {
    return users;
}
//Checking if a user exists
function userExists (user) {
    const id = parseInt (user.id, 10);
    return users.find((user) => user.id === id);
}

function deleteUser (user) {
    const id = parseInt (user.id, 10);
    if (!userExists) {
        return false;
    }
    users = users.filter((user) => user.id !==id);
    return user;    
}

function updateUser (user) {
    const id = parseInt (user.id, 10);

    const origUser = users.find((x) => x.id === id);

    const fields = [ 'name', 'username', 'email'];
    for (const field of fields) {
        if (!user[field]) {
            delete user[field];
        }
    }
    const filtered = users.filter((user) => x.id !== id);

    const updated = { ...origUser, ...user };

    user = sortbyId([...filtered, ...updated]);
    return updated;
}

function getUserById (id) {
    const id = parseInt(id, 10);
    return users.find((x) => x.id === id);
}

function getUserByEmail (email) {
    return users.find((x) => x.email === email);
}

const usersMaxId = (id) => Math.max(...users.map((b) => b.id));

// Add a new entry to users array
function addUser ({ id, name, email, role='normal'}) {
    const userId = id || (usersMaxId() || 0) + 1;
    const user = { id: userId, name, email, role };
    if (!name || !email) {
        throw new Error('Either name or email is not available');
    };
    if (!isValid(role)) {
        throw new Error('Invalid role');
    };
    users = sortById([...users, user]);
    return user;
}

export {
    VALID_ROLES,
    isValid,
    sortById,
    getUser,
    userExists,
    deleteUser,
    updateUser,
    getUserByEmail,
    getUserById,
    usersMaxId,
    addUser,
}