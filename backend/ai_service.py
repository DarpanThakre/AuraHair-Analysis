import os
import json
import urllib.parse
import google.generativeai as genai
from PIL import Image

def analyze_hair_and_get_recommendations(image_path, user_data):
    """
    Uses Google Gemini Vision API to fully analyze the scalp AND generate completely 
    tailored routines, tips, and real Indian product recommendations.
    """
    api_key = os.getenv("GEMINI_API_KEY", "AIzaSyCBxVmSl5tbrnTX-SH6SkRbtj1kYOFZReU")
    genai.configure(api_key=api_key)
    
    budget = user_data.get('budget_range', 'Medium')
    
    prompt = f"""
    You are an expert trichologist and a highly knowledgeable cosmetic product AI.
    The user provided the following questionnaire details:
    - Gender: {user_data.get('gender')}
    - Hair Type: {user_data.get('hair_type')}
    - Scalp Condition: {user_data.get('scalp_condition')}
    - Hair Problems: {user_data.get('hair_problems')}
    - Budget Range: {budget} (Provide products fitting this budget in Indian Rupees ₹)
    
    1. Analyze the provided scalp/hair image along with the questionnaire, and determine the clinical metrics.
    2. Curate a personalized routine and diet tips.
    3. Recommend 4 REAL, highly effective products available in the Indian market (Shampoo, Conditioner, Oil, Serum) that perfectly target the conditions seen in the image/text, respecting their '{budget}' budget.
    
    Return ONLY a valid JSON object matching this exact format exactly, with no markdown:
    {{
      "analysis": {{
        "hair_density": "Low / Medium / High",
        "scalp_health": "Healthy / Dry / Irritated / Oily / etc",
        "dandruff_level": "None / Mild / Moderate / Severe",
        "damage_level": "Low / Medium / High",
        "hair_fall_stage": "Stage 1 (Normal) / Stage 3... etc"
      }},
      "recommendations": {{
        "products": [
          {{
            "category": "Shampoo", "name": "Real Brand Name and Product Name", "brand": "Brand", "price": "₹...", "rating": "8.5", "reason": "Why...", "pros": "...", "cons": "..."
          }},
          {{
            "category": "Conditioner", "name": "...", "brand": "...", "price": "₹...", "rating": "...", "reason": "...", "pros": "...", "cons": "..."
          }},
          {{
            "category": "Oil", "name": "...", "brand": "...", "price": "₹...", "rating": "...", "reason": "...", "pros": "...", "cons": "..."
          }},
          {{
            "category": "Serum", "name": "...", "brand": "...", "price": "₹...", "rating": "...", "reason": "...", "pros": "...", "cons": "..."
          }}
        ],
        "routine": {{
          "daily": ["Tip 1", "Tip 2", "Tip 3"],
          "weekly": ["Tip 1", "Tip 2"]
        }},
        "tips": {{
          "dos": ["...", "..."],
          "donts": ["...", "..."],
          "diet": ["...", "..."]
        }}
      }}
    }}
    """
    
    try:
        model = genai.GenerativeModel('gemini-flash-latest')
        
        contents = [prompt]
        if image_path and os.path.exists(image_path):
            img = Image.open(image_path)
            contents.append(img)
            
        response = model.generate_content(contents)
        
        response_text = response.text.strip().removeprefix('```json').removesuffix('```').strip()
        result = json.loads(response_text)
        
        # Inject dynamic Amazon search links
        for p in result.get('recommendations', {}).get('products', []):
            search_query = urllib.parse.quote_plus(p['name'])
            p['link'] = f"https://www.amazon.in/s?k={search_query}"
            
        return result
        
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise ValueError("Failed to analyze via LLM. Please check your API key or input.")
