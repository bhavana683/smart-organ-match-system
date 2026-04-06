from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
import gdown

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ✅ Google Drive Direct IDs (for gdown)
MODEL_URLS = {
    "kidney": "https://drive.google.com/uc?id=1sDUGCkfm76JKo_GV4L7JETqQSVcdiJvL",
    "heart": "https://drive.google.com/uc?id=1Dg2HrHqSY92nJRAcptinKSu0KHOCvMAF",
    "liver": "https://drive.google.com/uc?id=1yPZysVqOsag49iayrak-q2sVbV9-3mx1",
    "lung": "https://drive.google.com/uc?id=1UtNMewpQPPmXCErdJSovrpwVb0SIQu3W"
}

models = {}

print("🚀 Starting ML service...")

# 🔥 Download + Load models
for organ, url in MODEL_URLS.items():
    try:
        path = os.path.join(BASE_DIR, f"{organ}_pipeline.pkl")

        print(f"Checking {organ} model...")

        if not os.path.exists(path):
            print(f"Downloading {organ} model...")
            gdown.download(url, path, quiet=False)

        print(f"Loading {organ} model...")
        models[organ] = joblib.load(path)

        print(f"{organ} model loaded ✅")

    except Exception as e:
        print(f"❌ Error loading {organ} model: {e}")


# ✅ Align input features properly
def build_aligned_df(model, data: dict) -> pd.DataFrame:
    pre = model.named_steps.get("preprocessor", None)

    if pre is None or not hasattr(pre, "feature_names_in_"):
        return pd.DataFrame([data])

    expected_cols = list(pre.feature_names_in_)
    row = {c: None for c in expected_cols}

    for k, v in (data or {}).items():
        if k in row:
            row[k] = v

    return pd.DataFrame([row])


# ✅ Prediction API
@app.route("/predict/<organ>", methods=["POST"])
def predict(organ):
    try:
        data = request.json or {}

        if organ not in models:
            return jsonify({"error": "Invalid organ"}), 400

        model = models[organ]
        df = build_aligned_df(model, data)

        probability = model.predict_proba(df)[0][1]

        return jsonify({
            "organ": organ,
            "match_probability": float(probability)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Health check route
@app.route("/")
def home():
    return "ML API running ✅"


# 🔥 REQUIRED FOR RENDER
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    print(f"🚀 Server starting on port {PORT}...")

    app.run(host="0.0.0.0", port=PORT, debug=False)