import axios from 'axios';
import environment from '../config/environment';
import storageConfig from './../config/storage-name';
import storage from './storage';
// import qs from 'qs';
const URL = environment.apiDomain;


export default {
  /**
     * get请求
     */
  axios_get (url, callback) {
    axios ({
      method: 'GET',
      headers: {'Content-type': 'application/json'},
      url: url,
      withCredentials: true,
    })
      .then (res => {
        // console.log('GET......', res);
        if (callback) {
          callback (res.data);
        }
      })
      .catch (error => {
        console.error ('GET......', error);
      });
  },

  /**
     * post请求
     */
  axios_post (url, data, callback) {
    // if (storage.getSessionstorage(storageConfig.SESSION_ID)) {
    //     data['session_id'] = JSON.parse(storage.getSessionstorage(storageConfig.SESSION_ID));
    // }
    let sendData = new FormData ();
    if (data !== null && data) {
      for (const key in data) {
        if (data.hasOwnProperty (key)) {
          if (typeof data[key] === 'object') {
            sendData.append (key, JSON.stringify (data[key]));
          } else {
            sendData.append (key, data[key]);
          }
        }
      }
    }
    if (storage.getSessionstorage (storageConfig.SESSION_ID)) {
      sendData.append (
        'session_id',
        storage.getSessionstorage (storageConfig.SESSION_ID)
      );
    }
    axios ({
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url: URL + url,
      data: sendData,
    })
      .then (res => {
        // console.log('Post......', res);
        if (callback) {
          callback (res.data);
        }
      })
      .catch (error => {
        console.error ('Post......', error);
      });
  },
};
