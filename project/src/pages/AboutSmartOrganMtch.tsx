import { HeartPulse, Brain, ShieldCheck, MapPin, Activity } from "lucide-react";

const AboutSmartOrganMatch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10">

        {/* Header */}
        <div className="text-center mb-12">
          <HeartPulse className="h-14 w-14 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">
            About Smart Organ Match
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            AI-powered donor–recipient matching system designed to save lives
            through intelligent compatibility prediction.
          </p>
        </div>

        {/* Importance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">🌍 Why Smart Organ Match?</h2>
          <p className="text-gray-700 leading-relaxed">
            Organ transplantation is time-sensitive and highly complex. Traditional
            matching methods rely primarily on blood group compatibility and waiting lists.
            Our system enhances this process by integrating Machine Learning models
            trained on real-world transplant datasets to predict compatibility and survival probability.
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">⚙️ Key Features</h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="p-5 bg-blue-50 rounded-xl">
              <Brain className="text-blue-600 mb-2" />
              <h3 className="font-semibold text-lg">AI-Based Compatibility Scoring</h3>
              <p className="text-gray-600">
                Uses trained ML pipelines to compute match probability for each donor.
              </p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl">
              <ShieldCheck className="text-green-600 mb-2" />
              <h3 className="font-semibold text-lg">Medical Feature Evaluation</h3>
              <p className="text-gray-600">
                Considers organ-specific clinical parameters instead of only blood type.
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-xl">
              <MapPin className="text-purple-600 mb-2" />
              <h3 className="font-semibold text-lg">Location Awareness</h3>
              <p className="text-gray-600">
                Displays donor location for faster decision-making.
              </p>
            </div>

            <div className="p-5 bg-orange-50 rounded-xl">
              <Activity className="text-orange-600 mb-2" />
              <h3 className="font-semibold text-lg">Dynamic Dashboards</h3>
              <p className="text-gray-600">
                Separate dashboards for donors and recipients with real-time status updates.
              </p>
            </div>

          </div>
        </section>

        {/* Organ Specific Explanation */}
        <section>
          <h2 className="text-2xl font-bold mb-8">🩺 Organ-Specific Matching Features</h2>

          {/* Kidney */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">🩵 Kidney Matching</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li><strong>Blood Group (ABO):</strong> Prevents immune rejection.</li>
              <li><strong>Creatinine / GFR:</strong> Measures kidney filtration efficiency.</li>
              <li><strong>BMI:</strong> Affects surgical compatibility.</li>
              <li><strong>Dialysis History:</strong> Indicates severity of kidney failure.</li>
            </ul>
          </div>

          {/* Liver */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-green-700 mb-3">🟢 Liver Matching</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li><strong>MELD Score:</strong> Predicts survival without transplant.</li>
              <li><strong>Bilirubin:</strong> Indicates liver dysfunction severity.</li>
              <li><strong>Serum Creatinine:</strong> Reflects kidney-liver interaction.</li>
              <li><strong>Alcohol History:</strong> Impacts liver health.</li>
              <li><strong>SGOT/SGPT:</strong> Liver enzyme markers.</li>
            </ul>
          </div>

          {/* Heart */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-red-700 mb-3">❤️ Heart Matching</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li><strong>Functional Status:</strong> Determines heart failure stage.</li>
              <li><strong>Initial Status:</strong> Measures transplant urgency.</li>
              <li><strong>Hypertension:</strong> Affects donor heart quality.</li>
              <li><strong>BMI:</strong> Influences cardiac surgical risk.</li>
            </ul>
          </div>

          {/* Lung */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-3">🫁 Lung Matching</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li><strong>Mean Pulmonary Artery Pressure:</strong> Indicates lung severity.</li>
              <li><strong>ECMO/Ventilator Status:</strong> Shows critical condition.</li>
              <li><strong>Diabetes:</strong> Affects post-transplant survival.</li>
              <li><strong>Donor Cardiac Index:</strong> Evaluates oxygen supply capacity.</li>
              <li><strong>Blood Infection:</strong> Prevents transmission risk.</li>
            </ul>
          </div>

        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          Smart Organ Match is designed to improve transplant success rates,
          reduce waiting time, and enhance fairness in donor allocation using
          advanced AI-driven compatibility scoring.
        </div>

      </div>
    </div>
  );
};

export default AboutSmartOrganMatch;