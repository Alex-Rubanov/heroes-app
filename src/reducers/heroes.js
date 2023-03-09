import { createReducer } from "@reduxjs/toolkit"

import {    heroesFetching,
            heroesFetched,
            heroesFetchingError,
            heroCreated,
            heroDeleted     } from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// This is another way how you can use createReducer but in this case it will not work with Typescript 
// and please remember to create all your actions with createAction funtion

const heroes = createReducer(initialState, {
    [heroesFetching]: state => {
            state.heroesLoadingStatus = 'loading';
        },
    [heroesFetched]: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
    [heroesFetchingError]: state => {
            state.heroesLoadingStatus = 'error';
        },
    [heroCreated]: (state, action) => {
            state.heroes.push(action.payload);
        },
    [heroDeleted]: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        },
    },
    [],
    state => state,
);

// You can use this createReducer function with Typescript but please remember to use createAction function to define your actions

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(() => {});
// })

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         default: return state
//     }
// }

export default heroes;