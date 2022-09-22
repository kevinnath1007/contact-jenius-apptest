import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './instance/core';

export const api = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getContactList: build.query({
        query: () => ({url: '/contact', method: 'get'}),
      }),
      getContactById: build.query({
        query: id => ({url: `/contact/${id}`, method: 'get'}),
      }),
      postContact: build.mutation({
        query: data => ({url: '/contact', method: 'post', data}),
      }),
      updateContact: build.mutation({
        query: data => ({
          url: `/contact/${data.id}`,
          method: 'post',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            photo: data.photo,
          },
        }),
      }),
    };
  },
});
