import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sliceApi= createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'],
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes'],
        }),
        heroCreated: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes'],
        }),
        heroDeleted: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Heroes'],
        }),
    }),
});

export const {  useGetHeroesQuery, useHeroCreatedMutation, useHeroDeletedMutation } = sliceApi;