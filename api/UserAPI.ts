import { BasicResponse, ResponseModel } from "@/models/Generic";
import { LoginPayload, UserData } from "@/models/User";
import request from "@/utils/request";

const endpoints = {
  login: `/auth/login`,
  logout: `/auth/logout`,
  getUserDetails: `/auth/get-user-details`,
};

const userAPI = {
  login: (payload: LoginPayload) => {
    return request.post<LoginPayload, BasicResponse>(endpoints.login, payload);
  },
  getUserDetails: () => {
    return request.get<object, ResponseModel<{ user: UserData }>>(
      endpoints.getUserDetails,
    );
  },
  logout: () => {
    return request.post<object, BasicResponse>(endpoints.logout, {});
  },
};

export default userAPI;
