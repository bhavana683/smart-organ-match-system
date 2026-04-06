from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
import requests

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 🔥 MODEL DOWNLOAD LINKS (REPLACE THESE)
MODEL_URLS = {
    "kidney": "https://drive.google.com/uc?export=download&id=1sDUGCkfm76JKo_GV4L7JETqQSVcdiJvL",
    "heart": "https://drive.google.com/uc?export=download&id=1Dg2HrHqSY92nJRAcptinKSu0KHOCvMAF",
    "liver": "https://drive.google.com/uc?export=download&id=1yPZysVqOsag49iayrak-q2sVbV9-3mx1",
    "lung": "https://drive.google.com/uc?export=download&id=1UtNMewpQPPmXCErdJSovrpwVb0SIQu3W"
}

models = {}

# 🔥 Download + Load all models
for organ, url in MODEL_URLS.items():
    path = os.path.join(BASE_DIR, f"{organ}_pipeline.pkl")

    if not os.path.exists(path):
        print(f"Downloading {organ} model...")
        r = requests.get(url)
        with open(path, "wb") as f:
            f.write(r.content)

    models[organ] = joblib.load(path)
    print(f"{organ} model loaded ✅")


# ✅ Align input data with model features
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


@app.route("/")
def home():
    return "ML API running ✅"


# 🔥 IMPORTANT FOR RENDER
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=PORT)