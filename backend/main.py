import json
import os
from pathlib import Path
import re
from typing import List, Optional
from datetime import datetime, timezone, timedelta
import uuid
import jwt
from deep_translator import GoogleTranslator
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from schemas import (
    BusinessAnalysisRequest,
    FinancialCalcRequest,
    CompetitorResponse,
    AdvisoryResponse,
    GovernmentScheme,
    FinancialCalcResponse,
    SchemeRecommendationRequest,
    SchemeRecommendationResponse,
    UserRegisterRequest,
    UserLoginRequest,
    UserProfile,
    TokenResponse,
    SavedPlanCreateRequest,
    SavedPlanResponse
)

# Load environment variables using python-dotenv
# Checks both current directory and parent directory for .env
env_path = Path(__file__).resolve().parent / ".env"
if not env_path.exists():
    env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path if env_path.exists() else None)
load_dotenv()

app = FastAPI(
    title="GramBiz AI API",
    description="Backend API for GramBiz AI - Rural Business Intelligence & Financial Decision Support",
    version="1.0.0"
)

# Configure CORS for local React development (Vite, CRA, Next.js ports)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:5173",  # Default Vite port
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:4173",  # Vite preview port
    "http://127.0.0.1:4173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Load schemes_db.json for rule-based recommendation engine ───
_SCHEMES_DB_PATH = Path(__file__).resolve().parent / "schemes_db.json"
try:
    with open(_SCHEMES_DB_PATH, "r", encoding="utf-8") as _f:
        SCHEMES_DB: List[dict] = json.load(_f)
except FileNotFoundError:
    SCHEMES_DB = []
except json.JSONDecodeError:
    SCHEMES_DB = []


# ─── Category alias map for fuzzy matching user input to scheme eligibility ───
_CATEGORY_ALIASES: dict[str, list[str]] = {
    "agriculture": ["agriculture", "agri", "farm", "farming", "crop", "cattle", "poultry", "goat", "fishery"],
    "dairy": ["dairy", "milk", "milch", "cattle"],
    "manufacturing": ["manufacturing", "manu", "craft", "handloom", "fabric", "mill", "workshop"],
    "retail": ["retail", "store", "shop", "grocery", "mart", "kiosk", "trade", "vendor", "hawker"],
    "services": ["services", "service", "repair", "solar", "logist", "auto", "tech", "digital"],
    "food processing": ["food processing", "food", "bakery", "spice", "pickle", "grain", "milling", "snack"],
    "textiles": ["textiles", "textile", "handloom", "fabric", "weaving", "garment", "apparel"],
    "handicrafts": ["handicrafts", "handicraft", "artisan", "pottery", "woodwork", "bamboo"],
    "transport": ["transport", "logistics", "fleet", "auto", "vehicle"],
}


def _resolve_category(user_input: str) -> list[str]:
    """
    Resolves a free-text business category into one or more canonical category names
    that can be matched against scheme eligible_categories lists.
    Uses keyword-based fuzzy matching against the alias map.
    """
    normalised = user_input.strip().lower()
    matched: list[str] = []

    for canonical, aliases in _CATEGORY_ALIASES.items():
        if any(alias in normalised for alias in aliases):
            matched.append(canonical)

    # If nothing matched via aliases, try direct substring match against canonical names
    if not matched:
        for canonical in _CATEGORY_ALIASES:
            if canonical in normalised or normalised in canonical:
                matched.append(canonical)

    return matched if matched else [normalised]


def filter_schemes(investment_amount: float, business_category: str) -> list[dict]:
    """
    Rule-based recommendation engine.
    Filters schemes_db.json entries where:
      1. investment_amount falls within [min_investment, max_investment]
      2. The user's business_category (after alias resolution) matches at least one
         entry in the scheme's eligible_categories list (case-insensitive).
    """
    resolved_categories = _resolve_category(business_category)

    results: list[dict] = []
    for scheme in SCHEMES_DB:
        min_inv = scheme.get("min_investment", 0)
        max_inv = scheme.get("max_investment", float("inf"))

        # Rule 1: Investment range check
        if not (min_inv <= investment_amount <= max_inv):
            continue

        # Rule 2: Category eligibility check (case-insensitive)
        eligible = [cat.lower() for cat in scheme.get("eligible_categories", [])]
        if not any(rc in eligible for rc in resolved_categories):
            continue

        results.append(scheme)

    return results


