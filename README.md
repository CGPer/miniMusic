# 迷你音乐

### 特点
一个简单、美观的音乐播放器

### 版权
此项目仅用于代码学习和技术交流，不提供任何音乐下载或vip付费服务。请尊重音乐平台和创作者的版权，切勿做出任何损害音乐平台和创作者利益的行为。如若此项目无意侵犯了你的利益，请及时联系作者（1833608478@qq.com）,立即删除源代码。

所有歌曲数据均来源于网络，本项目几乎与你打开浏览器在线听音乐无异，仅仅只是节省了你打开网站搜索的时间而已。这里特别感谢lunhui1994提供的数据接口[node-music-api](https://github.com/lunhui1994/node-music-api)。顺便提醒，数据接口随时可能失效，请提前做好心理准备。

### 安装包
Windows：    [mini-music-Setup-1.1.0.exe](https://gitee.com/cgper/miniMusic/attach_files/521017/download/mini-music%20Setup%201.1.0.exe)

Mac:         [mini-music-1.0.0.dmg](https://gitee.com/cgper/miniMusic/attach_files/516527/download/mini-music-1.0.0.dmg)

Linux:       [mini-music_1.0.0_amd64.deb](https://gitee.com/cgper/miniMusic/attach_files/516538/download/mini-music_1.0.0_amd64.deb)

### Web版
在线体验：[点击在线体验](http://cgper.gitee.io/mini-music-webpage)

### 截图
#### desktop版
![发现](https://images.gitee.com/uploads/images/2020/1109/173555_cf3c6edf_2020534.png "发现.png")
![搜索](https://images.gitee.com/uploads/images/2020/1109/173626_ea6c763c_2020534.png "搜索.png")
![喜欢](https://images.gitee.com/uploads/images/2020/1109/173652_296e0304_2020534.png "喜欢.png")
![歌词](https://images.gitee.com/uploads/images/2020/1109/173705_b533eb64_2020534.png "歌词.png")
#### web版
![web版](https://images.gitee.com/uploads/images/2020/1109/174013_13efee9c_2020534.png "web版.png")

### 隐私
为了防止用户退出应用后丢失历史数据，本应用会记录你的一些使用习惯（包括历史搜索、mark的歌曲、音量大小）。但所有数据均会保存到本地浏览器（或app)的localStorage中储存，不会发送到网络而造成隐私泄漏。这也意味着音乐播放器在你更换浏览器后就不会再有你的使用数据。

### 提示
此app为无边框应用，拖动窗口需在右侧40px宽的rightbar拖动区按住左键以拖动窗口，下图红色区：
![拖动区](https://images.gitee.com/uploads/images/2020/1109/195202_4bfc9ec9_2020534.png "rightbar.png")


### 开发
#### desktop版
##### 安装开发依赖
> npm install
##### 调试
> npm run electron:serve
##### 打包（你使用哪个系统平台就会打包对应平台的安装包）
> npm run electron:build
#### web版
web版和desktop版有着细微差别，请前往[迷你音乐web版](https://gitee.com/cgper/mini-music-webpage)

### 更新
#### 相比上一版的变化：
- 修复搜索页面新搜索后没自动回到顶端
- 修复播放模式弹窗未对齐
- 修复搜索框中的字体太靠近边框
- 修复当前光标与当前播放歌曲不对应问题

- 新增一键回顶
- 按需引入element组件，减少打包体积
- 优化凌乱的代码，使代码看起来更“优雅”
- 新增键盘控制

| 空格键   | ↑键  | ↓键 | ←键 | →键 |
|-------|------|-------|-------|--------|
| 暂停/播放 | 增加音量 | 减小音量  | 上一首   | 下一首    |

### 致谢
[Vue.js](https://cn.vuejs.org/)

[electron](https://www.electronjs.org/)

[Element](https://element.eleme.cn/#/zh-CN)

[node-music-api](https://github.com/lunhui1994/node-music-api)

[vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)
