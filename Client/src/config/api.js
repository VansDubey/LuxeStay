/**
 * LuxeStay API Configuration
 * Centralized management of all API endpoints and base URL
 * Uses environment variables from .env files
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * API Endpoints
 * All endpoints are prefixed with the base URL from environment variables
 */
const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    PROFILE: `${API_BASE_URL}/profile`,
  },

  // Places/Listings
  PLACES: {
    LIST: `${API_BASE_URL}/places`,
    GET_BY_ID: (id) => `${API_BASE_URL}/places/${id}`,
    USER_PLACES: `${API_BASE_URL}/user-places`,
    CREATE: `${API_BASE_URL}/places`,
    UPDATE: `${API_BASE_URL}/places`,
  },

  // Bookings
  BOOKINGS: {
    CREATE: `${API_BASE_URL}/booking`,
    GET_USER_BOOKINGS: `${API_BASE_URL}/profilebooking`,
    GET_BY_ID: (id) => `${API_BASE_URL}/booking/${id}`,
  },

  // Image Upload
  UPLOADS: {
    UPLOAD_FILE: `${API_BASE_URL}/upload`,
    UPLOAD_BY_LINK: `${API_BASE_URL}/upload-by-link`,
  },
};

/**
 * Get the API Base URL
 * @returns {string} The base URL for all API calls
 */
export const getApiBaseUrl = () => API_BASE_URL;

/**
 * Get a specific endpoint
 * @param {string} path - The endpoint key path (e.g., 'AUTH.LOGIN')
 * @returns {string} The full endpoint URL
 */
export const getEndpoint = (path) => {
  const keys = path.split('.');
  let endpoint = API_ENDPOINTS;

  for (const key of keys) {
    endpoint = endpoint[key];
    if (typeof endpoint === 'function') {
      // For dynamic endpoints, return the function
      return endpoint;
    }
  }

  return endpoint;
};

export default API_ENDPOINTS;
