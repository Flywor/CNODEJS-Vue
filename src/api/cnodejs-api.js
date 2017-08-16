import fetchBase from './fetch-base'

const baseUrl = 'https://cnodejs.org/api/v1/'

const api = {
  GetTopics: (data) => {  // 主题首页
    return toFetch('topics', data, 'get')
  },
  GetTopic: (id) => { // 主题详情
    return toFetch(`topic/${id}`, null, 'get')
  },
  CreateTopics: (data) => { // 新建主题
    return toFetch('topics', data)
  },
  UpdateTopics: (data) => { // 编辑主题
    return toFetch('topics/update', data)
  },
  CollectTopic: (data) => { // 收藏主题
    return toFetch('topic_collect/collect', data)
  },
  DelCollect: (data) => { // 取消主题
    return toFetch('topic_collect/de_collect', data)
  },
  UserCollectTopic: (loginname) => { // 用户所收藏的主题
    return toFetch(`topic_collect/${loginname}`, null, 'get')
  },
  Replies: (topicId, data) => { // 新建评论
    return toFetch(`topic/${topicId}/update`, data)
  },
  Ups: (replyId, data) => { // 为评论点赞
    return toFetch(`reply/${replyId}/ups`, data)
  },
  User: (loginname) => { // 用户详情
    return toFetch(`user/${loginname}`, null, 'get')
  },
  Accesstoken: (data) => { // 验证accessToken
    return toFetch('accesstoken', data)
  },
  MessageCount: (data) => { // 获取未读消息数量
    return toFetch('message/count', data)
  },
  Messages: (data) => { // 获取已读和未读消息
    return toFetch('messages', data)
  },
  MarkAll: (data) => { // 标记全部已读
    return toFetch('message/mark_all', data)
  },
  MarkOne: (msgId, data) => { // 标记单个消息为已读
    return toFetch(`message/mark_one/${msgId}`, data)
  }
}

const toFetch = (url, data, method) => {
  return fetchBase(`${baseUrl}${url}`, data, method)
}

export default api
