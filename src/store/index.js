import { configureStore } from '@reduxjs/toolkit';

import filters from '../components/heroesFilters/filtersSlice';
import { sliceApi } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }

    return next(action);
}

const store = configureStore({
    reducer: {filters, [sliceApi.reducerPath]: sliceApi.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, sliceApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;