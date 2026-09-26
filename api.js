/**
 * GramBiz AI API Service
 * Connects React frontend components to the Python FastAPI backend server running on http://localhost:8000
 *
 * Functions:
 * 1. fetchCompetitors(location, category) -> connects to /api/competitors
 * 2. fetchAdvisory(location, category, investment) -> connects to /api/advisory/generate
 * 3. calculateFinance(projectCost, availableCapital, interestRate, tenure) -> connects to /api/finance/calculate
 */

export { 
  API_BASE_URL, 
  fetchCompetitors, 
  fetchAdvisory, 
  calculateFinance, 
  default 
} from './src/api.js';
