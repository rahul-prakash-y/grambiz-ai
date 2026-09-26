from pydantic import BaseModel, Field
from typing import Optional, List



class BusinessAnalysisRequest(BaseModel):
    """
    Request schema for business viability analysis in rural/semi-urban areas.
    """
    location: str = Field(
        ..., 
        description="Target rural location, village, or district (e.g., Varanasi, UP)",
        examples=["Varanasi, UP"]
    )
    business_category: str = Field(
        ..., 
        description="Category/type of business (e.g., Dairy Farming, Organic Agro Store)",
        examples=["Dairy Farming"]
    )
    available_investment: float = Field(
        ..., 
        ge=0.0,
        description="Available investment capital in INR",
        examples=[250000.0]
    )
    target_language: Optional[str] = Field(
        default="en",
        description="Target language for the response. 'en' for English (default), 'ta' for Tamil translation.",
        examples=["en", "ta"]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "location": "Varanasi, UP",
                "business_category": "Dairy Farming",
                "available_investment": 250000.0,
                "target_language": "en"
            }
        }
    }


class FinancialCalcRequest(BaseModel):
    """
    Request schema for calculating project costs, required loans, and EMI schedules.
    """
    project_cost: float = Field(
        ..., 
        gt=0.0,
        description="Total estimated project cost in INR",
        examples=[500000.0]
    )
    available_capital: float = Field(
        ..., 
        ge=0.0,
        description="Available self-funded capital / equity in INR",
        examples=[100000.0]
    )
    interest_rate_percent: float = Field(
        ..., 
        ge=0.0,
        description="Annual loan interest rate percentage (e.g. 8.5 for 8.5%)",
        examples=[8.5]
    )
    tenure_months: int = Field(
        ..., 
        gt=0,
        description="Loan tenure in months (e.g. 36 for 3 years)",
        examples=[36]
    )
    business_category: Optional[str] = Field(
        default="Agriculture",
        description="Category of business (e.g., 'Agriculture', 'Retail', 'Manufacturing')",
        examples=["Agriculture"]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "project_cost": 500000.0,
                "available_capital": 100000.0,
                "interest_rate_percent": 8.5,
                "tenure_months": 36,
                "business_category": "Agriculture"
            }
        }
    }


class GovernmentScheme(BaseModel):
    """
    Government subsidy and loan scheme metadata.
    """
    scheme_name: str = Field(..., description="Official scheme title")
    short_code: str = Field(..., description="Short identifier (e.g., PMEGP, MUDRA)")
    subsidy_percentage: float = Field(default=0.0, description="Subsidy / grant percentage")
    max_subsidy_amount: float = Field(default=0.0, description="Maximum eligible subsidy cap in INR")
    description: str = Field(..., description="Summary of benefits and eligibility")
    eligible_agency: str = Field(..., description="Implementing or lending authority")


class FinancialCalcResponse(BaseModel):
    """
    Complete financial calculation response with funding gap, EMI, interest, and government schemes.
    """
    project_cost: float = Field(..., description="Total project setup cost")
    available_capital: float = Field(..., description="Available self-funded capital")
    funding_gap: float = Field(..., description="Calculated funding gap (0 if available capital >= cost)")
    interest_rate_percent: float = Field(..., description="Annual interest rate percentage")
    tenure_months: int = Field(..., description="Loan tenure in months")
    monthly_emi: float = Field(..., description="Monthly EMI calculated with standard amortisation formula")
    total_interest: float = Field(..., description="Total interest payable over loan tenure")
    total_payable: float = Field(..., description="Total repayment amount over tenure")
    business_category: str = Field(..., description="Target business category")
    schemes: list[GovernmentScheme] = Field(default_factory=list, description="Applicable government schemes")



class CompetitorResponse(BaseModel):
    """
    Schema for a competitor business returned by Google Places search.
    """
    name: str = Field(..., description="Name of the competitor business")
    vicinity: str = Field(..., description="Vicinity or address of the competitor")
    rating: float = Field(default=0.0, description="Average Google review rating")
    user_ratings_total: int = Field(default=0, description="Total count of Google reviews")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Kisan Dairy Center",
                "vicinity": "Near Bus Stand, Kallupatti",
                "rating": 4.5,
                "user_ratings_total": 38
            }
        }
    }


class SwotAnalysis(BaseModel):
    """
    SWOT Analysis breakdown for rural business viability.
    """
    strengths: list[str] = Field(default_factory=list, description="Operational and locational strengths")
    weaknesses: list[str] = Field(default_factory=list, description="Capital, skill, or resource limitations")
    opportunities: list[str] = Field(default_factory=list, description="Government subsidies, market gaps, or expansion prospects")
    threats: list[str] = Field(default_factory=list, description="Competition, environmental factors, or price volatility")