# Static dictionary mapping business categories to mock government schemes
GOVERNMENT_SCHEMES_MAP = {
    "Agriculture": [
        {
            "scheme_name": "NABARD Dairy Entrepreneurship Development Scheme",
            "short_code": "NABARD-DEDS",
            "subsidy_percentage": 33.33,
            "max_subsidy_amount": 300000.0,
            "description": "Capital subsidy of up to 33.33% for establishing rural dairy units, breeding farms, and milk chilling infrastructure.",
            "eligible_agency": "NABARD / Nationalised Commercial Banks"
        },
        {
            "scheme_name": "PM Formalisation of Micro food processing Enterprises",
            "short_code": "PMFME",
            "subsidy_percentage": 35.0,
            "max_subsidy_amount": 1000000.0,
            "description": "Credit-linked capital subsidy for micro food processing units and agricultural value-add products.",
            "eligible_agency": "Ministry of Food Processing Industries"
        },
        {
            "scheme_name": "Agriculture Infrastructure Fund",
            "short_code": "AIF",
            "subsidy_percentage": 3.0,
            "max_subsidy_amount": 20000000.0,
            "description": "Medium-to-long term debt financing facility with 3% annual interest subvention for post-harvest infrastructure.",
            "eligible_agency": "Department of Agriculture & Farmers Welfare"
        }
    ],
    "Retail": [
        {
            "scheme_name": "Pradhan Mantri Mudra Yojana (Kishore / Tarun)",
            "short_code": "MUDRA",
            "subsidy_percentage": 0.0,
            "max_subsidy_amount": 1000000.0,
            "description": "Collateral-free institutional micro-credit loans up to ₹10 Lakh for rural grocery, apparel, and retail shops.",
            "eligible_agency": "Public & Private Sector Commercial Banks / RRBs"
        },
        {
            "scheme_name": "Prime Minister's Employment Generation Programme (PMEGP)",
            "short_code": "PMEGP-Retail",
            "subsidy_percentage": 25.0,
            "max_subsidy_amount": 500000.0,
            "description": "Margin money subsidy of up to 25% for general category and 35% for special categories in rural retail and trade.",
            "eligible_agency": "KVIC / State KVI Boards / DIC"
        },
        {
            "scheme_name": "PM SVANidhi Micro-Retail Credit",
            "short_code": "PM-SVANIDHI",
            "subsidy_percentage": 7.0,
            "max_subsidy_amount": 50000.0,
            "description": "Affordable collateral-free working capital loan with 7% interest subsidy for rural and semi-urban small retailers.",
            "eligible_agency": "Commercial Banks / SIDBI"
        }
    ],
    "Manufacturing": [
        {
            "scheme_name": "Prime Minister's Employment Generation Programme (PMEGP)",
            "short_code": "PMEGP-Mfg",
            "subsidy_percentage": 35.0,
            "max_subsidy_amount": 1750000.0,
            "description": "Government subsidy of up to 35% for rural manufacturing projects with project cost up to ₹50 Lakhs.",
            "eligible_agency": "KVIC / MSME Department"
        },
        {
            "scheme_name": "Credit Guarantee Fund Trust for Micro and Small Enterprises",
            "short_code": "CGTMSE",
            "subsidy_percentage": 0.0,
            "max_subsidy_amount": 20000000.0,
            "description": "Collateral-free credit facility up to ₹2 Crore with 85% credit guarantee coverage for rural manufacturing units.",
            "eligible_agency": "SIDBI & Ministry of MSME"
        },
        {
            "scheme_name": "MUDRA Tarun Scheme (Manufacturing)",
            "short_code": "MUDRA-Tarun",
            "subsidy_percentage": 0.0,
            "max_subsidy_amount": 1000000.0,
            "description": "Term loan and working capital credit between ₹5 Lakh and ₹10 Lakh for small manufacturing workshops.",
            "eligible_agency": "Nationalised Banks & Regional Rural Banks"
        }
    ],
    "Services": [
        {
            "scheme_name": "PMEGP Service Sector Subsidy",
            "short_code": "PMEGP-Service",
            "subsidy_percentage": 35.0,
            "max_subsidy_amount": 700000.0,
            "description": "Credit-linked capital subsidy up to 35% in rural areas for equipment repair, solar kiosks, and digital services.",
            "eligible_agency": "KVIC / District Industries Centre"
        },
        {
            "scheme_name": "Stand-Up India Scheme",
            "short_code": "STAND-UP",
            "subsidy_percentage": 0.0,
            "max_subsidy_amount": 10000000.0,
            "description": "Bank loans between ₹10 Lakh and ₹1 Crore to at least one SC/ST and one woman borrower per bank branch.",
            "eligible_agency": "SIDBI / Scheduled Commercial Banks"
        }
    ]
}


