/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cleraMyProfileInfo } from '../MyProfilePage/MyProfilePageSlice';
import { clearLogOutMessage, userLoggedOut } from '../auth/authSlice';
import { changeMaintenanceStatus } from '../Maintenance/MaintenanceSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    // console.log('in apiSlice prepareHeaders, token = ', token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) =>{
    let results = await baseQuery(args, api, extraOptions);
    // console.log("results = ",results);
    if(results?.error?.status === 401){
      // console.log("results.error.status = ",results.error.status);
      const accessToken = api.getState()?.auth?.accessToken;
      // console.log("accessToken = ", accessToken);
      if (accessToken){
        api.dispatch(cleraMyProfileInfo());    
        api.dispatch(userLoggedOut());
        api.dispatch(clearLogOutMessage());
        localStorage.clear();
        api.dispatch(apiSlice.util.resetApiState());
      }    
    }

    if(results?.error?.status === "FETCH_ERROR"){
      const underMaintenanceStatus= api.getState()?.Maintenance?.underMaintenanceStatus;
      // console.log("underMaintenanceStatus = ",underMaintenanceStatus);
      if (!underMaintenanceStatus){
        
      // console.log("yoo");
        api.dispatch(changeMaintenanceStatus());    
      }    
    }
    

    return results;
  },
  endpoints: () => ({})
});
