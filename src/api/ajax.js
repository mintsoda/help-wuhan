import axios from 'axios'
import qs from 'qs'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// const config = {
//   headers: {
//     'x-requested-with': 'XMLHttpRequest',
//     'Content-Type': 'application/json'
//   }
// }
const fetch = ({ url, body, type }) => {
  if (type === 'POST') {
    return axios.post(url, qs.stringify(body))
  } else {
    return axios.get(url, { params: body })
  }
}
export default fetch
