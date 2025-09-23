'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, category, completed } = event;
  
  try {
    console.log('task-list 云函数调用，参数:', event);
    
    // 构建查询条件
    const where = {};
    
    // 按分类筛选
    if (category && category !== 'all') {
      where.category = category;
    }
    
    // 按完成状态筛选
    if (completed !== undefined && completed !== null) {
      where.completed = completed === true || completed === 'true';
    }
    
    console.log('查询条件:', where);
    
    // 分页参数
    const skip = (page - 1) * pageSize;
    
    // 先尝试简单查询，不添加orderBy
    let result;
    try {
      result = await db.collection('todo-tasks')
        .where(where)
        .skip(skip)
        .limit(pageSize)
        .get();
    } catch (orderError) {
      console.log('带排序查询失败，尝试无排序查询:', orderError);
      // 如果带排序失败，尝试不带排序
      result = await db.collection('todo-tasks')
        .where(where)
        .skip(skip)
        .limit(pageSize)
        .get();
    }
    
    // 获取总数
    const countResult = await db.collection('todo-tasks')
      .where(where)
      .count();
    
    console.log('查询结果:', result.data.length, '条记录');
    
    return {
      code: 0,
      message: '获取任务列表成功',
      data: {
        list: result.data,
        total: countResult.total,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(countResult.total / pageSize)
      }
    };
  } catch (error) {
    console.error('获取任务列表失败:', error);
    console.error('错误详情:', error.message, error.stack);
    
    // 如果是集合不存在的错误，返回空列表
    if (error.message && error.message.includes('not found')) {
      return {
        code: 0,
        message: '获取任务列表成功（集合为空）',
        data: {
          list: [],
          total: 0,
          page: page,
          pageSize: pageSize,
          totalPages: 0
        }
      };
    }
    
    return {
      code: 500,
      message: '服务器错误: ' + error.message,
      data: null
    };
  }
};