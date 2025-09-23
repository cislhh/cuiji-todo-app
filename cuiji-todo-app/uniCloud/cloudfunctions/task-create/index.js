'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { title, description, priority = 2, category, dueDate } = event;
  
  console.log('task-create 云函数调用，参数:', event);
  
  // 参数验证
  if (!title || title.trim() === '') {
    return {
      code: 400,
      message: '任务标题不能为空',
      data: null
    };
  }
  
  try {
    // 构建任务数据
    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: parseInt(priority) || 2,
      category: category || '默认分类',
      completed: false,
      createTime: new Date(),
      updateTime: new Date(),
      userId: context.CLIENTIP || 'anonymous' // 临时使用IP作为用户标识
    };
    
    // 如果有截止日期，添加到数据中
    if (dueDate) {
      taskData.dueDate = new Date(dueDate);
    }
    
    console.log('准备插入的任务数据:', taskData);
    
    // 插入数据库
    const result = await db.collection('todo-tasks').add(taskData);
    
    console.log('插入结果:', result);
    
    if (result.id) {
      return {
        code: 0,
        message: '任务创建成功',
        data: {
          id: result.id,
          ...taskData
        }
      };
    } else {
      return {
        code: 500,
        message: '任务创建失败',
        data: null
      };
    }
  } catch (error) {
    console.error('创建任务失败:', error);
    console.error('错误详情:', error.message, error.stack);
    
    return {
      code: 500,
      message: '服务器错误: ' + error.message,
      data: null
    };
  }
};