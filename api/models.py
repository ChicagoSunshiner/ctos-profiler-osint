from django.db import models

class ScanLog(models.Model):
    # Nazwa szukanego profilu
    target_alias = models.CharField(max_length=100)
    # Kiedy wykonano skan
    timestamp = models.DateTimeField(auto_now_add=True)
    # Ile kont znaleziono
    accounts_found = models.IntegerField(default=0)

    def __str__(self):
        return f"Scan: {self.target_alias} ({self.timestamp})"