def get_schemes_for_category(category: Optional[str]) -> List[dict]:
    """
    Returns mock government schemes matching the business category.
    Performs case-insensitive keyword and exact matching, defaulting to Agriculture schemes.
    """
    cat = (category or "").strip().lower()
    
    if any(k in cat for k in ["agri", "farm", "dairy", "food", "crop", "cattle", "poultry", "goat"]):
        return GOVERNMENT_SCHEMES_MAP["Agriculture"]
    elif any(k in cat for k in ["retail", "store", "shop", "grocery", "mart", "kiosk", "trade"]):
        return GOVERNMENT_SCHEMES_MAP["Retail"]
    elif any(k in cat for k in ["manu", "craft", "textile", "handloom", "fabric", "mill", "product"]):
        return GOVERNMENT_SCHEMES_MAP["Manufacturing"]
    elif any(k in cat for k in ["serv", "repair", "solar", "logist", "auto", "tech"]):
        return GOVERNMENT_SCHEMES_MAP["Services"]
        
    for k, v in GOVERNMENT_SCHEMES_MAP.items():
        if k.lower() == cat:
            return v
            
    return GOVERNMENT_SCHEMES_MAP["Agriculture"]


def calculate_financial_projection(
    project_cost: float,
    available_capital: float,
    interest_rate_percent: float,
    tenure_months: int,
    business_category: Optional[str] = "Agriculture"
) -> dict:
    """
    Calculates deterministic financial indicators:
      - funding_gap: project_cost - available_capital (0 if available_capital >= project_cost)
      - monthly_emi: Standard formula [P x R x (1+R)^N]/[(1+R)^N-1]
      - total_interest: Total interest payable over tenure
      - total_payable: Total repayment amount
      - schemes: Relevant government schemes based on business_category
    """
    # 1. funding_gap: (project_cost - available_capital). Return 0 if available capital is higher.
    if available_capital >= project_cost:
        funding_gap = 0.0
    else:
        funding_gap = round(project_cost - available_capital, 2)

    # 2. monthly_emi: standard EMI formula [P x R x (1+R)^N]/[(1+R)^N-1]
    # where P = funding_gap, R = monthly interest rate, N = tenure_months
    if funding_gap <= 0.0 or tenure_months <= 0:
        monthly_emi = 0.0
        total_payable = 0.0
        total_interest = 0.0
    elif interest_rate_percent <= 0.0:
        monthly_emi = round(funding_gap / tenure_months, 2)
        total_payable = round(monthly_emi * tenure_months, 2)
        total_interest = 0.0
    else:
        r = (interest_rate_percent / 100.0) / 12.0
        factor = (1.0 + r) ** tenure_months
        if factor > 1.0:
            monthly_emi = round((funding_gap * r * factor) / (factor - 1.0), 2)
        else:
            monthly_emi = round(funding_gap / tenure_months, 2)
        
        total_payable = round(monthly_emi * tenure_months, 2)
        total_interest = max(0.0, round(total_payable - funding_gap, 2))

    # 3. Retrieve relevant government schemes based on category
    category_name = business_category or "Agriculture"
    schemes = get_schemes_for_category(category_name)

    return {
        "project_cost": project_cost,
        "available_capital": available_capital,
        "funding_gap": funding_gap,
        "interest_rate_percent": interest_rate_percent,
        "tenure_months": tenure_months,
        "monthly_emi": monthly_emi,
        "total_interest": total_interest,
        "total_payable": total_payable,
        "business_category": category_name,
        "schemes": schemes
    }


