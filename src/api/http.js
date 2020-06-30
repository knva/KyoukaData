import axios from 'axios'
class Http {
    constructor(){
      this.Domain = '/api/';
    }
    require(options) {
      if (!options.api) throw new Error('api 不能为空');
      if (!options.param) { options.param = {} }; 
      if (!options.methods) { options.methods = 'POST' }; //不传递方法默认为POST
  
      return new Promise((resolve,reject) => {
          return axios({
              method: options.methods,
              url: options.api,
              baseURL: this.Domain,
              headers: {
                  'token': options.param.MemberToken
              },
              data: options.param
          }).then(response => {
              if(response.data.code === 0){ //请求成功
                  return resolve(response.data)
              }else{
                  console.log(response.data.msg)
                  return reject(response.data)
              }
          },error => {
              Indicator.close();
              console.log(error)
              return reject()
          })
      })
    }
  }
  export default Http;