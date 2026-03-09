import requests
from bs4 import BeautifulSoup
from googlesearch import search
import random

class ProfilerEngine:
    def __init__(self, query):
        self.query = query
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0 Safari/537.36'})
        self.results = {
            "alias": query,
            "subject_name": "UNKNOWN",
            "avatar_url": None,
            "probability": 0,
            "nodes": []
        }

    def _extract_og_image(self, url):
        """Extracts profile picture using OpenGraph protocol."""
        try:
            resp = self.session.get(url, timeout=3)
            soup = BeautifulSoup(resp.text, 'html.parser')
            img = soup.find("meta", property="og:image")
            return img["content"] if img else None
        except: return None

    def run(self):
        # 1. Identity Resolution (Dorking)
        # If query has space, assume Name Search. If not, assume Nickname.
        platforms = ['instagram.com', 'github.com', 'facebook.com', 'steamcommunity.com']
        search_query = f"{self.query} profile " + " OR ".join([f"site:{p}" for p in platforms])
        
        discovered_links = []
        try:
            # We take first 4 fast results
            for url in search(search_query, num_results=4):
                discovered_links.append(url)
        except: pass

        # 2. Scanning Nodes
        for url in discovered_links:
            platform_name = "Unknown Node"
            for p in platforms:
                if p in url: platform_name = p.split('.')[0].capitalize()
            
            avatar = self._extract_og_image(url)
            if not self.results["avatar_url"] and avatar:
                self.results["avatar_url"] = avatar
            
            self.results["nodes"].append({
                "platform": platform_name,
                "url": url
            })

        # 3. Probable Cause Calculation (WD1 Style)
        hits = len(self.results["nodes"])
        if hits > 0:
            # Base probability + variance for realism
            self.results["probability"] = min(45 + (hits * 12) + random.randint(1, 10), 99)
        
        return self.results

def scan_username(query):
    return ProfilerEngine(query).run()