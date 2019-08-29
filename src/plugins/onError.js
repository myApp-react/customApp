import { message, notification } from 'antd'
message.config({
  top: 100,
  maxCount: 1,
  duration: 1
});
notification.config({
  top: 50,
  duration: 3,
});

export default {
  onError(e, dispatch) {
    e.preventDefault()
    if(e.message)
      // message.error(e.message)
      notification["error"]({ message: "出错啦！", description: e.message, });
  },
}
