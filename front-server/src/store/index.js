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
    keyword: null,
    comments : [],
    genre : '',
    year : 0,

  },
  getters: {
    isLogin(state){
      return state.token ? true : false
    },
    getPartOfMovies: (state) => (index)=> {
      return state.movies.slice((index-1)*6 , index*6)
    },
    getUserName (state){
      return state.token ? `${state.userName} 님 반갑습니다.` : '로그인이 필요합니다'
    },
    getMoviesLength(state){
      return parseInt(state.movies.length/6) +1
    },

    getCommunitysLength(state) {
      if(parseInt(state.communitys.length%9)==0){
        return parseInt(state.communitys.length/9)
      }else{
        return parseInt(state.communitys.length/9)+1
      }
    },
    getPartOfCommunitys: (state) => (index) => {
      return state.communitys.slice((index-1)*9, index*9)
    },

    getCommentsLength(state) {
      if(parseInt(state.comments.length%5)==0){
        return parseInt(state.comments.length/5)
      }else{
        return parseInt(state.comments.length/5)+1
      }
    },
    getPartOfComments: (state) => (index) => {
      return state.comments.slice((index-1)*5, index*5)
    },
    getDetailCommunity: (state) => (id) => {
      return state.communitys.filter((community) => {
        return community.id == id
      }) 
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
      // console.log(state.token)
      router.push({ name:'MovieView' })
    },
    OUT_TOKEN(state){
      state.token = null
      router.push({ name:'LogInView'})
    },
    GET_COMMUNITYS(state, communitys){
      state.communitys = communitys.reverse()
    },
    SET_USERNAME(state, userName){
      state.userName = userName
    },
    LOG_OUT(state){
      state.userName = null
    },
    UPDATE_COMMUNITY(state, community){
      state.communitys = state.communitys.map((item) => {
        if (item.id == community.id){
          item = community
        }
        return item
      })
    },
    UPDATE_KEYWORD(state, keyword){
      state.keyword = keyword
    },
    DELETE_COMMUNITY(state, id) {
      state.communitys = state.communitys.filter((item) => {
        return item.id != id
      })
    },
    GET_COMMENTS(state, comments) {
      state.comments = comments.reverse()
    },
    UPDATE_GENRE(state, genre){
      state.genre = genre
    },
    UPDATE_YEAR(state, year) {
      state.year = year
    }

  },
  actions: {
    getMovies(context) {
      axios( {
        method: 'get',
        url : `${API_URL}/api/v1/movies/`,
        headers : {
          Authorization : `Token ${context.state.token}`
        },
        params : {
          year : context.state.year,
          genre : context.state.genre
        }
      })
      .then((res) => {
        // console.log(res, context)
        context.commit('GET_MOVIES', res.data)
      })
    },
    getKeywordMovies(context, keyword){
      context.commit('UPDATE_KEYWORD', keyword)
      axios({
        method: 'get',
        url : `${API_URL}/api/v1/movies/${context.state.keyword}/`,
        headers : {
          Authorization : `Token ${context.state.token}`
        },
        params : {
          year : context.state.year,
          genre : context.state.genre
        }
      })
      .then((res) => {
        context.commit('GET_MOVIES', res.data)
        router.push({name: 'MovieView', params: { isSearch : 10 }}).catch(()=>{})
      })
    },
    signUp(context, payload) {
      context.commit('SET_USERNAME', payload.username)
      
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
    },

    getComments(context,id){
      axios({
        method: 'get',
        url: `${ API_URL }/community/${ id }/comments`,
        headers:{
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }







    // getComment(context, payload){

    // }
    
    // updateComment(context, payload){
    //   axios({
    //     method: 'put',
    //     url: `${API_URL}/community/comments/${payload.commentId}/`,
    //     data: {
    //       comment_pk : payload.commentId,
    //       community_pk : payload.communityId,
    //       content : payload.content
    //     },
    //     headers: {
    //       Authorization : `Token ${context.state.token}`
    //     }
    //   })
    //   .then(() => {
    //     console.log('성공')
    //    })
    //    .catch((err) => {
    //     console.log(err)
    //    })
    // }
  },
  modules: {
  }
})
