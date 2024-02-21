import { Axios } from "./axios";

export interface IGetAllAgentBookings {
  success: boolean;
  message: string;
  data: {
    bookings?: IDashboardBookingData[];
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
  };
}

export interface IDashboardBookingData {
  id: number;
  itinerary_id: number | string;
  origin: string;
  destination: string;
  arrival_date_time: string;
  depart_date_time: string;
  flight_no: string;
  airline: string;
  agent_id: number;
  status: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  onIconClick:Function
}

type GetAllBookingProps = {
  page?: number;
  pageSize?: number;
};

export const GetALLAgentBookings = async (data?: GetAllBookingProps) => {
  try {
    let pageination = "";
    if (data) pageination = `?page=${data.page}&pageSize=${data.pageSize}`;
    const response = await Axios.get<IGetAllAgentBookings>(
      `/agent/bookings${pageination}`
    );
    if (response.data.success) return response.data.data;
  } catch (error) {}
};

//
export const GetAgentBookingById = async (id: number) => {
  try {
    const response = await Axios.get<IGetAllAgentBookings>(
      `/sabre/flights/booking/${id}`
    );
    if (response.data.success) return response.data.data;
  } catch (error) {}
};

//
export interface IDashboardResponse {
  success: boolean;
  message: string;
  data: AgentDashBoardData;
}

export type AgentDashBoardData = {
  totalUser: number;
  totalBookings: number;
  wallet: string;
  transactionLimit?: string;
};

export const GetDashboard = async () => {
  try {
    const response = await Axios.get<IDashboardResponse>(`/dashboard`);
    if (response.data.success) return response.data.data;
  } catch (error) {}
};
