import fetch from './ajax'

export const DEBUG = false // 是否开发模式
// const ROOT_DEV = '/xj/topic2017/' // 测试地址
const ROOT_DEV = 'https://didi.360che.com/topic2017/' // 测试地址
const ROOT = 'https://topic.360che.com/' // 正式地址
const ROOTS = DEBUG ? ROOT_DEV : ROOT
const URLS = `${ROOTS}m/2020010801/` // 正式地址
console.log(URLS)
class XHR {
  // 获取微信jssdk config接口
  getWechatJsSdk (json) {
    return fetch({
      url: `${ROOTS}api/wx/getinfo.aspx`,
      body: json,
      type: 'GET'
    })
  }
  // 获得活动截止时间
  getShowTime (json) {
    return fetch({
      url: `${URLS}getalmanac.aspx`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()
