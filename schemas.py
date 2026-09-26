from pydantic import BaseModel, Field
from typing import Optional


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

