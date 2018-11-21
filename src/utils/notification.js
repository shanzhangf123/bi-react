import {Subject} from 'rxjs';

// export default Notification {

// }

var notificationSource = new Subject ();
var notification = notificationSource.asObservable ();

export default {
  postNotification (message) {
    notificationSource.next (message);
  },
  getNotification () {
    return notification;
  },
};
