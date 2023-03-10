import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes, heroesFilteredSelector } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss'

const HeroesList = () => {
    const filteredHeroes = useSelector(heroesFilteredSelector);

    const {heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data, 'Successfully deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(error => console.log(error))

        // eslint-disable-next-line 
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero"
                >
                    <h5 className="text-center mt-5">There are no available heroes at the moment</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id} 
                    timeout={500} 
                    classNames="hero">
                    <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup>
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;