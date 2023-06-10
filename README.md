# 1. 팀원 정보 및 업무 분담 내역

* - 박지용
    
    - vue 와 django 붙여진 기본 틀
    
    - 메인 화면과 검색
    
    - 영화 디테일과 메인 화면의 배경
    
    - 별똥별 배경과 클릭 했을 때 이벤트 발생 및 랜덤으로 추천하는 모달창 구현
    
    - 페이지네이션
    
    - 로그인 로그아웃과 로그인 불가시 막아 놓는 기능
    
    - 장르, 연도별로 분류 후 메인페이지 리로딩 하는 기능
  
  - 박해준
    
    - Comunnity 기능과 커뮤니티 CRUD
    - 게시판 페이지 네이션
    - SQLite 활용 DB 관리
    - 좋아요, follow 기능
    - 코멘트

# 2.  목표 서비스 구현 및 실제 구현 정도

* 목표 서비스
  
  - TMDB 연동 후 메인페이지에 카드화 된 영화 목록 띄우기
    
    - 카드화 완료, 카드화 이후 조금 특수한 꼴로 관련 추천 영화 띄우기 완료
  
  - Youtube API 연동 후 검색 기능 완성
    
    - 유튜브 api 를 연동하지 않았다. 예고편 등을 띄우려면 크롤링 기능이 필요할 것 같아서
    
    - 또 그냥 관련된 영상만 가져오기에는 너무 흔한 기능이라 구현하지 않음
  
  - 커뮤니티 기능
    
    - 코멘트 기능
    
    - 좋아요 기능
    
    - 팔로우 기능
  
  - Django 와 Vue 연동
    
    - 초반 부에 완료함
  
  - nav 바 등을 활용한 디자인
    
    - fixed 된 nav 바 구현 완료
    
    - 디자인 또한 컨셉안에서 통일성 있게 구현하였다.
  
  - 메인 페이지에 추천 영화 검색 버튼 구현
    
    - 검색 버튼과 장르 및 연도별로 메인 페이지가 변하도록 따로 구현
  
  - 추천 알고리즘 컨셉 정하기 및 구현
    
    - 추천 알고리즘을 특별하게 만들지는 않았다.
    
    - 추천 알고리즘으로 접근하는 방식을 조금 특별하게 만들었다.

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
1. 조그마한 별똥별 오브젝트를 클릭하게 되면

2. ## 밑과 같은 모달창이 뜬다.

