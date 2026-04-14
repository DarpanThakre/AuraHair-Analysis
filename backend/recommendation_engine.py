def get_recommendations(analysis_result, budget='medium'):
    """
    Returns a hair care kit, routine, and tips based on AI analysis and budget.
    """
    budget = budget.lower() if budget else 'medium'
    
    # 1. Product mapping based on budget
    shampoos = {
        'low': {"name": "Head & Shoulders Anti Hairfall", "brand": "Head & Shoulders", "price": "₹180", "rating": "8.5", "reason": "Affordable hair fall control", "pros": "Accessible, clears scalp", "cons": "Contains sulfates", "link": "https://www.amazon.in/s?k=head+and+shoulders+anti+hairfall+shampoo"},
        'medium': {"name": "Mamaearth Onion Shampoo", "brand": "Mamaearth", "price": "₹349", "rating": "8.8", "reason": "Boosts hair growth with onion oil", "pros": "Sulfate-free, natural", "cons": "May dry out very dry hair", "link": "https://www.amazon.in/s?k=mamaearth+onion+shampoo"},
        'high': {"name": "Kerastase Genesis Anti Hair-Fall", "brand": "Kerastase", "price": "₹2500", "rating": "9.5", "reason": "Premium salon-grade fortifying shampoo", "pros": "Highly effective, luxurious", "cons": "Very expensive", "link": "https://www.amazon.in/s?k=kerastase+genesis+anti+hair+fall+shampoo"}
    }
    
    conditioners = {
        'low': {"name": "Dove Hair Fall Rescue", "brand": "Dove", "price": "₹190", "rating": "8.2", "reason": "Reduces breakage significantly", "pros": "Detangles well", "cons": "Heavy silicones", "link": "https://www.amazon.in/s?k=dove+hair+fall+rescue+conditioner"},
        'medium': {"name": "Plum Olive & Macadamia Conditioner", "brand": "Plum", "price": "₹395", "rating": "8.9", "reason": "Deeply moisturizes split ends", "pros": "Vegan, chemical-free", "cons": "Thick consistency", "link": "https://www.amazon.in/s?k=plum+olive+macadamia+conditioner"},
        'high': {"name": "Moroccanoil Moisture Repair", "brand": "Moroccanoil", "price": "₹2100", "rating": "9.6", "reason": "Maximum hydration & repair", "pros": "Incredible shine", "cons": "Expensive", "link": "https://www.amazon.in/s?k=moroccanoil+moisture+repair+conditioner"}
    }

    oils = {
        'low': {"name": "Parachute Advansed Ayurvedic", "brand": "Parachute", "price": "₹150", "rating": "8.7", "reason": "Deep nourishment & tradition", "pros": "Herbal extracts", "cons": "Strong smell", "link": "https://www.amazon.in/s?k=parachute+advansed+ayurvedic+hair+oil"},
        'medium': {"name": "Indulekha Bringha Oil", "brand": "Indulekha", "price": "₹430", "rating": "9.1", "reason": "Clinically proven to grow new hair", "pros": "Applicator comb included", "cons": "Strong herbal odor", "link": "https://www.amazon.in/s?k=indulekha+bringha+oil"},
        'high': {"name": "Kama Ayurveda Bringadi Intensive", "brand": "Kama Ayurveda", "price": "₹1200", "rating": "9.7", "reason": "Premium scalp treatment", "pros": "Authentic ayurveda", "cons": "Expensive", "link": "https://www.amazon.in/s?k=kama+ayurveda+bringadi+oil"}
    }

    serums = {
        'low': {"name": "Livon Anti-Frizz Serum", "brand": "Livon", "price": "₹250", "rating": "8.0", "reason": "Tames frizz instantly", "pros": "Lightweight", "cons": "Basic synthetic silicone", "link": "https://www.amazon.in/s?k=livon+anti+frizz+serum"},
        'medium': {"name": "Minimalist Hair Growth Peptide", "brand": "Minimalist", "price": "₹799", "rating": "9.0", "reason": "Proven peptides for hair density", "pros": "Science-backed ingredients", "cons": "Requires daily use", "link": "https://www.amazon.in/s?k=minimalist+hair+growth+peptide+serum"},
        'high': {"name": "The Ordinary Multi-Peptide Serum", "brand": "The Ordinary", "price": "₹2050", "rating": "9.8", "reason": "Global best-seller for hair thickness", "pros": "Clinically proven", "cons": "Can run out quickly", "link": "https://www.amazon.in/s?k=the+ordinary+multi+peptide+serum+for+hair+density"}
    }

    # Build the kit
    products = [
        {"category": "Shampoo", **shampoos.get(budget, shampoos['medium'])},
        {"category": "Conditioner", **conditioners.get(budget, conditioners['medium'])},
        {"category": "Oil", **oils.get(budget, oils['medium'])},
        {"category": "Serum", **serums.get(budget, serums['medium'])}
    ]

    # Adjust products based on specific issues
    if analysis_result.get('dandruff_level') in ['Moderate', 'Severe']:
        # Force a dandruff specific option
        products[0] = {"category": "Shampoo", "name": "Nizoral Anti-Dandruff", "brand": "Nizoral", "price": "₹350", "rating": "9.2", "reason": "Targets fungal dandruff directly with Ketoconazole", "pros": "Highly effective", "cons": "Medical smell", "link": "https://www.amazon.in/s?k=nizoral+anti+dandruff+shampoo"}

    # 2. Routine
    routine = {
        "daily": [
            "Apply 3-4 drops of Serum to damp ends.",
            "Massage scalp for 5 minutes without products to stimulate blood flow.",
            "Avoid tight hairstyles."
        ],
        "weekly": [
            "Wash hair 2-3 times a week with recommended Shampoo + Conditioner.",
            "Apply scalp Oil 2 hours before washing.",
            "Change pillowcase to avoid bacteria buildup."
        ]
    }

    # 3. Precautions
    tips = {
        "dos": ["Drink 2L water daily", "Eat protein-rich foods", "Use a wide-tooth comb on wet hair"],
        "donts": ["Stop using hot water for washing", "Avoid daily heat styling", "Don't tie hair when wet"],
        "diet": ["Include spinach, eggs, and nuts", "Consider Biotin or Omega-3 supplements (consult doctor first)"]
    }

    return {
        "products": products,
        "routine": routine,
        "tips": tips
    }
