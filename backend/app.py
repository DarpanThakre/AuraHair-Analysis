import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, AnalysisResult
from ai_service import analyze_hair_and_get_recommendations

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

with app.app_context():
    db.create_all()

@app.route('/api/submit-data', methods=['POST'])
def submit_data():
    try:
        if request.form:
            user_data = request.form.to_dict()
        elif request.json:
            user_data = request.json
        else:
            return jsonify({"error": "No data provided"}), 400

        try:
            age = int(user_data.get('age', 25))
        except ValueError:
            age = 25

        new_user = User(
            name=user_data.get('name', 'Anonymous'),
            age=age,
            gender=user_data.get('gender', 'Unknown'),
            hair_type=user_data.get('hair_type', ''),
            hair_problems=user_data.get('hair_problems', ''),
            scalp_condition=user_data.get('scalp_condition', ''),
            lifestyle_diet=user_data.get('lifestyle_diet', ''),
            lifestyle_stress=user_data.get('lifestyle_stress', ''),
            lifestyle_sleep=user_data.get('lifestyle_sleep', ''),
            budget_range=user_data.get('budget_range', 'medium')
        )
        db.session.add(new_user)
        db.session.commit()

        image_path = None
        if 'image' in request.files:
            image_file = request.files['image']
            if image_file.filename != '':
                image_path = os.path.join(UPLOAD_FOLDER, f"{new_user.id}_{image_file.filename}")
                image_file.save(image_path)
                
        # Call LLM to get BOTH analysis and recommendations
        llm_result = analyze_hair_and_get_recommendations(image_path, user_data)
        ai_stats = llm_result.get('analysis', {})
        recommendations = llm_result.get('recommendations', {})
        
        # Save Analysis Result
        analysis = AnalysisResult(
            user_id=new_user.id,
            image_path=image_path,
            hair_density=ai_stats.get('hair_density', 'Unknown'),
            scalp_health=ai_stats.get('scalp_health', 'Unknown'),
            dandruff_level=ai_stats.get('dandruff_level', 'Unknown'),
            damage_level=ai_stats.get('damage_level', 'Unknown'),
            hair_fall_stage=ai_stats.get('hair_fall_stage', 'Unknown')
        )
        db.session.add(analysis)
        db.session.commit()

        # Compile response
        response = {
            "user_id": new_user.id,
            "analysis": ai_stats,
            "recommendations": recommendations,
            "message": "Data processed successfully"
        }
        
        return jsonify(response), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
