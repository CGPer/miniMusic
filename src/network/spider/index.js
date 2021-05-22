
 import request from 'axios'
 import http from 'http'
 import https from 'https'
 import { Singer, Album, Music, Mv, Lyric, Category, PlayList } from './commonObject'
 import flow from 'lodash/flow'
 
 const keepAliveConf = {
   keepAlive: true
 }
 
 const httpAgent = new http.Agent(keepAliveConf)
 const httpsAgent = new https.Agent(keepAliveConf)
 
 request.defaults.adapter = require('axios/lib/adapters/http')
 
 const baseRequest = request.create({
   headers: {
     'Referer': 'https://c.y.qq.com/',
     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
     'Accept-Encoding': 'gzip' // 打开gzip
   },
  //  httpAgent,
  //  httpsAgent
   // timeout: 2000 // 这个时间不好把握，我只能说小霸王服务器该换了
   // proxy: {
   //   host: '39.137.69.9',
   //   port: 80
   // }
 })
 
 // page 从 1 开始
 export async function getSingerList ({ page, country, name }) {
   let url = `http://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=${country}_${name}&pagesize=100&pagenum=${page}&format=jsonp`
   /* eslint-disable */
   let {data: {list, total_page}} = (await baseRequest(url)).data 
   return {
     totalPage: total_page, 
     singerList: list.map(
       ({Fsinger_name, Fsinger_mid}) => new Singer(Fsinger_name, Fsinger_mid))
   }
   /* eslint-disable */
 }
 // 新列表 page >= 1
 export async function getNewSingerList ({page, area, sex, genre, index}) {
   let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=${encodeURIComponent(`{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":${area},"sex":${sex},"genre":${genre},"index":${index},"sin":${(page - 1) * 80},"cur_page":${page}}}}`)}`
   /* eslint-disable */
   let {data: {singerlist, total}} = (await baseRequest(url)).data.singerList
   return {
     totalPage: Math.floor(total / 80), 
     singerList: singerlist.map(({singer_name, singer_mid, singer_pic}) => new Singer(singer_name, singer_mid, singer_pic))
   }
   /* eslint-disable */
 }
 // page 从 0 开始
 export async function getSingerMusicList ({page, singerMid}) {
   let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?&singermid=${singerMid}&order=listen&begin=${page*30}&num=30`
   let {data: {list, total}} = (await baseRequest(url)).data
   return {
     total: Math.floor(total / 30),
     list: list.map(
       ({musicData: {
         songmid, strMediaMid, songname, albumname, albummid, singer, type, pay: { payplay }}}) =>
         new Music(songname, songmid, strMediaMid,
           new Album(albumname, albummid),
           singer.map(({mid, name}) => new Singer(name, mid))
           , type, payplay))
   }
 }
 
 export async function getSingerInfo ({singerMid}) {
 
   function parseUserInfo (list) {
     let result = {}
     list.forEach(e => {
       result[e.key] = e.value[0]
     })
     return result
   }
 
   let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg?singermid=${singerMid}&utf8=1&outCharset=utf-8&format=xml`
   var parseString = require('xml2js').parseString;
   var xml = ((await (baseRequest(url))).data)
   return await new Promise((resolve, reject) => {
     parseString(xml, function (err, result) {
       if (err) {
         reject(err)
         return
       }
       if(!result.result.data[0].info){
         resolve({
           info: { 
             'T_T': '暂时没有该歌手的信息'
           }
         })
         return
       }
       let {basic, other, desc} = result.result.data[0].info[0]
       resolve({
         info: parseUserInfo(basic[0].item),
         desc: desc && desc[0],
         other: parseUserInfo(other[0].item)
       })
     })
   })
 }
 export async function getSingerAlbumList ({singerMid, page}) {
   let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?singermid=${singerMid}&order=time&begin=${page * 30}&num=30`
   let {list, total} = (await baseRequest(url)).data.data
   return {
     total: Math.floor(total / 30),
     list: list ? list.map(({albumMID, albumName}) => new Album(albumName, albumMID)) : []
   }
 }
 export async function getSingerMvList ({singerMid, page}) {
   // cid  是啥？ 我也不知道，我也很绝望啊，https://y.gtimg.cn/music/portal/js/v4/singer_afadc5b.js?max_age=31536000 代码里面直接写死了的，我好慌
   let url =  `http://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg?singermid=${singerMid}&order=listen&begin=${page * 35}&num=35&cid=205360581`
   let {list, total} = (await baseRequest(url)).data.data
   return {
     total: Math.floor(total / 35),
     list: list ? list.map(({title, pic, vid}) => new Mv(title, pic, vid)) : []
   }
 }
 
 export async function getMvInfo ({mvId}) {
   let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=%7B%22getMvInfo%22%3A%7B%22module%22%3A%22MvService.MvInfoProServer%22%2C%22method%22%3A%22GetMvInfoList%22%2C%22param%22%3A%7B%22vidlist%22%3A%5B%22${mvId}%22%5D%7D%7D%7D`
   let {name, vid, cover_pic, fileid} = (await baseRequest(url)).data.getMvInfo.data.mvlist[0]
   return {
     mv: new Mv(name, cover_pic, vid),
     fileid
   }
 }
 export async function getMUrl ({fileid}) {
   let url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=%7B%22getMvUrl%22%3A%7B%22module%22%3A%22Mv.MvDownloadUrlServer%22%2C%22method%22%3A%22GetMvUrls%22%2C%22param%22%3A%7B%22fileid%22%3A%5B%22${fileid}%22%5D%2C%22filetype%22%3A%5B-1%5D%7D%7D%7D`
   let {cn, url: [mvSourceUrl], vkey} = (await baseRequest(url)).data.getMvUrl.data.data[fileid][2]
   return {
     cn, mvSourceUrl, vkey
   }
 }
 export async function getKey (guid) {
   let url = `http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=${guid}`
   let {key} = JSON.parse((await baseRequest(url)).data.slice(13, -2))
   return key
 }
 /**
  * 对象 转成 url 字符串
  */
 const urlDecodeObjectUrl = flow(JSON.stringify, decodeURIComponent)
 
 const getMusicParams = (songmid) => urlDecodeObjectUrl({
   req: {
     module: 'CDN.SrfCdnDispatchServer',
     method: 'GetCdnDispatch',
     param: {
       guid: '899052935',
       calltype: 0,
       userip: ''
     }
   },
   // eslint-disable-next-line @typescript-eslint/camelcase
   req_0: {
     module: 'vkey.GetVkeyServer',
     method: 'CgiGetVkey',
     param: {
       guid: '899052935',
       songmid: [
         songmid
       ],
       songtype: [
         0
       ],
       uin: '0',
       loginflag: 1,
       platform: '20'
     }
   },
   comm: {
     uin: 0,
     format: 'json',
     ct: 24,
     cv: 0
   }
 })
 export async function getSongVkey({fileName, guid, songMid}) {
   // cid 是啥？ 我也不造啊 qq 那群人写死了
   const url = 'http://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
   const params = getMusicParams(songMid)
   const result = (await baseRequest({
     url,
     params: {
       data: params
     }
   })).data
   return result.req_0.data.midurlinfo[0].purl
 }
 // 从 1 开始
 export async function getSearch ({keyword, page}) {
   let url = `http://c.y.qq.com/soso/fcgi-bin/client_search_cp?new_json=1&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=50&w=${encodeURIComponent(keyword)}&needNewCode=0`
   let {zhida, song: {list, totalnum, curpage}} = JSON.parse((await baseRequest(url)).data.slice(9, -1)).data // zhida ？ 直达 api 里面有中文 
   console.log(JSON.parse((await baseRequest(url)).data.slice(9, -1)).data)
   let direct
   switch (zhida.type) {
     case 1:
       direct = new Singer(zhida.zhida_singer.singerName, zhida.zhida_singer.singerMID, zhida.zhida_singer.singerPic)
       break;
     case 2:
       direct = new Album(zhida.zhida_album.albumName, zhida.zhida_album.albumMID)
       break;
   }
   return {direct, totalPage: Math.ceil(totalnum / 50),
     songList: list.map(
       ({name, mid, file: {media_mid}, singer, album, type, pay: {pay_play}}) =>
         new Music(
           name, mid, media_mid,
           new Album(album.name, album.mid),
           singer.map(singerItem =>
               new Singer(singerItem.name, singerItem.mid)),
           type, pay_play))
   }
 }
 
 export async function getLyric (songMid) {
   let url = `http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songMid}&g_tk=5381`
   let lyric = JSON.parse((await baseRequest(url)).data.slice(18, -1))
   return new Lyric(lyric.lyric, lyric.trans)
 }
 
 export async function getAlbum ({albumMid}) {
   let url = `http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid=${albumMid}&g_tk=5381&hostUin=0&notice=0&platform=yqq&needNewCode=0`
   let {list, name} = (await baseRequest(url)).data.data
   return {
     musicList: list.map(
       ({songname, songmid, strMediaMid, albumname, albummid, singer, type, pay: {payplay}}) =>
         new Music(
           songname, songmid, strMediaMid,
           new Album(albumname, albummid),
           singer.map(({mid, name}) => new Singer(name, mid)),
           type, payplay)),
     album: new Album(name, albumMid)
   }
 }
 
 export async function getCategory () {
   let url = 'http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?g_tk=5381&notice=0&inCharset=utf8&outCharset=utf-8&platform=yqq&needNewCode=0'
   let {categories} = JSON.parse((await baseRequest(url)).data.slice(18, -1)).data
   return categories.map(
     ({categoryGroupName, items}) => ({
       categoryGroupName,
       categoryList: items.map(
         ({categoryId, categoryName}) => new Category(categoryName, categoryId))
       }))
 }
 
 export async function getPlayList ({categoryId, page}) {
   let url = `http://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=${Math.random()}&g_tk=5381&jsonpCallback=getPlaylist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=${categoryId}&sortId=5&sin=${(page - 1) * 40}&ein=${page * 40 - 1}`
   let {list, sum} = JSON.parse((await baseRequest(url)).data.slice(12, -1)).data
   return {
     list: list.map(
       ({dissname, imgurl, dissid}) =>
         new PlayList(dissid, dissname, imgurl)),
     totalPage: Math.ceil(sum / 40)
   }
 }
 
 export async function getPlayListInfo (playListMid) {
   let url = `http://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=${playListMid}&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
   let {cdlist: [{dissname, songlist}]} = JSON.parse((await baseRequest(url)).data.slice(13, -1))
   return {
     playListName: dissname,
     list: songlist.map(
       ({songname, songmid, strMediaMid, albumname, albummid, singer, type, pay: {payplay}}) =>
         new Music(
           songname, songmid, strMediaMid,
           new Album(albumname, albummid),
           singer.map(
             ({mid, name}) => new Singer(name, mid))
           , type, payplay))
   }
 }
 
 export async function getCdn (guid) {
   const url = `http://u.y.qq.com/cgi-bin/musicu.fcg?data=${encodeURIComponent(`{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":${guid},"calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"${guid}","songmid":["000KDHyB23K7Eq"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`)}`
   const { data: { req: { data: { sip: cdnList, testfilewifi: testUrl } } }} = await baseRequest(url)
   return new Promise((resolve, reject) => {
     cdnList.map(cdn => {
       baseRequest(cdn + testUrl).then(() => {
         resolve(cdn)
       })
     })
   })
 }