import requests

def scan_username(username):
    targets = {
        "GitHub": f"https://api.github.com/users/{username}",
        "Chess.com": f"https://api.chess.com/pub/player/{username}",
        "Reddit": f"https://www.reddit.com/user/{username}/about.json"
    }
    
    results = {
        "alias": username,
        "found_accounts": []
    }

    for platform, url in targets.items():
        try:
            # Udajemy zwykłą przeglądarkę, żeby nas nie zablokowali
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(url, headers=headers, timeout=5)
            
            if response.status_code == 200:
                # Jeśli profil istnieje, dodajemy go do listy
                results["found_accounts"].append({
                    "platform": platform,
                    "url": url.replace(".json", "").replace("api.", ""),
                    "status": "ACTIVE"
                })
        except:
            continue
            
    return results