class AdvisoryResponse(BaseModel):
    """
    Structured AI advisory response returned by Gemini API.
    Contains exactly three keys: market_insights, swot_analysis, and risks.
    """
    market_insights: list[str] = Field(
        ..., 
        description="List of 3 bullet points detailing local market demand and customer insights"
    )
    swot_analysis: SwotAnalysis = Field(
        ..., 
        description="Object containing strengths, weaknesses, opportunities, and threats"
    )
    risks: list[str] = Field(
        ..., 
        description="List of 2 critical execution or financial risks"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "market_insights": [
                    "High daily household consumption of fresh milk and dairy products in the local Panchayat cluster.",
                    "Existing regional milk chilling center within 6km provides guaranteed daily procurement buyback.",
                    "Lack of localized value-added processing (paneer, curd, ghee) offers 35% higher profit margins."
                ],
                "swot_analysis": {
                    "strengths": [
                        "Low land lease cost and abundant green fodder availability during monsoon cycles.",
                        "Predictable daily cash flow supporting recurring operational expenses."
                    ],
                    "weaknesses": [
                        "High initial capital outlay required for high-yield crossbred livestock.",
                        "Initial operational learning curve in automated milking hygiene and disease prevention."
                    ],
                    "opportunities": [
                        "Eligible for 25% to 33% capital subsidy under NABARD's Dairy Entrepreneurship Development Scheme.",
                        "Direct delivery model to local sweet shops and village tea stalls."
                    ],
                    "threats": [
                        "Seasonal price surges in dry cattle feed and protein supplements.",
                        "Risk of bovine illnesses during unseasonal rains without immediate veterinary access."
                    ]
                },
                "risks": [
                    "Liquidity strain if dry fodder prices increase by over 20% in the summer peak.",
                    "Unplanned herd morbidity drastically reducing daily milk output below operational breakeven."
                ]
            }
        }
    }


class SchemeRecommendationRequest(BaseModel):
    """
    Request schema for rule-based government scheme recommendation.
    Filters schemes_db.json by investment amount and business category.
    """
    investment_amount: float = Field(
        ...,
        gt=0.0,
        description="User's available investment amount in INR",
        examples=[300000.0]
    )
    business_category: str = Field(
        ...,
        description="Business category to match against scheme eligibility lists (e.g., Agriculture, Manufacturing, Retail)",
        examples=["Agriculture"]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "investment_amount": 300000.0,
                "business_category": "Agriculture"
            }
        }
    }


class SchemeRecommendationResponse(BaseModel):
    """
    Response schema for a single recommended government scheme.
    """
    scheme_name: str = Field(..., description="Official name of the government scheme")
    min_investment: float = Field(..., description="Minimum eligible investment amount in INR")
    max_investment: float = Field(..., description="Maximum eligible investment amount in INR")
    eligible_categories: List[str] = Field(default_factory=list, description="List of eligible business categories")
    description: str = Field(..., description="Summary of the scheme benefits and eligibility criteria")
    official_link: str = Field(..., description="Official website URL for the scheme")

    model_config = {
        "json_schema_extra": {
            "example": {
                "scheme_name": "Pradhan Mantri MUDRA Yojana (PMMY)",
                "min_investment": 5000.0,
                "max_investment": 1000000.0,
                "eligible_categories": ["Retail", "Services", "Manufacturing"],
                "description": "Collateral-free micro-credit under three tiers for non-farm small/micro enterprises.",
                "official_link": "https://www.mudra.org.in/"
            }
        }
    }


class UserRegisterRequest(BaseModel):
    """
    User registration payload for GramBiz AI.
    """
    email: str = Field(..., description="User email address")
    password: str = Field(..., min_length=4, description="User password")
    full_name: str = Field(..., description="Full name or enterprise owner name")
    location: Optional[str] = Field(default="Madurai, Tamil Nadu", description="User village or district")


class UserLoginRequest(BaseModel):
    """
    User login payload for GramBiz AI.
    """
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")


class UserProfile(BaseModel):
    """
    Authenticated user profile summary.
    """
    id: str
    email: str
    full_name: str
    role: Optional[str] = "Agri-Enterprise Owner"
    location: Optional[str] = "Madurai, Tamil Nadu"


class TokenResponse(BaseModel):
    """
    JWT authentication token response.
    """
    access_token: str
    token_type: str = "bearer"
    user: UserProfile


class SavedPlanCreateRequest(BaseModel):
    """
    Request payload to save a business plan for the logged-in user.
    """
    business_category: str = Field(..., description="Category/type of business")
    location: str = Field(..., description="Location, village or district")
    investment_amount: float = Field(..., ge=0.0, description="Planned investment in INR")
    status: Optional[str] = Field(default="Verified DPR", description="Plan verification status")
    viability_score: Optional[int] = Field(default=92, description="Viability score (0-100)")
    advisory_data: Optional[dict] = Field(default=None, description="SWOT analysis and market insights")
    financial_data: Optional[dict] = Field(default=None, description="Financial projections, EMI & funding gap")
    schemes: Optional[List[dict]] = Field(default_factory=list, description="Government subsidies applied")


class SavedPlanResponse(BaseModel):
    """
    Full response model for a saved business plan.
    """
    id: str
    user_email: str
    business_category: str
    location: str
    investment_amount: float
    status: str
    viability_score: int
    date: str
    advisory_data: Optional[dict] = None
    financial_data: Optional[dict] = None
    schemes: Optional[List[dict]] = None
