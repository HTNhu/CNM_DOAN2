import { notification } from 'antd'

   const openNotificationWithIcon = (type, key, message, description) => {
        notification[type]({
            key,
          message,
          description,
          placement: 'bottomRight',
          bottom: 50,
          duration: 1,
          })
}
export default openNotificationWithIcon