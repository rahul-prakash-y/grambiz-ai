/**
 * GramBiz AI API Service
 * Connects React frontend components to the Python FastAPI backend server running on http://localhost:8000
 */

export const API_BASE_URL = 'https://grambiz-ai.onrender.com';

/**
 * Retrieves the stored JWT authentication token from localStorage
 * @returns {string}
 */
export function getAuthToken() {
  try {
    return localStorage.getItem('grambiz_token') || '';
  } catch {
    return '';
  }
}

/**
 * Persists or clears the JWT authentication token in localStorage
 * @param {string|null} token
 */
export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem('grambiz_token', token);
    } else {
      localStorage.removeItem('grambiz_token');
    }
  } catch (e) {
    console.warn('[api.js] Failed to access localStorage:', e);
  }
}

/**
 * Builds request headers with JSON Content-Type and Bearer authorization token if present
 * @param {Object} [customHeaders={}]
 * @returns {Object}
 */
export function getAuthHeaders(customHeaders = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Connects to POST /api/competitors
 * Resolves location using Google Maps Geocoding and retrieves businesses within a 10km radius.
 * 
 * @param {string} location - Target rural location, village, or town
 * @param {string} category - Business category or sector
 * @param {number} [investment=0] - Available capital
 * @returns {Promise<Array<{name: string, vicinity: string, rating: number, user_ratings_total: number}>>}
 */
export async function fetchCompetitors(location, category, investment = 0) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/competitors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        location: location || 'Kallupatti Village, Madurai',
        business_category: category || 'Grocery',
        available_investment: Number(investment) || 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to fetch competitors (HTTP ${response.status})`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[api.js] fetchCompetitors error: ${err.message}. Using fallback if offline.`);
    throw err;
  }
}

/**
 * Connects to POST /api/advisory/generate
 * Integrates Google GenAI (Gemini) to generate structured market insights, SWOT, and risks.
 * When target_language is 'ta', the backend translates the entire response to Tamil.
 * 
 * @param {string} location - Location string
 * @param {string} category - Business category
 * @param {number} investment - Planned capital investment in INR
 * @param {string} [targetLanguage='en'] - Target language ('en' or 'ta')
 * @returns {Promise<{market_insights: string[], swot_analysis: {strengths: string[], weaknesses: string[], opportunities: string[], threats: string[]}, risks: string[]}>}
 */
export async function fetchAdvisory(location, category, investment, targetLanguage = 'en') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/advisory/generate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        location: location || 'Kallupatti Village, Madurai',
        business_category: category || 'Grocery',
        available_investment: Number(investment) || 250000,
        target_language: targetLanguage || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to generate advisory (HTTP ${response.status})`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[api.js] fetchAdvisory error: ${err.message}. Using fallback if offline.`);
    throw err;
  }
}

/**
 * Connects to POST /api/finance/calculate
 * Calculates funding gap, monthly EMI, total interest, total payable, and maps matching schemes.
 * 
 * @param {number} projectCost - Total setup cost in INR
 * @param {number} availableCapital - Self-funded equity in INR
 * @param {number} interestRate - Annual loan interest rate %
 * @param {number} tenure - Loan tenure in months
 * @param {string} [category='Agriculture'] - Business category for scheme mapping
 * @returns {Promise<{project_cost: number, available_capital: number, funding_gap: number, monthly_emi: number, total_interest: number, total_payable: number, business_category: string, schemes: Array}>}
 */
export async function calculateFinance(projectCost, availableCapital, interestRate, tenure, category = 'Agriculture') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/finance/calculate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        project_cost: Number(projectCost) || 0,
        available_capital: Number(availableCapital) || 0,
        interest_rate_percent: Number(interestRate) || 8.5,
        tenure_months: Number(tenure) || 36,
        business_category: category || 'Agriculture',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to calculate finance (HTTP ${response.status})`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[api.js] calculateFinance error: ${err.message}. Using fallback if offline.`);
    throw err;
  }
}

/**
 * Connects to POST /api/schemes
 * Rule-based recommendation engine filtering schemes_db.json by investment amount and business category.
 * 
 * @param {number} investmentAmount - User's available investment amount in INR
 * @param {string} category - Business category (e.g., Agriculture, Manufacturing, Retail)
 * @returns {Promise<Array<{scheme_name: string, min_investment: number, max_investment: number, eligible_categories: string[], description: string, official_link: string}>>}
 */
export async function fetchRecommendedSchemes(investmentAmount, category) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/schemes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        investment_amount: Number(investmentAmount) || 250000,
        business_category: category || 'Agriculture',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to fetch recommended schemes (HTTP ${response.status})`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[api.js] fetchRecommendedSchemes error: ${err.message}.`);
    throw err;
  }
}

/**
 * Authenticates user credentials against POST /api/login
 * Saves received JWT access token in localStorage.
 * 
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{access_token: string, token_type: string, user: Object}>}
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Login failed (HTTP ${response.status})`);
  }

  const data = await response.json();
  if (data.access_token) {
    setAuthToken(data.access_token);
    try {
      localStorage.setItem('grambiz_user', JSON.stringify(data.user));
    } catch {}
  }
  return data;
}

/**
 * Registers a new user account against POST /api/register
 * Saves received JWT access token in localStorage.
 * 
 * @param {Object} userData - { email, password, full_name, location }
 * @returns {Promise<{access_token: string, token_type: string, user: Object}>}
 */
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Registration failed (HTTP ${response.status})`);
  }

  const data = await response.json();
  if (data.access_token) {
    setAuthToken(data.access_token);
    try {
      localStorage.setItem('grambiz_user', JSON.stringify(data.user));
    } catch {}
  }
  return data;
}

/**
 * Fetches current authenticated user profile
 * @returns {Promise<Object>}
 */
export async function getCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile (HTTP ${response.status})`);
  }

  return await response.json();
}

/**
 * Connects to GET /api/my-plans
 * Fetches all previously saved business plans for the logged-in user.
 * 
 * @returns {Promise<Array<Object>>}
 */
export async function fetchMyPlans() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-plans`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to fetch plans (HTTP ${response.status})`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[api.js] fetchMyPlans error: ${err.message}.`);
    throw err;
  }
}

/**
 * Connects to POST /api/my-plans
 * Saves a business plan to the backend for the logged-in user.
 * 
 * @param {Object} planData
 * @returns {Promise<Object>}
 */
export async function saveBusinessPlan(planData) {
  const response = await fetch(`${API_BASE_URL}/api/my-plans`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(planData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to save plan (HTTP ${response.status})`);
  }

  return await response.json();
}

/**
 * Connects to DELETE /api/my-plans/{id}
 * Deletes a saved business plan.
 * 
 * @param {string} planId
 * @returns {Promise<Object>}
 */
export async function deleteBusinessPlan(planId) {
  const response = await fetch(`${API_BASE_URL}/api/my-plans/${planId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to delete plan (HTTP ${response.status})`);
  }

  return await response.json();
}

export default {
  getAuthToken,
  setAuthToken,
  getAuthHeaders,
  fetchCompetitors,
  fetchAdvisory,
  calculateFinance,
  fetchRecommendedSchemes,
  loginUser,
  registerUser,
  getCurrentUser,
  fetchMyPlans,
  saveBusinessPlan,
  deleteBusinessPlan,
  API_BASE_URL,
};
