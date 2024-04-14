// Implement your authentication logic here

export const login = (email, password) => {
    // Make an API call or use local storage to handle login
  };
  
export const register = (email, password) => {
// Make an API call or use local storage to handle registration
};

export const logout = () => {
// Remove authentication token or clear local storage
};


export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    // Add your logic to validate the token here
    return !!token; // Return true if token exists, false otherwise
  };