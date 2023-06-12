/* 
localstorage 增强
Enhance localStorage -- Start --
usage: cusLocalStorage.setItem('infos','name','jayce) ==> "infos":"{'name':'jayce'}"
cusLocalStorage.getItem('infos','name') ==> "jayce"
cusLocalStorage.removeItem('infos','name') ==> "'infos':'{}'"
*/

!((localStorage) => {
  window.cusLocalStorage = {
    setItem: function (objkey, fieldkey, fieldval) {
      this.errorCatch(objkey, fieldkey, fieldval)
      let getObj = localStorage.getItem(objkey)
      if (getObj == null) {
        localStorage.setItem(
          objkey,
          JSON.stringify({
            [fieldkey]: fieldval,
          })
        )
      } else {
        let JsonObj = JSON.parse(getObj)
        JsonObj[fieldkey] = fieldval
        localStorage.setItem(objkey, JSON.stringify(JsonObj))
      }
    },
    getItem: function (objkey, fieldkey) {
      this.errorCatch(objkey, fieldkey)
      let getObj = localStorage.getItem(objkey)
      if (getObj != null) {
        return JSON.parse(getObj)[fieldkey]
      } else {
        return null
      }
    },
    removeItem: function (objkey, fieldkey) {
      this.errorCatch(objkey, fieldkey)
      let getObj = localStorage.getItem(objkey)
      if (getObj != null) {
        try {
          let jsonObj = JSON.parse(getObj)
          delete jsonObj[fieldkey]
          localStorage.setItem(objkey, JSON.stringify(jsonObj))
        } catch (e) {}
      }
    },
    errorCatch: function () {
      // prettier-ignore
      if (typeof arguments[0] != 'string' || typeof arguments[1] != 'string') {
    throw new Error('param1 AND param2, must be a string expected !')
  }
    },
  }
})(localStorage)

/* Enhance localStorage -- End -- */
