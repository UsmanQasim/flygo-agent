import { Axios } from "./axios";

// Generic Interface

interface ILoginProps {
  email: string;
  password: string;
}

// ADMIN LOGIN

interface IAdminLoginResponse {
  success: boolean;
  message: string;
  data: IAdmingLoginData;
}

interface IAdmingLoginData {
  accessToken?: string;
  id?: number;
  email?: string;
  name?: string;
  role?: string;
}

export const login = async (data: ILoginProps) => {
  try {
    const response = await Axios.post<IAdminLoginResponse>(
      "/admin/login",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

// AGENT LOGIN

interface IAgentLoginData {
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
  createdAt?: string;
  updatedAt?: string;
  accessToken?: string;
  role?: string;
}

interface IAgentLoginResponse {
  success: boolean;
  message: string;
  data: IAgentLoginData;
}

export const loginAgent = async (data: ILoginProps) => {
  try {
    const response = await Axios.post<IAgentLoginResponse>(
      "/agent/login",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export interface FormData {
  fullName: string;
  email: string;
  password: string;
  landline: string;
  mobile: string;
  country: string;
  city: string;
  agentId: string;
  username: string;
  companyName: string;
  representativeName: string;
  akamaNumber: string;
  companyLogo?: File | null;
  documents?: File | null;
}



export const registerAgent = async (data: FormData) => {
  try {
    const response = await Axios.post<any>(
      "/agent/register",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
