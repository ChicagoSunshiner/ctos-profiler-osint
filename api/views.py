from rest_framework.views import APIView
from rest_framework.response import Response
from .scanner import scan_username
from .models import SubjectScanLog

class ProfilerAPIView(APIView):
    """
    API Endpoint that initiates the OSINT scanner engine
    and persists the results to the database.
    """
    def get(self, request, username):
        # 1. Trigger the scanning engine
        scan_results = scan_username(username)
        
        # 2. Persist metadata to the database for historical logging
        SubjectScanLog.objects.create(
            subject_alias=scan_results["alias"],
            intercepted_email=scan_results["intercepted_email"],
            nodes_discovered=len(scan_results["found_accounts"])
        )
        
        # 3. Return the JSON response to the React frontend
        return Response(scan_results)