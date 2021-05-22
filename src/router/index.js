import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const SearchPage = () => import('@/components/middle_box/router_views/search_page/SearchPage')
const DiscoverPage = () => import('@/components/middle_box/router_views/discover_page/DiscoverPage')
const LikedPage = () => import('@/components/middle_box/router_views/liked_page/LikedPage')
const LyricPage = () => import('@/components/middle_box/router_views/lyric_page/LyricPage')
const MarkPage = () => import('@/components/middle_box/router_views/mark_page/MarkPage')
const SingerPage = () => import('@/components/middle_box/router_views/singer_page/SingerPage')
const AlbumPage = () => import('@/components/middle_box/router_views/album_page/AlbumPage')

const Appearance = () => import('@/common/setting/appearance/Appearance')
const Background = () => import('@/common/setting/appearance/background/Background')
const HighlightColor = () => import('@/common/setting/appearance/highlight_color/HighlightColor')
const Font = () => import('@/common/setting/appearance/font/Font')

const routes = [
  {
    path: '/DiscoverPage',
    components: {
      nav: DiscoverPage
    }
  },
  {
    path: '/SearchPage',
    components: {
      nav: SearchPage
    }
  },
  {
    path: '/LikedPage',
    components: {
      nav: LikedPage
    }
  },
  {
    path: '/LyricPage',
    components: {
      nav: LyricPage
    }
  },
  {
    path: '/MarkPage',
    components: {
      nav: MarkPage
    }
  },
  {
    path: '/SingerPage',
    components: {
      nav: SingerPage
    }
  },
  {
    path: '/AlbumPage',
    components: {
      nav: AlbumPage
    }
  },
  {
    path: '/Appearance',
    
    components: {
      settingView: Appearance
    },
    children: [
      {
        path: 'Background',
        components: {
          appearanceSettingView: Background
        }
      },
      {
        path: 'HighlightColor',
        components: {
          appearanceSettingView: HighlightColor
        }
      },
      {
        path: 'Font',
        components: {
          appearanceSettingView: Font
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes,
})

export default router
