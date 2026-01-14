import requests

# Constants for cleaner configuration
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
)

class OSINTScanner:
    """Service class to handle social media profile scanning."""
    
    def __init__(self, username):
        self.username = username
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})
        self.results = {
            "alias": username,
            "intercepted_email": None,
            "location": "UNKNOWN",
            "found_accounts": []
        }

    def _get_targets(self):
        """Returns a dictionary of supported platforms and their validation rules."""
        return {
            "GitHub": {
                "url": f"https://api.github.com/users/{self.username}",
                "is_api": True
            },
            "Reddit": {
                "url": f"https://www.reddit.com/user/{self.username}",
                "error_msg": "Sorry, nobody on Reddit goes by that name"
            },
            "Instagram": {
                "url": f"https://www.instagram.com/{self.username}/",
                "check_login": True
            },
            "Facebook": {
                "url": f"https://www.facebook.com/{self.username}",
                "error_msg": "content_not_found"
            },
            "Steam": {
                "url": f"https://steamcommunity.com/id/{self.username}",
                "error_msg": "The specified profile could not be found"
            }
        }

    def _validate_response(self, platform, response, info):
        """Validates if the profile actually exists based on content analysis."""
        if response.status_code != 200:
            return False
            
        content = response.text
        if "error_msg" in info and info["error_msg"] in content:
            return False
            
        if info.get("check_login") and "login" in response.url.lower():
            return False
            
        return True

    def perform_scan(self):
        """Main entry point for scanning process."""
        targets = self._get_targets()

        for platform, info in targets.items():
            try:
                if info.get("is_api"):
                    self._handle_github_api(platform, info["url"])
                else:
                    self._handle_web_scrape(platform, info)
            except requests.RequestException:
                continue
                
        return self.results

    def _handle_github_api(self, platform, url):
        response = self.session.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            self.results["intercepted_email"] = data.get("email")
            self.results["location"] = data.get("location") or "UNKNOWN"
            self.results["found_accounts"].append({
                "platform": platform,
                "url": f"https://github.com/{self.username}"
            })

    def _handle_web_scrape(self, platform, info):
        response = self.session.get(info["url"], timeout=5, allow_redirects=True)
        if self._validate_response(platform, response, info):
            self.results["found_accounts"].append({
                "platform": platform,
                "url": info["url"]
            })

def scan_username(username):
    """Wrapper function for easier access from views."""
    scanner = OSINTScanner(username)
    return scanner.perform_scan()