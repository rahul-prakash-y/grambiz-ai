from pydantic import BaseModel, Field


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

    model_config = {
        "json_schema_extra": {
            "example": {
                "location": "Varanasi, UP",
                "business_category": "Dairy Farming",
                "available_investment": 250000.0
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

    model_config = {
        "json_schema_extra": {
            "example": {
                "project_cost": 500000.0,
                "available_capital": 100000.0,
                "interest_rate_percent": 8.5,
                "tenure_months": 36
            }
        }
    }


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


