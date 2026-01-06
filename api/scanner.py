import requests

def scan_username(username):
    # Definiujemy cele. Niektóre sprawdzamy przez API, inne przez zwykły URL strony.
    targets = {
        "Instagram": {
            "url": f"https://www.instagram.com/{username}/",
            "type": "status"
        },
        "Facebook": {
            "url": f"https://www.facebook.com/{username}",
            "type": "status"
        },
        "GitHub": {
            "url": f"https://github.com/{username}",
            "type": "status"
        },
        "Linktree": {
            "url": f"https://linktr.ee/{username}",
            "type": "status"
        },
        "Steam": {
            "url": f"https://steamcommunity.com/id/{username}",
            "type": "status"
        },
        "Reddit": {
            "url": f"https://www.reddit.com/user/{username}",
            "type": "status"
        }
    }
    
    results = {
        "alias": username,
        "found_accounts": []
    }

    # Kluczowy moment: Udajemy prawdziwą przeglądarkę (tzw. User-Agent)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }

    # Używamy sesji, żeby zachowywać się bardziej jak człowiek
    session = requests.Session()

    for platform, info in targets.items():
        try:
            # Niektóre serwisy (jak Instagram) są bardzo czułe, dajemy im 5 sekund
            response = session.get(info["url"], headers=headers, timeout=7, allow_redirects=True)
            
            # Jeśli strona istnieje (status 200) i nie zostaliśmy przekierowani na stronę główną/logowania
            if response.status_code == 200:
                # Dodatkowe sprawdzenie dla Instagrama - czy nie wyrzucił nas na stronę logowania
                if platform == "Instagram" and "login" in response.url:
                    continue
                
                results["found_accounts"].append({
                    "platform": platform,
                    "url": info["url"],
                    "status": "ACTIVE"
                })
        except:
            continue
            
    return results