/**
 * GramBiz AI API Service
 * Connects React frontend components to the Python FastAPI backend server running on http://localhost:8000
 *
 * Functions:
 * 1. fetchCompetitors(location, category) -> connects to /api/competitors
 * 2. fetchAdvisory(location, category, investment) -> connects to /api/advisory/generate
 * 3. calculateFinance(projectCost, availableCapital, interestRate, tenure) -> connects to /api/finance/calculate
 * 4. fetchRecommendedSchemes(investmentAmount, category) -> connects to /api/schemes
 * 5. loginUser(email, password) -> connects to /api/login
 * 6. registerUser(userData) -> connects to /api/register
 * 7. fetchMyPlans() -> connects to /api/my-plans
 * 8. saveBusinessPlan(planData) -> connects to /api/my-plans
 * 9. deleteBusinessPlan(planId) -> connects to /api/my-plans/{id}
 */

export { 
  API_BASE_URL, 
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
  default 
} from './src/api.js';
