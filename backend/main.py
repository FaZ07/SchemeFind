from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from matcher import match_schemes, get_scheme_by_id, get_all_schemes

app = FastAPI(
    title="SchemeFind API",
    description="Find Indian government schemes you are eligible for based on your profile.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Models ──────────────────────────────────────────────────────────────────

class UserProfile(BaseModel):
    age: int = Field(..., ge=0, le=120, description="Age in years")
    gender: str = Field(..., description="Gender: male | female | other")
    annual_income: int = Field(..., ge=0, description="Annual household income in INR")
    category: str = Field(..., description="Category: general | obc | sc | st")
    occupation: str = Field(
        ...,
        description="Occupation: student | farmer | unemployed | self_employed | entrepreneur | small_business | artisan | craftsman | street_vendor | salaried | other"
    )
    state: Optional[str] = Field("all", description="State name (optional)")

class SchemeResponse(BaseModel):
    id: int
    name: str
    description: str
    ministry: str
    benefits: str
    how_to_apply: str
    official_link: str
    relevance_score: int

class MatchResult(BaseModel):
    total_found: int
    profile_summary: str
    schemes: List[dict]


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
def root():
    return {
        "status": "running",
        "message": "SchemeFind API — Find Indian government schemes you qualify for.",
        "docs": "/docs"
    }


@app.post("/match", response_model=MatchResult, tags=["Schemes"])
def match(profile: UserProfile):
    """
    Submit your profile and get a list of all government schemes you are eligible for.
    """
    gender_map = {"male": "male", "female": "female", "other": "all"}
    gender = gender_map.get(profile.gender.lower(), "all")

    results = match_schemes(
        age=profile.age,
        gender=gender,
        annual_income=profile.annual_income,
        category=profile.category.lower(),
        occupation=profile.occupation.lower(),
        state=profile.state or "all"
    )

    income_str = f"₹{profile.annual_income:,}"
    profile_summary = (
        f"{profile.age}-year-old {profile.gender} | {profile.category.upper()} | "
        f"{profile.occupation.replace('_', ' ').title()} | Income: {income_str}/yr"
    )

    return {
        "total_found": len(results),
        "profile_summary": profile_summary,
        "schemes": results
    }


@app.get("/schemes", tags=["Schemes"])
def list_all_schemes():
    """
    Get all schemes in the database.
    """
    return {"total": len(get_all_schemes()), "schemes": get_all_schemes()}


@app.get("/schemes/{scheme_id}", tags=["Schemes"])
def get_scheme(scheme_id: int):
    """
    Get details of a specific scheme by ID.
    """
    scheme = get_scheme_by_id(scheme_id)
    if not scheme:
        raise HTTPException(status_code=404, detail=f"Scheme with id {scheme_id} not found.")
    return scheme


@app.get("/occupations", tags=["Meta"])
def list_occupations():
    return {
        "occupations": [
            "student", "farmer", "unemployed", "self_employed",
            "entrepreneur", "small_business", "artisan",
            "craftsman", "street_vendor", "salaried", "other"
        ]
    }


@app.get("/categories", tags=["Meta"])
def list_categories():
    return {"categories": ["general", "obc", "sc", "st"]}
