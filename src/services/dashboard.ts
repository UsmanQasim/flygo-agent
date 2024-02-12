import { Axios } from "./axios";

interface IGetAllAgentBookings {
  success: boolean;
  message: string;
  data: [];
}

export const GetALLAgentBookings = async () => {
  try {
    const response = await Axios.get<IGetAllAgentBookings>("/agent/bookings");
    if (response.data.success) return response.data.data;
  } catch (error) {}
};
