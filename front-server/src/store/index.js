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
    GET_COMMUNITYS(state, communitys){
      state.communitys = communitys
    },
    UPDATE_COMMUNITY(state, community){
      state.communitys = state.communitys.map((item) => {
        if (item.id == community.id){
          item = community
        }
        return item
      })
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
        console.log(res)
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
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          console.log('___________ 토큰_______')
          console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
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
    updateCommunity(context, payload){
      axios({
        method: 'put',
        url: `${API_URL}/community/${payload.id}/`,
        data: {
          title: payload.title,
          content: payload.content,
        },
        headers: {
          Authorization : `Token ${context.state.token}`
        }
      })
       .then((res) => {
        context.commit('UPDATE_COMMUNITY', res.data)
       })
       .catch((err) => {
        console.log(err)
       })
    }
  },
  modules: {
  }
})
