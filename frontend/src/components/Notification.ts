import { notification } from "antd";
import { NotificationInt } from "../interfaces/NotificationInt";
import 'antd/es/notification/style/index.css'
// import 'antd/dist/antd.css';


export const showNotification = ({
  type,
  message,
  description = "",
  duration = 3,
  placement = "topRight",
}: NotificationInt): void => {
  notification[type]({
    message,
    description,
    duration,
    placement,
  });
};
