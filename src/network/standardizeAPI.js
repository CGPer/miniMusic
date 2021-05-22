//将接口标准化，下次更换音乐数据接口就不用修改所有相关的vue页面了(*>﹏<*)
//此接口适用于CoCoMusic的音乐接口
export default function standardizeAPI(songList) {

  let resultList = []

  //从请求的音乐数据提取有用的信息
  songList.forEach(item => {

    let songItem = {
      songID: item.songMid,
      songName: item.songName,
      singer: [],
      albumName: item.album.albumName,
      albumID: item.album.albumMid,
      albumImgUrl: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.albumMid}.jpg?max_age=2592000`
    }

    item.singerList.forEach(each => {
      songItem.singer.push({
        name: each.singerName,
        ID: each.singerMid
      })
    })

    resultList.push(songItem)
  })

  return resultList
}