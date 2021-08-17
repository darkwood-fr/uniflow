import request from 'axios';
import server from '../../utils/server';
import { ApiException } from '../../models';

export const createLead = ({ email, optinNewsletter, optinBlog }) => {
  return async (dispatch) => {
    try {
      const response = await request.post(`${server.getBaseUrl()}/api/leads`, {
        email,
        optinNewsletter,
        optinBlog,
      });
      return response.data;
    } catch (error) {
      throw new ApiException(server.handleErrors(error.response));
    }
  };
};

export const getLead = (uid) => {
  return async (dispatch) => {
    const response = await request.get(`${server.getBaseUrl()}/api/leads/${uid}`);
    return response.data;
  };
};

export const updateLead = (uid, { optinNewsletter, optinBlog, optinGithub }) => {
  return async (dispatch) => {
    try {
      const response = await request.put(`${server.getBaseUrl()}/api/leads/${uid}`, {
        optinNewsletter,
        optinBlog,
        optinGithub,
      });
      return response.data;
    } catch (error) {
      throw new ApiException(server.handleErrors(error.response));
    }
  };
};
