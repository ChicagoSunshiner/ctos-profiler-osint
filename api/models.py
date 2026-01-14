from django.db import models

class SubjectScanLog(models.Model):
    """Stores metadata of each OSINT scan initiated by the user."""
    subject_alias = models.CharField(max_length=100)
    intercepted_email = models.EmailField(null=True, blank=True)
    nodes_discovered = models.IntegerField(default=0)
    scan_timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-scan_timestamp']
        verbose_name = "Subject Scan Log"

    def __str__(self):
        return f"{self.subject_alias} - {self.scan_timestamp.strftime('%Y-%m-%d %H:%M')}"