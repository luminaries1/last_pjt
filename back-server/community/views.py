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
            serializer.save(user=request.user)
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

@api_view(['GET', 'POST'])
def comment_list(request,community_pk):
    if request.method == 'GET':
        comments = Comment.objects.filter(community_id=community_pk)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        community = Community.objects.get(pk=community_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(community=community, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def community_comment(request):
    comments = get_list_or_404(Comment)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    print(request.data)
    comment = get_object_or_404(Comment, pk=comment_pk)
    print(comment)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        print('--------------------------------')
        print('넘어옵니다용')
        print(request.data)
        community = Community.objects.get(pk=request.data['community_pk'])
        serializer = CommentSerializer(comment, data=request.data.content)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, community=community)
            return Response(serializer.data)
