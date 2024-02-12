import { Axios } from "./axios";

interface IProfileRequest {
  success: boolean;
  message: string;
  data: IProfileData;
}

export interface IProfileData {
  id?: number;
  email?: string;
  landline?: string | null;
  mobile?: string;
  country?: string | null;
  city?: string | null;
  travelAgentId?: string;
  logo?: string;
  representativeName?: string;
  companyName?: string | null;
  akama?: string;
  status?: number;
  creditLimit?: string | null;
  serviceCharges?: string | null;
  serviceChargesType?: string | null;
  wallet?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const GetAgentProfile = async () => {
  try {
    const response = await Axios.get<IProfileRequest>("/agent/profile");
    if (response.data.success) return response.data.data;
  } catch (error) {}
};