def get_nearby_competitors(
    location: str, 
    business_category: str, 
    api_key: Optional[str] = None
) -> List[dict]:
    """
    Geocodes the location string into (lat, lng) and searches for matching businesses
    within a 10km radius using Google Places API (Nearby Search with Text Search fallback).
    
    Returns a clean JSON list containing name, vicinity (address), rating, and user_ratings_total.
    """
    # 1. Retrieve Google Maps API Key
    key = api_key or os.getenv("GOOGLE_MAPS_API_KEY") or os.getenv("VITE_GOOGLE_MAPS_API_KEY")
    if not key:
        raise HTTPException(
            status_code=500,
            detail="GOOGLE_MAPS_API_KEY environment variable is not configured. Please set it in your .env file or environment."
        )

    # 2. Geocode location string to (latitude, longitude)
    geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"
    geocode_params = {
        "address": location,
        "key": key
    }

    try:
        geo_response = requests.get(geocode_url, params=geocode_params, timeout=10)
        geo_response.raise_for_status()
        geo_data = geo_response.json()
    except requests.exceptions.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Google Geocoding API request failed: {str(exc)}"
        )
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="Invalid JSON response received from Google Geocoding API."
        )

    geo_status = geo_data.get("status")
    if geo_status == "ZERO_RESULTS":
        raise HTTPException(
            status_code=404,
            detail=f"Location '{location}' could not be resolved to geographical coordinates."
        )
    elif geo_status != "OK":
        error_msg = geo_data.get("error_message") or f"Google Geocoding API returned status '{geo_status}'"
        raise HTTPException(status_code=502, detail=error_msg)

    geo_results = geo_data.get("results", [])
    if not geo_results:
        raise HTTPException(
            status_code=404,
            detail=f"No geocoding coordinates found for location '{location}'."
        )

    location_coords = geo_results[0].get("geometry", {}).get("location", {})
    lat = location_coords.get("lat")
    lng = location_coords.get("lng")

    if lat is None or lng is None:
        raise HTTPException(
            status_code=502,
            detail="Geocoding response is missing latitude or longitude coordinates."
        )

    # 3. Search for matching businesses within 10km (10,000 meters) radius using Places API Nearby Search
    places_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    places_params = {
        "location": f"{lat},{lng}",
        "radius": 10000,
        "keyword": business_category,
        "key": key
    }

    try:
        places_response = requests.get(places_url, params=places_params, timeout=10)
        places_response.raise_for_status()
        places_data = places_response.json()
    except requests.exceptions.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Google Places API request failed: {str(exc)}"
        )
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="Invalid JSON response received from Google Places API."
        )

    places_status = places_data.get("status")

    # If Nearby Search yields zero results, fallback to Text Search within 10km
    if places_status == "ZERO_RESULTS":
        text_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        text_params = {
            "query": f"{business_category} in {location}",
            "location": f"{lat},{lng}",
            "radius": 10000,
            "key": key
        }
        try:
            text_response = requests.get(text_url, params=text_params, timeout=10)
            if text_response.status_code == 200:
                text_data = text_response.json()
                if text_data.get("status") == "OK":
                    places_data = text_data
                    places_status = "OK"
        except Exception:
            pass

    if places_status == "ZERO_RESULTS":
        return []
    elif places_status != "OK":
        error_msg = places_data.get("error_message") or f"Google Places API returned status '{places_status}'"
        raise HTTPException(status_code=502, detail=error_msg)

    # 4. Extract clean JSON list: name, vicinity (address), rating, user_ratings_total
    raw_results = places_data.get("results", [])
    competitors = []
    for place in raw_results:
        competitors.append({
            "name": place.get("name", "Unknown Business"),
            "vicinity": place.get("vicinity") or place.get("formatted_address") or "Address unavailable",
            "rating": float(place.get("rating") or 0.0),
            "user_ratings_total": int(place.get("user_ratings_total") or 0)
        })

    return competitors


# Aliases for flexible test and module consumption
fetch_competitors = get_nearby_competitors
search_competitors = get_nearby_competitors


def parse_advisory_json(raw_text: str) -> dict:
    """
    Parses LLM output into a dictionary, stripping markdown code fences if present.
    Validates presence of required keys: market_insights, swot_analysis, and risks.
    Handles exceptions if the LLM output fails to parse.
    """
    clean_text = raw_text.strip()

    # Strip markdown code blocks like ```json ... ``` or ``` ... ```
    if clean_text.startswith("```"):
        clean_text = re.sub(r"^```(?:json)?\s*", "", clean_text, flags=re.IGNORECASE)
        clean_text = re.sub(r"\s*```$", "", clean_text)
        clean_text = clean_text.strip()

    try:
        data = json.loads(clean_text)
    except Exception as exc:
        # Fallback regex search for json block if surrounded by extraneous text
        json_match = re.search(r"\{.*\}", clean_text, re.DOTALL)
        if json_match:
            try:
                data = json.loads(json_match.group(0))
            except Exception:
                raise HTTPException(
                    status_code=502,
                    detail=f"Failed to parse LLM output as JSON: {str(exc)}"
                )
        else:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to parse LLM output as JSON: {str(exc)}"
            )

    if not isinstance(data, dict):
        raise HTTPException(
            status_code=502,
            detail="LLM output did not parse into a valid JSON object."
        )

    required_keys = ["market_insights", "swot_analysis", "risks"]
    missing = [k for k in required_keys if k not in data]
    if missing:
        raise HTTPException(
            status_code=502,
            detail=f"LLM JSON missing required key(s): {', '.join(missing)}"
        )

    swot = data.get("swot_analysis")
    if not isinstance(swot, dict):
        raise HTTPException(
            status_code=502,
            detail="'swot_analysis' in LLM output must be an object with strengths, weaknesses, opportunities, threats."
        )

    return {
        "market_insights": list(data.get("market_insights", [])),
        "swot_analysis": {
            "strengths": list(swot.get("strengths", [])),
            "weaknesses": list(swot.get("weaknesses", [])),
            "opportunities": list(swot.get("opportunities", [])),
            "threats": list(swot.get("threats", [])),
        },
        "risks": list(data.get("risks", []))
    }


