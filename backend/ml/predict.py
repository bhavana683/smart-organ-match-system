from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

kidney_model = joblib.load(os.path.join(BASE_DIR, "kidney_pipeline.pkl"))
liver_model = joblib.load(os.path.join(BASE_DIR, "liver_pipeline.pkl"))
lung_model = joblib.load(os.path.join(BASE_DIR, "lung_pipeline.pkl"))
heart_model = joblib.load(os.path.join(BASE_DIR, "heart_pipeline.pkl"))

def build_aligned_df(model, data: dict) -> pd.DataFrame:
    """
    Create a 1-row dataframe with exactly the columns the model was trained on.
    Any missing columns are filled with None/NaN.
    Any extra keys in 'data' that are not expected are ignored.
    """
    pre = model.named_steps.get("preprocessor", None)
    if pre is None or not hasattr(pre, "feature_names_in_"):
        # Fallback: older model without feature_names_in_
        return pd.DataFrame([data])

    expected_cols = list(pre.feature_names_in_)
    row = {c: None for c in expected_cols}

    # Only set keys that exist in expected columns
    for k, v in (data or {}).items():
        if k in row:
            row[k] = v

    return pd.DataFrame([row])

@app.route("/predict/<organ>", methods=["POST"])
def predict(organ):
    data = request.json or {}

    if organ == "kidney":
        model = kidney_model
    elif organ == "liver":
        model = liver_model
    elif organ == "lung":
        model = lung_model
    elif organ == "heart":
        model = heart_model
    else:
        return jsonify({"error": "Invalid organ"}), 400

    df = build_aligned_df(model, data)
    probability = model.predict_proba(df)[0][1]

    return jsonify({"match_probability": float(probability)})

if __name__ == "__main__":
    app.run(port=5001)