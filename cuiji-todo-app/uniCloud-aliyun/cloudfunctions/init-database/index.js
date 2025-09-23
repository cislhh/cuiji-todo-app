'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    console.log('开始初始化数据库...');
    
    // 检查todo-tasks集合是否存在，如果不存在则创建
    try {
      // 尝试查询集合
      const testResult = await db.collection('todo-tasks').limit(1).get();
      console.log('todo-tasks集合已存在，记录数:', testResult.data.length);
      
      return {
        code: 0,
        message: '数据库初始化完成',
        data: {
          collectionExists: true,
          recordCount: testResult.data.length
        }
      };
    } catch (error) {
      console.log('集合不存在，尝试创建...', error.message);
      
      // 如果集合不存在，尝试插入一条测试数据来创建集合
      const testData = {
        title: '测试任务',
        description: '这是一个测试任务，用于初始化数据库集合',
        priority: 2,
        category: '测试分类',
        completed: false,
        createTime: new Date(),
        updateTime: new Date(),
        userId: 'system'
      };
      
      const createResult = await db.collection('todo-tasks').add(testData);
      console.log('集合创建成功，ID:', createResult.id);
      
      // 立即删除测试数据
      await db.collection('todo-tasks').doc(createResult.id).remove();
      console.log('测试数据已删除');
      
      return {
        code: 0,
        message: '数据库集合创建成功',
        data: {
          collectionExists: true,
          recordCount: 0
        }
      };
    }
  } catch (error) {
    console.error('数据库初始化失败:', error);
    return {
      code: 500,
      message: '数据库初始化失败: ' + error.message,
      data: null
    };
  }
};