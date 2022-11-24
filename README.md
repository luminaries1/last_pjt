# 1. 팀원 정보 및 업무 분담 내역

* 박지용
  
  * vue 와 django 붙여진 기본 틀
  
  * 메인 화면과 검색

* 박해준
  
  * Comunnity 기능과 커뮤니티 CRUD
  
  * 코멘트

# 2.  목표 서비스 구현 및 실제 구현 정도

* 목표 서비스
  
  * TMDB 연동 후 메인페이지에 카드화 된 영화 목록 띄우기
  
  * Youtube API 연동 후 검색 기능 완성
  
  * 커뮤니티 기능
    
    * 코멘트 기능
    
    * 좋아요 기능
    
    * 팔로우 기능
  
  * Django 와 Vue 연동
  
  * nav 바 등을 활용한 디자인
  
  * 메인 페이지에 추천 영화 검색 버튼 구현
  
  * 추천 알고리즘 컨셉 정하기 및 구현

* 11/15
  
  * vue 와 django 통신하는 기본 틀 완성

* 11/16
  
  * 커뮤니티 기능 기본 틀 완성

* 11/17
  
  * 

# 3 . 데이터베이스 모델링 (ERD)

![ERD](https://user-images.githubusercontent.com/59678567/203734038-0934424a-7590-47b3-94e3-52ad4bd88417.PNG)

# 4. 영화 추천 알고리즘에 대한 기술적 설명

아직 추천 알고리즘 컨셉을 잡지 않았음.

# 5. 서비스 대표 기능에 대한 설명

## Cummunity - django

```python
# django community/models.py

from django.db import models
from django.conf import settings


class Community(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=24)
    content = models.TextField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(max_length=34)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
```

- community를 만들기 위한 model

- class Communiity와 class Comment 모두 user를 ForeignKey로 받아와 누가 적는 것인지 알 수 있게 만들었습니다.

- class Comment부분에는 community부분을 ForeignKey로 받아 어느 community부분에 적혀있는 것인지 알 수 있게 만들었으며 on_delete=models.CASCADE로 삭제가 되면 지워지게끔 만들었습니다.

```python
# django community/serializers.py

from rest_framework import serializers
from .models import Community, Comment

class CommunityListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Community
        fields = '__all__'

class CommunitySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Community
        fields = '__all__'
        read_only_fields = ('user',)


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'community')
```

- class CommunityListSerializer Community를 모두 받을 때 사용하며 class CommunitySerializer는 각각의 Community를 받는데 사용했습니다.

- class CommentSerializer는 comment리스트를 모두 받거나 각각 하나씩 받을 때 사용하였습니다.

## Community - Vue

### - Community main 화면

![main](https://user-images.githubusercontent.com/59678567/203735244-e7f78ae2-e8b9-40ae-8028-8f36d039cf80.PNG)

우측 상단의 Create 버튼 클릭시 Comment create 화면으로 넘어감

- 밑의 페이지버튼 클릭시 각각의 페이지로 이동

### - Community create 화면

![create](https://user-images.githubusercontent.com/59678567/203735319-2bf9bd73-564b-427c-9c1a-22638df70ec4.PNG)

Title과 Content 작성후 Submit으로 제출

- 우측 상단 Back 버튼 누를시 Community main화면으로 돌아감

- 고정되어 있는 화면 특성으로 Title과 Content의 글자수는 제한했음

### - Community detail 화면

![detail](https://user-images.githubusercontent.com/59678567/203735382-534dd0b1-11ba-4fc7-87fb-1254446b8784.PNG)

우측 상단 Delete버튼 클릭시 삭제

- 우측 상단 Update버튼 클릭시 Community update화면으로 넘어감

- 우측 상단 Back버튼 클릭시 Community main화면으로 돌아감

- 중간의 input에 comment 작성 후 Submit 버튼 클릭시 comment 제출

- 밑의 페이지 버튼을 누르면 comment의 페이지가 넘어감

### - Communiy update 화면

![update](https://user-images.githubusercontent.com/59678567/203735416-c00da567-3e10-414c-9575-a5dccdeaf904.PNG)

본래의 Title과 Content값이 출력되며 Submit 클릭시 제출

- Back버튼 클릭시 이전의 Detail화면으로 넘어감

### 

### - comment update 화면

![Cupdate](https://user-images.githubusercontent.com/59678567/203735393-6ed1f7e5-1dc6-4d87-967b-c081504a1378.PNG)

comment의 update버튼을 누를시 원래의 입력값을 띄우 input 창이 나오며 우측 Submit 클릭시 comment가 update됨

- 우측 Delete 버튼 클릭시 해당 comment 삭제

# 6. 배포 서버 URL

추가 구현에 가까우니까 마지막에 마지막쯤 생각

# 7. 기타 (느낀점, 후기)

느낀점+후기

- 처음 cummunity에 값들을 불러올 때, state를 사용하지 않고 전부 method를 이용하여 그 vue화면에서 각각불러오게 만들었는데, 이때 많은 데이터들을 넘겨주고 받고 하는 경우가 생겨 오류가 많이 발생했다.

- 이후, state에 저장하여 값들을 getters를 이용하여 불러와서 사용했으며, 이 경우 각 화면에서 많은 데이터들을 주고 받을 필요가 없어져 오류가 많이 줄어드는 것을 알 수 있었다.

- 생각보다 Vue에서 데이터를 다룰 경우가 많이 있었으며 그를 위해 django에서 Serializer를 잘 만들어 줘야 필요한 데이터가 빠짐없이 넘어 오는 것을 알 수 있었다.

- 비동기인 axios를 사용하는 경우, 필요한 데이터를 axios를 통해 받아오는데 생각보다 느린 경우가 많아 필요한 데이터를 받아오지 못해 오류가 많이 떴으며, watch를 통해 해결하거나 비동기가 끝난 시점에서 시작하는 경우로 해결할 수 있었다.

- style 단에 적은 css들이 모든 파일에 적용이 되어 생각보다 style을 적용하는데 오류가 생겼으며, 이를 해결하기위해 파일을 따로 만들어 관리를 해야한다는 생각을 하였다.

- Vue나 django에 알고리즘은 크게 필요가 없다고 생각했는데, 페이지를 만들 때 사용하며 Vue에서도 중요하게 작용한다는 것을 알 수 있었다.
