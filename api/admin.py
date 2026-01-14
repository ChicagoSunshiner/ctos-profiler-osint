from django.contrib import admin
from .models import SubjectScanLog

@admin.register(SubjectScanLog)
class SubjectScanLogAdmin(admin.ModelAdmin):
    """Configuration for the Django Admin dashboard."""
    list_display = ('subject_alias', 'scan_timestamp', 'nodes_discovered', 'intercepted_email')
    list_filter = ('scan_timestamp',)
    search_fields = ('subject_alias', 'intercepted_email')