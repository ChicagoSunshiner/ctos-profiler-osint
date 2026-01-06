from django.contrib import admin
from .models import ScanLog

@admin.register(ScanLog)
class ScanLogAdmin(admin.ModelAdmin):
    list_display = ('target_alias', 'timestamp', 'accounts_found')
    list_filter = ('timestamp',)