from app1.models import User,HospitalProfile,ValidLicense
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['username']=user.username
        token['email']=user.email
        token['password']=user.password
        token['name']=user.profile.name
        token['address']=user.profile.address
        token['postal_code']=user.profile.postal_code
        token['phone']=user.profile.phone
        token['operating_hours']=user.profile.operating_hours
        token['status']=user.profile.status
        token['verified']=user.profile.verified

        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    # HospitalProfile fields (write_only=True)
    name = serializers.CharField(required=True, write_only=True)
    address = serializers.CharField(required=True, write_only=True)
    postal_code = serializers.IntegerField(required=False, write_only=True)
    phone = serializers.CharField(required=True, write_only=True)
    operating_hours = serializers.IntegerField(required=False, write_only=True)
    status = serializers.ChoiceField(
        choices=HospitalProfile._meta.get_field('status').choices,
        default='Active',
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'password2',
            'name', 'address', 'postal_code', 'phone', 'operating_hours', 'status'
        ]

    def validate_username(self, value):
        """Check if the username (license number) is valid."""
        if not ValidLicense.objects.filter(license_number=value).exists():
            raise serializers.ValidationError("This license number is not authorized for registration.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields do not match."})
        return attrs

    def create(self, validated_data):
        # Extract profile fields from validated_data
        profile_data = {
            'name': validated_data.pop('name'),
            'address': validated_data.pop('address'),
            'postal_code': validated_data.pop('postal_code', None),
            'phone': validated_data.pop('phone'),
            'operating_hours': validated_data.pop('operating_hours', None),
            'status': validated_data.pop('status', 'Active'),
        }

        # Create the User
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create the related HospitalProfile
        HospitalProfile.objects.create(user=user, **profile_data)

        return user