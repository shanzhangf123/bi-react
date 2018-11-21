import notification from './notification';
import storage from './../utils/storage';
import storageConfig from './../config/storage-name';

var ws = new WebSocket ('ws://dev-bi-im.blockbi.com:9988/chat');

var keep = () => {
  setInterval (() => {
    onsend ({
      act: -1,
      data: {
        uuid: storage.getSessionstorage (storageConfig.USER_DATA).uuid,
        psid: storage.getSessionstorage (storageConfig.COMPANY_INFO)[0].psid,
        session_id: storage.getSessionstorage (storageConfig.SESSION_ID),
      },
    });
  }, 25000);
};

export function onerror () {
  ws.onerror = () => {};
}

export function onopen () {
  ws.onopen = () => {};
  keep ();
}

ws.addEventListener ('message', message => {
  notification.postNotification (JSON.parse (message.data));
});

export function onclose () {
//   onsend ({
//     act: 199002,
//     data: {
//       uuid: storage.getSessionstorage (storageConfig.USER_DATA).uuid,
//       psid: storage.getSessionstorage (storageConfig.COMPANY_INFO)[0].psid,
//       session_id: storage.getSessionstorage (storageConfig.SESSION_ID),
//     },
//   });
  ws.onclose = () => {
    console.log ('ws 关闭');
  };
}

export function onsend (data) {
  ws.send (JSON.stringify (data));
}
