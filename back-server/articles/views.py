
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import ArticleListSerializer, ArticleSerializer, CommentSerializer , MovieListSerializer , MovieSerializer , CommentMovieSerializer
import requests
from .models import Movie, Comment


movie_genre_dic = { 'Action' :28,  'Adventure': 12,'Animation' : 16,'Comedy':35,'Crime':80,'Documentary':99,'Drama':18,'Family':10751,'Fantasy':14,'History':36,'Horror':27,'Music'       :    10402,'Mystery'     :    9648,'Romance'     :    10749,'Science Fiction' : 878,'TV Movie'    :    10770,'Thriller'    :    53,'War'         :    10752,'Western'     :    37 }


def get_genre_by_id(id_lst):
    s = ''
    for g_id in id_lst:
        for key, value in movie_genre_dic.items():
            if value == g_id:
                s += key + ' ,'
    
    return s


# Create your views here.
def created_by_default_data(data, request):
    movie = Movie()
    movie.title = data.get('title')
    movie.audience = data.get('popularity')
    movie.release_date = data.get('release_date')
    genre_id = data.get('genre_ids')
    movie.genre = get_genre_by_id(genre_id)
    movie.score = data.get('vote_average')
    movie.poster_url = data.get('poster_path')
    movie.description = data.get('overview')
    movie.user = request.user
    movie.save()

    return



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        sorted_results = []

        if len(movies) < 2:
            results = []
            page_num = 0
            while page_num != 50:
                page_num += 1
                URL = f'https://api.themoviedb.org/3/movie/popular?api_key=fc5af459c34c6a1f3ae12d3190cb9873&language=en-US&page={page_num}'
                response = requests.get(URL).json()
                results.extend(response.get('results')) 
            sorted_results = sorted(results, key = lambda x : -x['vote_average'] )
            # sorted_results = sorted_results[:5]
        

        if sorted_results:
            for i in range(len(sorted_results)):
                tmp_movie_data = sorted_results[i]
                created_by_default_data(tmp_movie_data,request)


        movies = get_list_or_404(Movie)
        serializer = MovieListSerializer(movies, many= True)
        # articles = Article.objects.all()
        # articles = get_list_or_404(Article)
        # serializer = ArticleListSerializer(articles, many=True)
        # print(serializer)
        return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.save()
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


# @api_view(['GET', 'DELETE', 'PUT'])
# def article_detail(request, article_pk):
#     # article = Article.objects.get(pk=article_pk)
#     article = get_object_or_404(Article, pk=article_pk)

#     if request.method == 'GET':
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)
    
#     elif request.method == 'DELETE':
#         article.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     elif request.method == 'PUT':
#         serializer = ArticleSerializer(article, data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def movie_detail(request, movie_pk):
    # article = Article.objects.get(pk=article_pk)
    movie = get_object_or_404(Movie, pk=movie_pk)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        # comments = Comment.objects.all()
        comments = get_list_or_404(Comment)
        serializer = CommentMovieSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    # comment = Comment.objects.get(pk=comment_pk)
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentMovieSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentMovieSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    


@api_view(['POST'])
def comment_create(request, article_pk):
    # article = Article.objects.get(pk=article_pk)
    movie = get_object_or_404(Movie, pk=article_pk)
    serializer = CommentMovieSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
