import Vue from 'vue'
import Vuex from 'vuex'

import { Message } from 'element-ui';
Vue.use(Vuex)

import { request } from "@/network/request.js";
import getSearchList from '@/network/getSearchList.js'
import getTop100List from '@/network/getTop100List.js'

export default new Vuex.Store({
  state: {
    searchList: [],
    searchListIndex: null,
    isSearchPageActive: false,
    top100List: [],
    top100ListIndex: null,
    isTop100PageActive: false,
    currentList: [],
    currentListItem: null,
    currentListIndex: null,
    currentSongUrl: '',
    playMode: 'listForwardMode',
    haveStarted: false,
    albumImgStyle: {},
    markedList: [],
    markedListIndex: null,
    isMarkedPageActive: false,
    haveSearched: false,
    searchText: '',
    currentPage: 1,
    loadMoreText: '加载更多',
    canLoadMore: true,
    lyricTextArr: [],
    currentTime: null
  },
  mutations: {

    initData(state) {
      if (localStorage.hasOwnProperty('markedList')) {
        state.markedList = JSON.parse(localStorage.getItem('markedList'))
      }
    },

    sendSearchListIndex(state, searchListIdex) {
      state.searchListIndex = searchListIdex
      state.currentListIndex = searchListIdex
      state.currentList = state.searchList
      state.currentListItem = state.currentList[state.currentListIndex]
    },

    sendTop100ListIndex(state, top100ListIndex) {
      state.top100ListIndex = top100ListIndex
      state.currentListIndex = top100ListIndex
      state.currentList = state.top100List
      state.currentListItem = state.currentList[state.currentListIndex]
    },

    sendMarkedListIndex(state, markedListIndex) {
      state.markedListIndex = markedListIndex
      state.currentListIndex = markedListIndex
      state.currentList = state.markedList
      state.currentListItem = state.currentList[state.currentListIndex]
    },

    sendSearchPageActive(state) {
      state.isSearchPageActive = true
      state.isTop100PageActive = false
      state.isMarkedPageActive = false
    },

    sendTop100PageActive(state) {
      state.isTop100PageActive = true
      state.isSearchPageActive = false
      state.isMarkedPageActive = false
    },

    sendMarkedPageActive(state) {
      state.isMarkedPageActive = true
      state.isSearchPageActive = false
      state.isTop100PageActive = false
    },

    sendListForwardMode(state) {
      state.playMode = 'listForwardMode'
    },

    sendSingleCycleMode(state) {
      state.playMode = 'singleCycleMode'
    },

    sendListCycleMode(state) {
      state.playMode = 'listCycleMode'
    },

    sendRandomMode(state) {
      state.playMode = 'randomMode'
    },

    sendHaveStarted(state, haveStarted) {
      state.haveStarted = haveStarted
    },

    sendCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },

    sendMarkedSong(state, item) {
      //添加第一个mark的歌曲
      if (state.markedList.length === 0) {
        state.markedList.push(item)
      } else {

        //如果有重复的mark歌曲，即取消mark，相同的mark歌曲均删除
        var haveSameItem = false
        for (let i = 0; i < state.markedList.length; i++) {
          if (state.markedList[i].songmid === item.songmid) {
            state.markedList.splice(i, 1)
            haveSameItem = true

            //当在喜欢页面点击mark时，处理逻辑有点复杂，初步处理下
            if (state.isMarkedPageActive) {
              state.currentList = state.markedList

              //取消当前mark歌曲后，自动播放上一首
              state.currentListIndex -= 1
              state.markedListIndex -= 1

              //最上面的歌曲取消mark后，停在第一首
              if (state.currentListIndex < 0) {
                state.currentListIndex = 0
                state.markedListIndex = 0
              }
              if (state.currentList.length != 0) {
                this.commit('requestSongUrl')
              }
            }
            break
          }
        }
        //如果没有重复的歌曲，则加入新的mark歌曲
        if (haveSameItem === false) {
          state.markedList.unshift(item)
        }
      }
      localStorage.setItem('markedList', JSON.stringify(state.markedList))
    },

    //修改专辑图片样式，使专辑图片开始转动
    albumRotateRunning(state) {
      state.albumImgStyle = {
        'animation': 'albumRotate 20s linear infinite running'
      }
    },

    //修改专辑图片样式，使专辑图片暂停转动（保持已转动的角度）
    albumRotatePaused(state) {
      state.albumImgStyle = {
        'animation': 'albumRotate 20s linear infinite paused'
      }
    },

    handleTop100List(state) {
      getTop100List().then( res => {
        state.top100List = res.data.data.list
      }).catch( err => {
        console.log(err)
      })
    },

    handleSearchSong(state, searchText) {
      state.searchText = searchText
      getSearchList(state.searchText, 1)
        .then(res => {
          console.log(res)
          state.searchList = res.data.data.list;
          state.haveSearched = true
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleLoadMore(state) {
      if (state.canLoadMore) {
        state.currentPage += 1
        getSearchList(state.searchText, state.currentPage)
          .then(res => {
            console.log(res.data.data.list)
            var moreSearchList = res.data.data.list
            if (moreSearchList.length < 50) {
              state.loadMoreText = "已到达底线，再也加载不出来了"
              state.searchList.push(...res.data.data.list)
              state.canLoadMore = false
            } else {
              state.searchList.push(...res.data.data.list)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },

    //处理随机播放模式下的下一首
    handleRandomMode(state) {
      var randomIndex = Math.floor(Math.random() * state.currentList.length)
      state.currentListIndex = randomIndex
      //在各个播放列表随机播放，下一首自动将光标移到将要播放的歌曲上
      if (state.isSearchPageActive) {
        state.searchListIndex = state.currentListIndex
      }
      if (state.isTop100PageActive) {
        state.top100ListIndex = state.currentListIndex
      }
      if (state.isMarkedPageActive) {
        state.markedListIndex = state.currentListIndex
      }
      this.commit('requestSongUrl')
    },

    requestSongUrl(state) {
      request({
        url: 'song',
        params: {
          songmid: state.currentList[state.currentListIndex].songmid,
          guid: '126548448',
          lyric: 1
        },
      }).then(res => {
        //获取歌曲播放链接
        state.currentSongUrl = res.data.data.musicUrl
        if (state.currentSongUrl == "https://ws.stream.qqmusic.qq.com/") {
          Message.error({
            message: '无法获取音乐资源，可能为付费音乐或其他原因',
            showClose: true
          })
          this.commit('albumRotatePaused')
        }

        //处理歌词
        var lyricText = res.data.data.lyric
        var lyricTextArr = lyricText.split('\n')

        //去掉前面五个没用的歌词
        lyricTextArr.splice(0, 5)  

        //清除上一首的歌词
        state.lyricTextArr = []

        //将歌词与时间分离
        lyricTextArr.forEach( eachLine => {
          var t = eachLine.substring(eachLine.indexOf("[") + 1, eachLine.indexOf("]"))
          var lyricTextLineObj = {
            time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(2),
            text: eachLine.substring(eachLine.indexOf("]") + 1, eachLine.length)
          }

          state.lyricTextArr.push(lyricTextLineObj)
        })
        console.log(state.lyricTextArr)
      }).catch(err => {
        console.log(err)
      })
    },

    handleLyric(state) {

    },

    playPreviousSong(state) {
      //各个列表上一首到头则index重新置零
      if (state.isSearchPageActive) {
        state.searchListIndex -= 1
        if (state.searchListIndex < 0) {
          state.searchListIndex = 0
        }
      }
      if (state.isTop100PageActive) {
        state.top100ListIndex -= 1
        if (state.top100ListIndex < 0) {
          state.top100ListIndex = 0
        }
      }
      if (state.isMarkedPageActive) {
        state.markedListIndex -= 1
        if (state.markedListIndex < 0) {
          state.markedListIndex = 0
        }
      }
      state.currentListIndex -= 1
      if (state.currentListIndex >= 0) {
        this.commit('requestSongUrl')
      } else {
        state.currentListIndex = 0
      }
    },

    playCurrentSong() {
      this.commit('requestSongUrl')
    },

    playNextSong(state) {
      //各个列表下一首到头了，则将index停留在最后一位
      if (state.isSearchPageActive) {
        state.searchListIndex += 1
        if (state.searchListIndex > state.searchList.length - 1) {
          state.searchListIndex = state.searchList.length - 1
        }
      }
      if (state.isTop100PageActive) {
        state.top100ListIndex += 1
        if (state.top100ListIndex > state.top100List.length - 1) {
          state.top100ListIndex = state.top100List.length - 1
        }
      }
      if (state.isMarkedPageActive) {
        state.markedListIndex += 1
        if (state.markedListIndex > state.markedList.length - 1) {
          state.markedListIndex = state.markedList.length - 1
        }
      }
      state.currentListIndex += 1
      if (state.currentListIndex < state.currentList.length) {
        this.commit('requestSongUrl')
      } else {
        //当播放列表index超出，如果是列表循环模式，则将index置零，从头开始播放
        if (state.playMode == "listCycleMode") {
          state.currentListIndex = 0
          this.commit('requestSongUrl')
        } else {
          //如果不是列表循环模式，则index停留在最后
          state.currentListIndex = state.currentList.length - 1
          this.commit('albumRotatePaused')
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
