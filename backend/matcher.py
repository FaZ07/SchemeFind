import json
import os
from typing import List, Dict, Any

SCHEMES_PATH = os.path.join(os.path.dirname(__file__), "schemes", "schemes.json")

def load_schemes() -> List[Dict[str, Any]]:
    with open(SCHEMES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def match_schemes(
    age: int,
    gender: str,
    annual_income: int,
    category: str,
    occupation: str,
    state: str = "all"
) -> List[Dict[str, Any]]:
    """
    Match user profile against scheme eligibility rules.
    Returns list of eligible schemes sorted by relevance score.
    """
    schemes = load_schemes()
    matched = []

    gender_lower = gender.lower()
    category_lower = category.lower()
    occupation_lower = occupation.lower()

    for scheme in schemes:
        eligibility = scheme["eligibility"]
        score = 0

        # Age check
        if not (eligibility["min_age"] <= age <= eligibility["max_age"]):
            continue

        # Gender check
        scheme_gender = eligibility["gender"].lower()
        if scheme_gender != "all" and scheme_gender != gender_lower:
            continue

        # Income check
        if annual_income > eligibility["income_max"]:
            continue

        # Category check
        scheme_categories = [c.lower() for c in eligibility["categories"]]
        if category_lower not in scheme_categories:
            continue

        # Occupation check
        scheme_occupations = [o.lower() for o in eligibility["occupations"]]
        if "all" not in scheme_occupations and occupation_lower not in scheme_occupations:
            continue

        # State check
        if eligibility["states"] != "all" and state.lower() not in [s.lower() for s in eligibility["states"]]:
            continue

        # Relevance scoring — the more specific a match, the higher the score
        score += 10  # base match

        if scheme_gender == gender_lower:
            score += 5  # gender-specific match bonus

        if category_lower in ["sc", "st"] and category_lower in scheme_categories and "general" not in scheme_categories:
            score += 8  # reserved category-specific scheme

        if occupation_lower in scheme_occupations:
            score += 6  # occupation-specific match

        if annual_income <= eligibility["income_max"] * 0.5:
            score += 3  # well within income bracket

        matched.append({**scheme, "relevance_score": score})

    # Sort by relevance score descending
    matched.sort(key=lambda x: x["relevance_score"], reverse=True)
    return matched


def get_scheme_by_id(scheme_id: int) -> Dict[str, Any] | None:
    schemes = load_schemes()
    for s in schemes:
        if s["id"] == scheme_id:
            return s
    return None


def get_all_schemes() -> List[Dict[str, Any]]:
    return load_schemes()
