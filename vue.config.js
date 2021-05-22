module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    // 配置服务器代理
    proxy: {
      "/apis": { // 代理接口前缀为/apis的请求
        "target": 'https://api.zsfmyz.top/music/', // 对应的代理地址
        "secure": false, // 接受运行在https上，默认不接受
        "changeOrigin": true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
        "pathRewrite": { //重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
          '^/apis': ''
        }
      },
      // 配置多个代理
      "/service": {
        "target": 'https://www.google.com/',
        "secure": false,
        "changeOrigin": true,
      },
    }
  },
  pluginOptions: {
		// vue-cli-plugin-electron-builder 配置
		electronBuilder: {
			builderOptions: {
				// 设置打包之后的应用名称
				// productName: 'App',
				win: {
					icon: './public/logo.ico',
					// 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
					target: [{
						// 打包成一个独立的 exe 安装程序
						target: 'nsis',
						// 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大
						arch: [
							'x64'
							// 'ia32'
						]
					}]
				},
				dmg: {
					contents: [{
							x: 410,
							y: 150,
							type: 'link',
							path: '/Applications'
						},
						{
							x: 130,
							y: 150,
							type: 'file'
						}
					]
				},
				linux: {
					// 设置linux的图标
					icon: './public/',
					target: 'deb',
					category: "DesktopApp",
				},
				mac: {
					icon: './public/logo.icns'
				},
				files: ['**/*'],
				// extraResources: {
				//   // 拷贝dll等静态文件到指定位置,否则打包之后回出现找不大dll的问题
				//   from: 'resources/',
				//   to: './'
				// },
				asar: true,
				nsis: {
					// 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
					oneClick: false,
					// 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
					allowElevation: true,
					// 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
					allowToChangeInstallationDirectory: true,
					// 安装图标
					installerIcon: './public/logo.ico',
					// 卸载图标
					uninstallerIcon: './public/logo.ico',
					// 安装时头部图标
					installerHeaderIcon: './public/logo.ico',
					// 创建桌面图标
					createDesktopShortcut: true,
					// 创建开始菜单图标
					createStartMenuShortcut: true
				}
			},
		}
	},
	configureWebpack: {
		target:'electron-renderer'
	}
}