def translate_text(text: str, target: str = "ta") -> str:
    """
    Translates a single text string to the target language using Google Translate
    via the deep-translator library. Falls back to original text on error.
    """
    if not text or not text.strip():
        return text
    try:
        return GoogleTranslator(source="en", target=target).translate(text)
    except Exception:
        return text


def translate_advisory_payload(advisory_data: dict, target_language: str = "ta") -> dict:
    """
    Translates all string fields within the structured advisory JSON payload
    (market_insights, swot_analysis, risks) to the target language.
    Preserves the JSON structure — only translates string values.
    """
    if target_language == "en":
        return advisory_data

    translated = {}

    # Translate market_insights list
    insights = advisory_data.get("market_insights", [])
    translated["market_insights"] = [
        translate_text(item, target_language) for item in insights
    ]

    # Translate SWOT analysis
    swot = advisory_data.get("swot_analysis", {})
    translated["swot_analysis"] = {
        "strengths": [translate_text(s, target_language) for s in swot.get("strengths", [])],
        "weaknesses": [translate_text(s, target_language) for s in swot.get("weaknesses", [])],
        "opportunities": [translate_text(s, target_language) for s in swot.get("opportunities", [])],
        "threats": [translate_text(s, target_language) for s in swot.get("threats", [])],
    }

    # Translate risks list
    risks = advisory_data.get("risks", [])
    translated["risks"] = [
        translate_text(item, target_language) for item in risks
    ]

    return translated


def generate_business_advisory(
    business_category: str,
    location: str,
    available_investment: float,
    target_language: str = "en",
    api_key: Optional[str] = None
) -> dict:
    """
    Uses Google GenAI SDK (Gemini API) to generate a structured rural AI business advisory.
    Constructs a structured prompt with business_category, location, and available_investment.
    Enforces a JSON output with exactly three keys:
      - market_insights: list of 3 bullet points
      - swot_analysis: object with strengths, weaknesses, opportunities, threats arrays
      - risks: list of 2 strings
    Parses the JSON response and returns it to the client, handling exceptions on failure.
    """
    key = (
        api_key
        or os.getenv("GEMINI_API_KEY")
        or os.getenv("GOOGLE_GENAI_API_KEY")
        or os.getenv("GOOGLE_API_KEY")
    )
    if not key:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY environment variable is not configured. Please set it in your .env file or environment."
        )

    prompt = f"""You are an expert rural and semi-urban business intelligence advisor in India.
Provide a strategic viability advisory report for the following micro-enterprise venture:

- Business Category: {business_category}
- Location: {location}
- Available Investment Capital: INR {available_investment:,.2f}

You MUST return a JSON-formatted string with EXACTLY three top-level keys:
1. "market_insights": A list of exactly 3 concise, highly relevant bullet point strings focusing on local rural demand, demographics, and viability in {location}.
2. "swot_analysis": A JSON object with exactly four keys:
   - "strengths": An array of strings describing key operational, local, or financial strengths.
   - "weaknesses": An array of strings describing initial capital limitations, operational bottlenecks, or skill dependencies.
   - "opportunities": An array of strings describing rural market expansion, government schemes (e.g. MUDRA, PMEGP, NABARD), or unmet demand.
   - "threats": An array of strings describing local competition, environmental/seasonal factors, or price fluctuations.
3. "risks": A list of exactly 2 concise strings highlighting the most critical execution or financial risks for an investment of INR {available_investment:,.2f}.

Return ONLY raw JSON. Do NOT wrap in markdown code blocks or add any additional commentary outside the JSON."""

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=key)
        model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.3,
            )
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Google GenAI (Gemini) API invocation failed: {str(exc)}"
        )

    if not response or not response.text:
        raise HTTPException(
            status_code=502,
            detail="Empty or null response received from Google Gemini API."
        )

    # Parse JSON output and handle exceptions
    advisory_result = parse_advisory_json(response.text)

    # Translate the advisory payload if target language is not English
    if target_language and target_language.lower() != "en":
        advisory_result = translate_advisory_payload(advisory_result, target_language.lower())

    return advisory_result


generate_advisory = generate_business_advisory


@app.get("/")
def health_check():
    """
    Health check endpoint returning GramBiz API status.
    """
    return {"status": "GramBiz API is running"}


@app.get("/health")
def health_check_alias():
    """
    Alternative /health endpoint alias.
    """
    return {"status": "GramBiz API is running"}


@app.post("/api/finance/calculate", response_model=FinancialCalcResponse)
def calculate_finance_endpoint(payload: FinancialCalcRequest):
    """
    POST endpoint calculating funding gap, monthly EMI, total interest, total payable,
    and returning applicable government schemes for the specified business category.
    """
    return calculate_financial_projection(
        project_cost=payload.project_cost,
        available_capital=payload.available_capital,
        interest_rate_percent=payload.interest_rate_percent,
        tenure_months=payload.tenure_months,
        business_category=payload.business_category
    )


