import requests

def scan_username(username):
    results = {
        "alias": username,
        "intercepted_email": None,
        "location": "UNKNOWN",
        "found_accounts": []
    }

    targets = {
        "GitHub": {
            "url": f"https://api.github.com/users/{username}",
            "error_msg": '"message": "Not Found"'
        },
        "Reddit": {
            "url": f"https://www.reddit.com/user/{username}",
            "error_msg": "Sorry, nobody on Reddit goes by that name"
        },
        "Instagram": {
            "url": f"https://www.instagram.com/{username}/",
            "error_msg": "login" # Instagram przekierowuje do logowania, gdy nie ma usera
        },
        "Facebook": {
            "url": f"https://www.facebook.com/{username}",
            "error_msg": "content_not_found"
        },
        "Linktree": {
            "url": f"https://linktr.ee/{username}",
            "error_msg": "404"
        },
        "Steam": {
            "url": f"https://steamcommunity.com/id/{username}",
            "error_msg": "The specified profile could not be found"
        }
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    }

    session = requests.Session()

    for platform, info in targets.items():
        try:
            # Specjalna logika dla GitHuba (API)
            if platform == "GitHub":
                resp = session.get(info["url"], headers=headers, timeout=5)
                if resp.status_code == 200:
                    data = resp.json()
                    results["intercepted_email"] = data.get("email")
                    results["location"] = data.get("location") or "UNKNOWN"
                    results["found_accounts"].append({
                        "platform": platform,
                        "url": f"https://github.com/{username}",
                        "status": "ACTIVE"
                    })
                continue

            # Logika dla reszty stron (Content Check)
            response = session.get(info["url"], headers=headers, timeout=5, allow_redirects=True)
            
            # WERYFIKACJA:
            # 1. Musi być status 200
            # 2. Tekst błędu NIE MOŻE znajdować się w treści strony
            # 3. Dla Instagrama - URL nie może zawierać słowa "login"
            
            content = response.text
            final_url = response.url.lower()

            is_valid = response.status_code == 200
            
            if platform == "Instagram" and "login" in final_url:
                is_valid = False
            if info["error_msg"] in content:
                is_valid = False
            
            if is_valid:
                results["found_accounts"].append({
                    "platform": platform,
                    "url": info["url"],
                    "status": "ACTIVE"
                })
        except:
            continue
            
    return results