![별모달창](https://user-images.githubusercontent.com/45480263/203734770-3a0e4710-b2c3-4307-a477-8b72b6464110.png)

3. 매 번 랜덤하게 받을 수 있으며 저런 카드를 클릭하면

4. ## 그 해당 영화의 디테일로 가게 된다.

![detail](https://user-images.githubusercontent.com/45480263/203734840-05088118-290e-4ae2-8e3b-0983b88302d4.png)

# 6. 배포 서버 URL

- Front

https://vocal-arithmetic-d079c9.netlify.app/login

- Back

[http://luminarie.online/](http://luminarie.online/)

Back 서버의 경우 도메인을 구입하면서 붙였는데, 일당 해당 도메인을 파는 페이지로만 연결되고 원하는 데이터 전달의 백 서버로는 배보파지 못한 상태이다.

- Front

https://vocal-arithmetic-d079c9.netlify.app/login

- Back

[http://luminarie.online/](http://luminarie.online/)

Back 서버의 경우 도메인을 구입하면서 붙였는데, 일당 해당 도메인을 파는 페이지로만 연결되고 원하는 데이터 전달의 백 서버로는 배보파지 못한 상태이다.

# 7. 기타 (느낀점, 후기)

## 박지용

느낀점

- 처음에 모델 설계 등이 중요함을 깨달았다.

- views 와 Component 등 의 분리를 통해서 분업이 잘 될 수 있어서 다행이었다.

- 데이터를 state 쪽에 모아서 관리하는 vuex 기능의 유용함에 대해서 깨닫게 되었다.

- 처음에는 여기에서만 쓸 것이라고 생각해서 컴포넌트에 빠르게 정의 했던 함수들이

- 나중에도 사용되었다.
  
  - 순간의 편리함에 취해 함수나 모듈의 재사용성에 대해 고려하지 못한 벌을 쌔게 받은 것 같았다.

- CSS 도 처음부터 분리를 잘 시켜서 사용할 것이라는 후회가 들었다. CSS 스타일을 이것저것 복잡하게 스파게티 코드로 집어 넣고 나니까 하위 컴포넌트에 의도치 않은 영향이 가는 등 부정적인 결과로 돌아오게 되었다.

후기

- 싸피에 들어와서 처음으로 협업이라는 것을 해보니까 원래 일하던 곳에서 했던 협업과는 또 다른 느낌이었다. 내가 어디까지 맡아야 하고, 또 어떤 부분에서는 팀원과 선을 그어야 할지 확고히 정하는게 조금 힘들었다.

- 짧게 일을 했기 때문에 회사에서는 항상 부사수의 입장에서 일을 했었는데, 이번에는 어떤 식으로는 사수의 느낌에서 일을 했기 때문에 조금 색달랐고, 신경 쓰이는 부분들도 달랐다.

- 깔끔하고 짧게, 딱 필요한 기능만 짜자는 내 컨셉에 팀원이 잘 따라와주어서 다행이었다는 생각이 들었다.

- 프론트 쪽은 진짜 신경 거의 안쓸 줄 알았는데, 오히려 프론트쪽을 많이 신경쓰게 된것 같다. 의외로 프론트 쪽 기술들을 배우는 것에 흥미가 있는 편이었을지도 라는 생각이 들었다.

- 색깔을 최대한 적게 쓰는 것은 좋은 선택이었던 것 같다. 색감과 배치에 대한 센스가 많이 없는 편이기 때문에 색을 초록색, 검은색, 흰색만 쓰도록 노력했고 배치는 주로 중앙 배치와 적절한 마진으로만 떡칠했다. 그래도 깔끔하게는 나온 것 같아서 마음에 든다.

- 애니매이션의 적용 부분이 가장 힘들었던 것 같다. 내가 욕심이 생겨서 도입해본 부분이긴 한데, 너무 다른 사람의 애니매이션이 나의 프로젝트에 이식이 잘 안되어서 고생을 많이했다. 스크롤 고정, 그리고 애니매이션 발생지점과 종료지점 폭과 그리고 나의 메인 모듈과 겹치거나 하지 않게 하는 등 고려해야할 부분이 정말 많았다.

## 박해준

느낀점+후기

- 처음 cummunity에 값들을 불러올 때, state를 사용하지 않고 전부 method를 이용하여 그 vue화면에서 각각불러오게 만들었는데, 이때 많은 데이터들을 넘겨주고 받고 하는 경우가 생겨 오류가 많이 발생했다.

- 이후, state에 저장하여 값들을 getters를 이용하여 불러와서 사용했으며, 이 경우 각 화면에서 많은 데이터들을 주고 받을 필요가 없어져 오류가 많이 줄어드는 것을 알 수 있었다.

- 생각보다 Vue에서 데이터를 다룰 경우가 많이 있었으며 그를 위해 django에서 Serializer를 잘 만들어 줘야 필요한 데이터가 빠짐없이 넘어 오는 것을 알 수 있었다.

- 비동기인 axios를 사용하는 경우, 필요한 데이터를 axios를 통해 받아오는데 생각보다 느린 경우가 많아 필요한 데이터를 받아오지 못해 오류가 많이 떴으며, watch를 통해 해결하거나 비동기가 끝난 시점에서 시작하는 경우로 해결할 수 있었다.

- style 단에 적은 css들이 모든 파일에 적용이 되어 생각보다 style을 적용하는데 오류가 생겼으며, 이를 해결하기위해 파일을 따로 만들어 관리를 해야한다는 생각을 하였다.

- Vue나 django에 알고리즘은 크게 필요가 없다고 생각했는데, 페이지를 만들 때 사용하며 Vue에서도 중요하게 작용한다는 것을 알 수 있었다.
