import { User } from '../types';

// --- MOCK DATABASE ---
// In a real application, this would be a database call.
// For now, we'll use localStorage to simulate a user database.

const getMockUsers = (): Record<string, Omit<User, 'id'>> => {
  try {
    const users = localStorage.getItem('mock_users');
    return users ? JSON.parse(users) : {};
  } catch {
    return {};
  }
};

const saveMockUsers = (users: Record<string, Omit<User, 'id'>>) => {
  localStorage.setItem('mock_users', JSON.stringify(users));
};

// --- MOCK SESSION MANAGEMENT ---

export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const setCurrentUser = (user: User) => {
  localStorage.setItem('current_user', JSON.stringify(user));
};

const removeCurrentUser = () => {
  localStorage.removeItem('current_user');
};

// --- AUTHENTICATION FUNCTIONS ---

/**
 * Simulates user registration.
 * In development, you can register 'test@user.com' with password 'password'.
 */
export const register = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();
      if (users[email]) {
        return reject(new Error('Email already in use.'));
      }
      
      const newUser: User = { id: `user_${Date.now()}`, email };
      users[email] = { email };
      saveMockUsers(users);
      setCurrentUser(newUser);

      resolve(newUser);
    }, 500);
  });
};

/**
 * Simulates user login.
 * Hardcoded credentials for development: test@user.com / password
 */
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Hardcode one user for easy testing, but also check registered users.
      if (email === 'test@user.com' && password === 'password') {
        const user: User = { id: 'user_test', email };
        setCurrentUser(user);
        return resolve(user);
      }
      
      const users = getMockUsers();
      if (users[email]) {
        // In a real app, you'd check a hashed password. Here, any password works for mock users.
        const user: User = { id: `user_${email}`, email };
        setCurrentUser(user);
        return resolve(user);
      }
      
      return reject(new Error('Invalid email or password.'));
    }, 500);
  });
};

/**
 * Simulates user logout.
 */
export const logout = () => {
  removeCurrentUser();
};
