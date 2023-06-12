import { axios } from '@/utils/request'

export default {
  upload: function upload(formData) {
    return axios({
      url: '/file/upload',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary9pboUKsOrH51ULHV',
      },
    })
  },
}
