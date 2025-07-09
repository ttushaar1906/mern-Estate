import axios from "axios";
import { scheduleHomeTour, viewHomeTour } from "../../apis/homeTour";
import { scheduleHomeTourInt } from "../../interfaces/ScheduleHomeTour";

export const viewHomeTourFn = async () => {
  const response = await axios.get(viewHomeTour, { withCredentials: true });
  return response.data.response;
};

export const scheduleHomeTourFn = async (scheduleData: scheduleHomeTourInt) => {
  const response = await axios.post<scheduleHomeTourInt>(scheduleHomeTour, scheduleData, {
    withCredentials: true,
  });
  return response
};
