# 🇮🇳 SchemeFind — Find Your Government Benefits

> **Discover every Indian government scheme you're eligible for — in seconds.**

Most Indians are unaware of the hundreds of government schemes they qualify for. SchemeFind solves this by letting users enter their profile (age, gender, income, category, occupation) and instantly surfacing all matching schemes with benefits and application details.



---

## ✨ Features

- 🔍 **Smart Eligibility Matching** — Rule-based matching engine with relevance scoring
- 📋 **50+ Real Schemes** — Central government schemes across agriculture, health, education, finance, housing, and more
- 💰 **Benefit Details** — Clear benefits summary for each matched scheme
- 📱 **Fully Responsive** — Works on mobile and desktop
- ⚡ **Instant Results** — No login, no sign-up, results in under a second
- 🔗 **Direct Apply Links** — One click to official government portals

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| Matching Engine | Rule-based eligibility engine with relevance scoring |
| Data | Curated JSON database of 50+ real Central Government schemes |

---

## 📁 Project Structure

```
schemefind/
├── backend/
│   ├── main.py          # FastAPI app with all routes
│   ├── matcher.py       # Eligibility matching engine
│   ├── requirements.txt
│   └── schemes/
│       └── schemes.json # Database of 50+ government schemes
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── EligibilityForm.jsx
│   │   │   ├── SchemeCard.jsx
│   │   │   └── SchemeList.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/match` | Submit profile → get eligible schemes |
| `GET` | `/schemes` | List all schemes in database |
| `GET` | `/schemes/{id}` | Get specific scheme details |
| `GET` | `/occupations` | List valid occupation values |
| `GET` | `/categories` | List valid category values |

### Sample Request

```json
POST /match
{
  "age": 22,
  "gender": "male",
  "annual_income": 200000,
  "category": "obc",
  "occupation": "student",
  "state": "all"
}
```

---

## 🗂️ Schemes Covered

Schemes from 15+ ministries including:

- 🌾 Agriculture (PM Kisan, PMFBY, KCC, Soil Health Card)
- 🏥 Health (Ayushman Bharat PM-JAY)
- 🏠 Housing (PMAY Urban & Rural)
- 💰 Finance (PMJDY, APY, PMJJBY, PMSBY, Mudra)
- 🎓 Education (NSP Scholarships, NMMS, AICTE Pragati, Rajiv Gandhi Fellowship)
- ⚡ Skill & Employment (PMKVY, DDU-GKY, Apprenticeship, PMEGP)
- 👩 Women & Child (Ujjwala, SSY, PMMVY, Beti Bachao, Mahila Shakti Kendra)
- 🏭 MSME & Startup (Vishwakarma, Stand Up India, Startup India Seed Fund)
- 🌿 Rural (MGNREGA, PMGKAY, Jal Jeevan Mission)

---

## 🤝 Contributing

Pull requests are welcome! To add more schemes, simply add entries to `backend/schemes/schemes.json` following the existing schema.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 👨‍💻 Author

**Mohamed Fazil** — AI/ML & Full Stack Developer  
[GitHub](https://github.com/FaZ07) · [Email](mailto:mohamedfazil1812700@gmail.com)
