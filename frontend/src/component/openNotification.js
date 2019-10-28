import { notification } from 'antd'

   const openNotificationWithIcon = (type, key, message, description) => {
        notification[type]({
            key,
          message,
          description,
          placement: 'bottomRight',
          bottom: 50,
          duration: type==='success' ? 2 :5,
          })
}
export default openNotificationWithIcon