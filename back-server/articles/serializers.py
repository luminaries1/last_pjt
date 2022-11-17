from rest_framework import serializers
from .models import Article, Comment
from .models import Movie, Review, Actor, MovieComment


class ArticleListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Article
        # fields = ('id', 'title', 'content')
        fields = ('id', 'title', 'content', 'user', 'username')


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article',)

class ArticleSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user', )




class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title', 'audience','description', 'release_date', 'genre', 'score', 'poster_url', 'user', )


class ActorMovieSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Actor
        fields = ('name',)


class TaehunSerializer(serializers.ModelSerializer):

    class Meta:
        model= Review
        fields = ('title', 'content',)


class MovieSerializer(serializers.ModelSerializer):
    # actors = ActorMovieSerializer(many=True, read_only=True)
    # review_set = TaehunSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('user', )

class CommentMovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieComment
        fields = '__all__'
        read_only_fields = ('movie',)




