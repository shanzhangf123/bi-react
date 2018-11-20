

export default {

    /**
     * 存local
     */
    setLocalstorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * 根据key 获取
     */
    getLocalstorage(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    removeLocalStorage(key) {
        localStorage.removeItem(key);
    },

    /**
     * 存session
     */

    setSessionStorage(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data))
    },


    /**
     * 根据key 获取
     */
    getSessionstorage(key) {
        // console.log('sessionStorage.getItem(key)', sessionStorage.getItem(key));
        return JSON.parse(sessionStorage.getItem(key));
    },

    removeSessionStorage(key) {
        sessionStorage.removeItem(key);
    },



}