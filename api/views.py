from rest_framework.views import APIView
from rest_framework.response import Response
from .scanner import scan_username

class ProfilerAPIView(APIView):
    def get(self, request, username):
        # Tutaj wywołujemy nasz skaner
        scan_data = scan_username(username)
        return Response(scan_data)