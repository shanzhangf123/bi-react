

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
        return  localStorage.getItem(key);
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
       return sessionStorage.getItem(key); 
    },

    removeSessionStorage(key) {
        sessionStorage.removeItem(key);
    },



}