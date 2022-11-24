import Vue from 'vue'
import VueRouter from 'vue-router'

// movie 랑 article 비교를 위해 분리
import MovieView from '@/views/Main/MovieView'
import CreateMovieView from '@/views/Main/CreateMovieView'
import DetailMovie from '@/views/Main/DetailMovie'

// 일단 vue 활용 하려면 로그인이랑 회원가입은 그대로 사용.
import SignUpView from '@/views/Commons/SignUpView'
import LogInView from '@/views/Commons/LogInView'

// 게시판을 위한 vue
import CommunityView from '@/views/Community/CommunityView'
import CreateCommunityView from'@/views/Community/CreateCommunityView'
import UpdateCommunityView from '@/views/Community/UpdateCommunityView'
import DetailCommunityView from '@/views/Community/DetailCommunityView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MovieView',
    component: MovieView
  },
  
  {
    path: '/create',
    name: 'CreateMovieView',
    component: CreateMovieView
  },
  
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  
  {
    path: '/community',
    name: 'CommunityView',
    component: CommunityView,
  },
  {
    path: '/community/create',
    name: 'CreateCommunityView',
    component: CreateCommunityView,
  },
  {
    path: '/community/:id/update',
    name: 'UpdateCommunityView',
    component: UpdateCommunityView
  },
  {
    path: '/community/:id',
    name: 'DetailCommunityView',
    component: DetailCommunityView
  },
  {
    path: '/:id',
    name: 'DetailMovie',
  component: DetailMovie,
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
