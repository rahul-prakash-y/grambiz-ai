/**
 * GramBiz AI API Service
 * Connects React frontend components to the Python FastAPI backend server running on http://localhost:8000
 */

export const API_BASE_URL = 'http://localhost:8000';

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
      headers: {
        'Content-Type': 'application/json',
      },
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
 * 
 * @param {string} location - Location string
 * @param {string} category - Business category
 * @param {number} investment - Planned capital investment in INR
 * @returns {Promise<{market_insights: string[], swot_analysis: {strengths: string[], weaknesses: string[], opportunities: string[], threats: string[]}, risks: string[]}>}
 */
export async function fetchAdvisory(location, category, investment) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/advisory/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: location || 'Kallupatti Village, Madurai',
        business_category: category || 'Grocery',
        available_investment: Number(investment) || 250000,
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
      headers: {
        'Content-Type': 'application/json',
      },
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

export default {
  fetchCompetitors,
  fetchAdvisory,
  calculateFinance,
  API_BASE_URL,
};
