import Vue from 'vue'
import VueRouter from 'vue-router'

// import ArticleView from '@/views/ArticleView'
// import CreateView from '@/views/CreateView'
// import DetailView from '@/views/DetailView'

// movie 랑 article 비교를 위해 분리
import MovieView from '@/views/MovieView'
import CreateMovieView from '@/views/CreateMovieView'
import DetailMovie from '@/views/DetailMovie'

// 일단 vue 활용 하려면 로그인이랑 회원가입은 그대로 사용.
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'

// 게시판을 위한 vue
import CommunityView from '@/views/CommunityView'
import CreateCommunityView from'@/views/CreateCommunityView'
import UpdateCommunityView from '@/views/UpdateCommunityView'
import DetailCommunityView from '@/views/DetailCommunityView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MovieView',
    component: MovieView
  },
 
  // {
  //   path: '/create',
  //   name: 'CreateView',
  //   component: CreateView
  // },

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

  // {
  //   path: '/:id',
  //   name: 'DetailView',
  //   component: DetailView,
  // },
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