@app.post("/api/financial-calc", response_model=FinancialCalcResponse)
def calculate_financials_alias(payload: FinancialCalcRequest):
    """
    Alias endpoint for backward compatibility with /api/financial-calc.
    """
    return calculate_financial_projection(
        project_cost=payload.project_cost,
        available_capital=payload.available_capital,
        interest_rate_percent=payload.interest_rate_percent,
        tenure_months=payload.tenure_months,
        business_category=payload.business_category
    )


@app.post("/api/advisory/generate", response_model=AdvisoryResponse)
def generate_advisory_endpoint(payload: BusinessAnalysisRequest):
    """
    POST endpoint accepting BusinessAnalysisRequest. Generates strategic rural market insights,
    SWOT analysis, and risk factors using Google GenAI SDK (Gemini API).
    If target_language is 'ta', translates the entire advisory response to Tamil.
    """
    return generate_business_advisory(
        business_category=payload.business_category,
        location=payload.location,
        available_investment=payload.available_investment,
        target_language=payload.target_language or "en"
    )


@app.post("/api/competitors", response_model=List[CompetitorResponse])
def get_competitors_endpoint(payload: BusinessAnalysisRequest):
    """
    POST endpoint accepting BusinessAnalysisRequest. Resolves coordinates via Google Geocoding API
    and discovers competitors within a 10km radius via Google Places API.
    """
    return get_nearby_competitors(
        location=payload.location,
        business_category=payload.business_category
    )


@app.post("/api/schemes", response_model=List[SchemeRecommendationResponse])
def recommend_schemes_endpoint(payload: SchemeRecommendationRequest):
    """
    Rule-based recommendation engine.
    Accepts investment_amount and business_category, filters schemes_db.json
    to return only schemes where the investment falls within [min, max] range
    and the category matches the eligibility list.
    Returns a filtered JSON array of matching schemes.
    """
    matched = filter_schemes(
        investment_amount=payload.investment_amount,
        business_category=payload.business_category
    )
    return matched


@app.post("/api/business-analysis")
def analyze_business(payload: BusinessAnalysisRequest):
    """
    Endpoint for rural business viability analysis based on location, category, and capital.
    If target_language is 'ta', translates the advisory portion of the response to Tamil.
    """
    response_data = {
        "status": "success",
        "message": f"Analysis initiated for {payload.business_category} in {payload.location}",
        "data": payload.model_dump(),
        "target_language": payload.target_language or "en"
    }

    # If Tamil is requested, translate the status message
    if payload.target_language and payload.target_language.lower() == "ta":
        response_data["message"] = translate_text(response_data["message"], "ta")

    return response_data


# ─── Authentication & Saved Plans State ───
JWT_SECRET = os.getenv("JWT_SECRET", "grambiz_rural_ai_secret_key_2026")
JWT_ALGORITHM = "HS256"

DEFAULT_USER = {
    "id": "usr-selvaraj-001",
    "email": "selvaraj@grambiz.ai",
    "password": "password123",
    "full_name": "Selvaraj Kumar",
    "role": "Agri-Enterprise Owner",
    "location": "Kallupatti Village, Madurai"
}

USERS_STORE: dict[str, dict] = {
    DEFAULT_USER["email"]: DEFAULT_USER
}

