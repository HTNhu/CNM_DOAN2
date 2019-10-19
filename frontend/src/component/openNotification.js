import { notification } from 'antd'

   const openNotificationWithIcon = (type, key, message, description) => {
        notification[type]({
            key,
          message,
          description,
          placement: 'bottomRight',
          bottom: 50,
          duration: 3,
          })
}
export default openNotificationWithIcon