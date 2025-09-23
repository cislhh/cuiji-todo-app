'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { taskId } = event;
  
  console.log('task-delete 云函数调用，参数:', event);
  
  // 参数验证
  if (!taskId) {
    return {
      code: 400,
      message: '任务ID不能为空',
      data: null
    };
  }
  
  try {
    // 删除任务
    const result = await db.collection('todo-tasks').doc(taskId).remove();
    
    console.log('删除结果:', result);
    
    if (result.deleted === 1) {
      return {
        code: 0,
        message: '任务删除成功',
        data: {
          deletedCount: result.deleted
        }
      };
    } else {
      return {
        code: 404,
        message: '任务不存在或已被删除',
        data: null
      };
    }
  } catch (error) {
    console.error('删除任务失败:', error);
    console.error('错误详情:', error.message, error.stack);
    
    return {
      code: 500,
      message: '服务器错误: ' + error.message,
      data: null
    };
  }
};