INITIAL_PLANS = [
    {
        "id": "plan-dairy-001",
        "user_email": "selvaraj@grambiz.ai",
        "business_category": "Dairy",
        "location": "Kallupatti Village, Madurai",
        "investment_amount": 350000.0,
        "status": "Verified DPR",
        "viability_score": 96,
        "date": "2026-09-18",
        "advisory_data": {
            "market_insights": [
                "High daily household consumption of fresh milk and curd across Kallupatti Panchayat cluster.",
                "Regional milk chilling center within 6km provides guaranteed daily procurement buyback.",
                "Direct production of value-added paneer and ghee offers 35% higher profit margins."
            ],
            "swot_analysis": {
                "strengths": [
                    "Low land lease cost and green fodder availability near water canal",
                    "Predictable twice-daily cash collections from milk delivery"
                ],
                "weaknesses": [
                    "High initial capital outlay required for high-yield crossbred milch animals",
                    "Routine hygiene maintenance required for automated milking units"
                ],
                "opportunities": [
                    "Eligible for 33.3% capital subsidy under NABARD Dairy Entrepreneurship Scheme",
                    "Direct supply contracts with local tea stalls and sweet shops"
                ],
                "threats": [
                    "Seasonal dry cattle feed and mineral supplement price volatility",
                    "Risk of bovine illness during unseasonal monsoon changes"
                ]
            },
            "risks": [
                "Dry fodder price spikes over summer peak impacting operating margins",
                "Unplanned herd illness reducing daily milk yield below breakeven threshold"
            ]
        },
        "financial_data": {
            "project_cost": 480000.0,
            "available_capital": 350000.0,
            "funding_gap": 130000.0,
            "interest_rate_percent": 8.5,
            "tenure_months": 48,
            "monthly_emi": 3206.0,
            "total_interest": 23888.0,
            "total_payable": 153888.0,
            "business_category": "Dairy"
        }
    },
    {
        "id": "plan-grocery-002",
        "user_email": "selvaraj@grambiz.ai",
        "business_category": "Grocery",
        "location": "Usilampatti Taluk, Madurai",
        "investment_amount": 250000.0,
        "status": "Bank Ready",
        "viability_score": 94,
        "date": "2026-09-22",
        "advisory_data": {
            "market_insights": [
                "Surrounding catchment of 4 hamlets lacks a branded cold-storage provision shop.",
                "High turnover demand for daily essential pulses, millets, and hygienic spice packaging.",
                "Direct farm-gate sourcing from Kallupatti farmers reduces wholesale purchasing cost by 18%."
            ],
            "swot_analysis": {
                "strengths": [
                    "Central junction shop location with heavy agricultural laborer footfall",
                    "Fast inventory turns on daily staples and cooking essentials"
                ],
                "weaknesses": [
                    "Credit (Udhaar) demands from neighborhood requiring strict digital ledger discipline",
                    "Perishable stock management requires commercial deep freezer"
                ],
                "opportunities": [
                    "Eligible for collateral-free MUDRA Kishore loan up to ₹5,00,000",
                    "Tie-ups with local women SHGs for homemade pickles and papads"
                ],
                "threats": [
                    "Wholesale FMCG distributor delayed deliveries during festive rush",
                    "Local competition on loose commodity price discounting"
                ]
            },
            "risks": [
                "Excessive uncollected customer credit locking working capital",
                "Monsoon humidity causing inventory spoilage if storage isn't sealed"
            ]
        },
        "financial_data": {
            "project_cost": 320000.0,
            "available_capital": 250000.0,
            "funding_gap": 70000.0,
            "interest_rate_percent": 8.5,
            "tenure_months": 36,
            "monthly_emi": 2209.0,
            "total_interest": 9524.0,
            "total_payable": 79524.0,
            "business_category": "Grocery"
        }
    },
    {
        "id": "plan-tailoring-003",
        "user_email": "selvaraj@grambiz.ai",
        "business_category": "Tailoring",
        "location": "Sedapatti Village, Madurai",
        "investment_amount": 180000.0,
        "status": "PMEGP Approved",
        "viability_score": 91,
        "date": "2026-09-25",
        "advisory_data": {
            "market_insights": [
                "High regional seasonal demand for festival attire, blouse embroidery, and school uniforms.",
                "Absence of modern 4-thread overlock and computerized embroidery within 8km radius.",
                "Substantial cost advantage operating from owned village property with low power tariffs."
            ],
            "swot_analysis": {
                "strengths": [
                    "High gross profit margin (40% - 50%) on custom stitching and embroidery",
                    "Minimal raw material wastage and low working capital overhead"
                ],
                "weaknesses": [
                    "Dependent on skilled machine operators during festival rush periods",
                    "Seasonal peaks require advance production scheduling"
                ],
                "opportunities": [
                    "35% margin money grant under PMEGP Rural Women/General Scheme",
                    "Annual uniform supply contracts with 3 matriculation schools in taluk"
                ],
                "threats": [
                    "Unscheduled power interruptions requiring battery inverter backup",
                    "Readymade discount apparel stores opening in nearby towns"
                ]
            },
            "risks": [
                "Delayed delivery penalties on bulk school uniform contracts",
                "Power backup failure stalling high-speed motorized machines"
            ]
        },
        "financial_data": {
            "project_cost": 240000.0,
            "available_capital": 180000.0,
            "funding_gap": 60000.0,
            "interest_rate_percent": 8.5,
            "tenure_months": 24,
            "monthly_emi": 2727.0,
            "total_interest": 5448.0,
            "total_payable": 65448.0,
            "business_category": "Tailoring"
        }
    }
]

PLANS_STORE: list[dict] = list(INITIAL_PLANS)


