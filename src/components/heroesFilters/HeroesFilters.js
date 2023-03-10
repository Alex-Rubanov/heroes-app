import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import classNames from "classnames";
import store from '../../store/index';

import { activeFilterChanged, fetchFilters, selectAll } from "./filtersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const filters = selectAll(store.getState());

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Filters were not found</h5>
        }

        return arr.map(({name, label, className}) => {           

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                        id={name}
                        key={name}
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                    >
                        {label}
                    </button>
        });
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;