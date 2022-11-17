from rest_framework.response import Response
from rest_framework.decorators import api_view

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import  CommunityListSerializer, CommunitySerializer, CommentSerializer
import requests
from .models import Community, Comment

# Create your views here.

@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def community_list(request):
    # community_list 띄우기위한 get
    if request.method == 'GET':
        community = get_list_or_404(Community)
        # print(community)
        serializer = CommunityListSerializer(community, many=True)
        # print(serializer)
        # if serializer.is_valid(raise_exception=True):
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CommunitySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print('넘어오긴 합니다.--------------------------------')
            print(serializer)
            print(request.user)
            serializer.save(user=request.user)
            print('저장완료')
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def community_detail(request, community_pk):
    community = get_object_or_404(Community, pk=community_pk)
    
    if request.method == 'GET':
        serializer = CommunitySerializer(community)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        community.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = CommunitySerializer(community, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)

# @api_view(['GET'])
# def comment_list(request,commuty_pk):