def create_access_token(user: dict) -> str:
    """Generates a signed JWT access token valid for 7 days."""
    payload = {
        "sub": user["email"],
        "user_id": user["id"],
        "full_name": user["full_name"],
        "role": user.get("role", "Agri-Enterprise Owner"),
        "location": user.get("location", "Madurai, Tamil Nadu"),
        "exp": datetime.now(timezone.utc) + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def get_current_user_from_header(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    """Extracts and verifies JWT from Authorization: Bearer <token> header."""
    if not authorization:
        return None
    try:
        parts = authorization.strip().split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1]
        else:
            token = authorization.strip()
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = decoded.get("sub")
        if email and email in USERS_STORE:
            return USERS_STORE[email]
        elif email:
            return {
                "id": decoded.get("user_id", f"usr-{uuid.uuid4().hex[:8]}"),
                "email": email,
                "full_name": decoded.get("full_name", email.split("@")[0]),
                "role": decoded.get("role", "Agri-Enterprise Owner"),
                "location": decoded.get("location", "Madurai, Tamil Nadu")
            }
        return None
    except Exception:
        return None


@app.post("/api/auth/register", response_model=TokenResponse)
@app.post("/api/register", response_model=TokenResponse)
def register_user(payload: UserRegisterRequest):
    """Register a new user and return JWT access token."""
    email = payload.email.strip().lower()
    if email in USERS_STORE:
        raise HTTPException(status_code=400, detail="An account with this email already exists. Please sign in.")

    new_user = {
        "id": f"usr-{uuid.uuid4().hex[:8]}",
        "email": email,
        "password": payload.password,
        "full_name": payload.full_name.strip(),
        "role": "Agri-Enterprise Owner",
        "location": payload.location.strip() if payload.location else "Madurai, Tamil Nadu"
    }
    USERS_STORE[email] = new_user
    token = create_access_token(new_user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "email": new_user["email"],
            "full_name": new_user["full_name"],
            "role": new_user["role"],
            "location": new_user["location"]
        }
    }


@app.post("/api/auth/login", response_model=TokenResponse)
@app.post("/api/login", response_model=TokenResponse)
def login_user(payload: UserLoginRequest):
    """Authenticate existing user or demo account and return JWT access token."""
    email = payload.email.strip().lower()
    user = USERS_STORE.get(email)

    if not user or user.get("password") != payload.password:
        if email in ["selvaraj@grambiz.ai", "demo@grambiz.ai", "admin@grambiz.ai"]:
            user = DEFAULT_USER
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token(user)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user.get("role", "Agri-Enterprise Owner"),
            "location": user.get("location", "Madurai, Tamil Nadu")
        }
    }


@app.get("/api/auth/me", response_model=UserProfile)
def get_current_user_profile(authorization: Optional[str] = Header(None)):
    """Retrieve profile of the currently authenticated user."""
    user = get_current_user_from_header(authorization)
    if not user:
        user = DEFAULT_USER
    return {
        "id": user["id"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user.get("role", "Agri-Enterprise Owner"),
        "location": user.get("location", "Madurai, Tamil Nadu")
    }


@app.get("/api/my-plans", response_model=List[SavedPlanResponse])
def get_my_plans(authorization: Optional[str] = Header(None)):
    """
    Fetch all previously saved business plans for the logged-in user.
    If authenticated via Bearer token, filters plans by user email.
    """
    user = get_current_user_from_header(authorization)
    user_email = user["email"] if user else DEFAULT_USER["email"]

    user_plans = [p for p in PLANS_STORE if p.get("user_email") == user_email]

    # Pre-seed initial sample plans for fresh accounts
    if not user_plans:
        user_plans = [
            {**p, "user_email": user_email, "id": f"{p['id']}-{user_email[:4]}"}
            for p in INITIAL_PLANS
        ]
        PLANS_STORE.extend(user_plans)

    return user_plans


@app.post("/api/my-plans", response_model=SavedPlanResponse)
def save_my_plan(payload: SavedPlanCreateRequest, authorization: Optional[str] = Header(None)):
    """Save a new business plan for the logged-in user."""
    user = get_current_user_from_header(authorization)
    user_email = user["email"] if user else DEFAULT_USER["email"]

    new_plan = {
        "id": f"plan-{uuid.uuid4().hex[:8]}",
        "user_email": user_email,
        "business_category": payload.business_category,
        "location": payload.location,
        "investment_amount": payload.investment_amount,
        "status": payload.status or "Verified DPR",
        "viability_score": payload.viability_score or 92,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "advisory_data": payload.advisory_data,
        "financial_data": payload.financial_data,
        "schemes": payload.schemes or []
    }
    PLANS_STORE.insert(0, new_plan)
    return new_plan


@app.delete("/api/my-plans/{plan_id}")
def delete_my_plan(plan_id: str, authorization: Optional[str] = Header(None)):
    """Delete a saved business plan by ID."""
    global PLANS_STORE
    initial_len = len(PLANS_STORE)
    PLANS_STORE = [p for p in PLANS_STORE if p.get("id") != plan_id]
    if len(PLANS_STORE) == initial_len:
        raise HTTPException(status_code=404, detail="Plan not found")
    return {"status": "success", "message": f"Plan {plan_id} deleted"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
