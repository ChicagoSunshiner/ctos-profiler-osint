from rest_framework.views import APIView
from rest_framework.response import Response
from .scanner import scan_username
from .models import ScanLog # Importujemy nasz model

class ProfilerAPIView(APIView):
    def get(self, request, username):
        # 1. Wykonujemy skan
        scan_data = scan_username(username)
        
        # 2. ZAPISUJEMY DO BAZY (To jest ten nowy element!)
        ScanLog.objects.create(
            target_alias=username,
            accounts_found=len(scan_data["found_accounts"])
        )
        
        # 3. Zwracamy wynik do Reacta
        return Response(scan_data)