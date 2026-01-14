from rest_framework.views import APIView
from rest_framework.response import Response
from .scanner import scan_username
from .models import SubjectScanLog

class ProfileScannerView(APIView):
    """API Endpoint to initiate a subject scan and log results."""
    
    def get(self, request, username):
        scan_results = scan_username(username)
        
        self._log_to_database(scan_results)
        
        return Response(scan_results)

    def _log_to_database(self, results):
        """Helper method to persist scan metadata."""
        SubjectScanLog.objects.create(
            subject_alias=results["alias"],
            intercepted_email=results["intercepted_email"],
            nodes_discovered=len(results["found_accounts"])
        )