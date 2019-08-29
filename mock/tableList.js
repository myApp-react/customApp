import mockjs from 'mockjs';

export default {
  'GET /api/table': mockjs.mock({
    'data': {
      total: 20,
      'data|20': [
        {
          "number|1-200": 200,
          id: '@id',
          name: '@name',
          createName: '@cname',
          createTime: '@datetime',
          lastEdit: '@cname',
          lastEditTime: '@datetime',
          "status|1": [
            "已发布",
            "未发布",
          ]
        }
      ],
    }

  })
};
