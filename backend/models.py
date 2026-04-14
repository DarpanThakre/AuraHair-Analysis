from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    hair_type = db.Column(db.String(50))
    hair_problems = db.Column(db.String(200))
    scalp_condition = db.Column(db.String(50))
    lifestyle_diet = db.Column(db.String(50))
    lifestyle_stress = db.Column(db.String(50))
    lifestyle_sleep = db.Column(db.String(50))
    budget_range = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    analysis_result = db.relationship('AnalysisResult', backref='user', uselist=False)

class AnalysisResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_path = db.Column(db.String(255))
    hair_density = db.Column(db.String(50))
    scalp_health = db.Column(db.String(50))
    dandruff_level = db.Column(db.String(50))
    damage_level = db.Column(db.String(50))
    hair_fall_stage = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
