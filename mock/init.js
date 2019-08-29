import mockjs from 'mockjs';

export default {
  'GET /api/init': mockjs.mock({
    'Data': [
      {
        id: '@id',
        type: 'swiper',
        src: '@image',
        name: '滚屏广告',
        isCircle: false,

      },
      {
        id: '@id',
        type: 'gird',
        src: '@image',
        name: '功能模块',
      },
      {
        id: '@id',
        type: 'brand',
        src: '@image',
        name: '品牌导航',
      },
      {
        id: '@id',
        type: 'title',
        src: '@image',
        name: '标题栏',
      },
      {
        id: '@id',
        type: 'activity',
        src: '@image',
        name: '活动推荐',
      },
      {
        id: '@id',
        type: 'mall',
        src: '@image',
        name: '积分商城',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '底部菜单',
      },
    ],
    "boardList": [
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '滚屏广告',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '功能模块',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '品牌导航',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '标题栏',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '活动推荐',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '积分商城',
      },
      {
        id: '@id',
        type: 'navbar',
        src: '@image',
        name: '底部菜单',
      },
    ]
  })
};
