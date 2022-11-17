import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

const API_URL = 'http://127.0.0.1:8000'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    userName: null,

    articles: [
    ],
    token : null,
    movies : [
    ],
    communitys : [],

  },
  getters: {
    isLogin(state){
      return state.token ? true : false
    },
    getPartOfMovies: (state) => (index)=> {
      return state.movies.slice((index-1)*6 , index*6)
    },
    getUserName (state){
      return state.token ? `${state.userName}` : '알 수 없는'
    }
  },
  mutations: {
    GET_ARTICLES(state, articles){
      state.articles = articles
    },
    GET_MOVIES(state, movies){
      state.movies = movies
    },
    SAVE_TOKEN(state, token){
      state.token = token
      console.log(state.token)
      router.push({ name:'MovieView' })
    },
    OUT_TOKEN(state){
      state.token = null
      router.push({ name:'LogInView'})
    },
    GET_COMMUNITYS(state, communitys){
      state.communitys = communitys
    },
    SET_USERNAME(state, userName){
      state.userName = userName
    },
    LOG_OUT(state){
      state.userName = null
    }
  },
  actions: {
    getArticles(context) {
      axios({
        method: 'get',
        url : `${API_URL}/api/v1/articles/`,
        headers: {
          Authorization : `Token ${context.state.token}`
        }
      })
      .then((res) => {
        // console.log(res, context)
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMovies(context) {
      axios( {
        method: 'get',
        url : `${API_URL}/api/v1/movies/`,
        headers : {
          Authorization : `Token ${context.state.token}`
        }
      })
      .then((res) => {
        // console.log(res, context)
        context.commit('GET_MOVIES', res.data)
      })
    },
    signUp(context, payload) {
      context.commit('SET_USERNAME', payload.username)
      console.log(payload)
      
      axios({
        method : 'post',
        url: `${API_URL}/accounts/signup/`,
        data : {
          username : payload.username,
          password1 : payload.password1,
          password2 : payload.password2
        }
      })
      .then((res) => {
        // console.log(res)
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch(err => console.log(err))
    },
    // 형 파일에 있던 로그인
    // login(context, payload){
    //   axios({
    //     method: 'post',
    //     url:`${API_URL}/accounts/login/`,
    //     data : {
    //       username : payload.username,
    //       password : payload.password
    //     }
    //   })
    //   .then((res)=> {
    //     // console.log(res)
    //     context.commit('SAVE_TOKEN', res.data.key)
    //   })
    // },
    logIn(context, payload) {
      context.commit('SET_USERNAME', payload.username)
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
        })
    },
    logOut(context){
      context.commit('LOG_OUT')
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
      })
      .then(() => {
        context.commit('OUT_TOKEN')
      })
    },
    // _------------------------------여기서 부터 시작 ----------
    getCommunitys(context) {
      axios({
        method: 'get',
        url: `${API_URL}/community/community-list/`,
        // headers: {
        //   Authorization : `Token ${context.state.token}`
        // }
      })
      .then((res) => {
        // console.log(res.data, context)
        context.commit('GET_COMMUNITYS', res.data)
      })
      .catch((err) => {
        console.log(err.request)
      })
    },
  },
  modules: {
  }
})
