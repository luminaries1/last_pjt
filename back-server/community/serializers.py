from rest_framework import serializers
from .models import Community, Comment

class CommunityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class CommunitySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('user', )


class CommentSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fileds = ('community')