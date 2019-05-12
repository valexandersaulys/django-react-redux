from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken

from accounts.serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, user_token = AuthToken.objects.create(user)  # annoying change from tutorial
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context).data,
            "token": user_token # return a token for auth use in header
        })

    
# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, user_token = AuthToken.objects.create(user)  # annoying change from tutorial
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context).data,
            "token": user_token # return a token for auth use in header
        })



# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
