import { useState } from 'react';
import { v4 as id } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';

import { heroCreated } from '../../components/heroesList/heroesSlice';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const { request } = useHttp();

    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters)

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: id(),
            name,
            description,
            element
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(res => console.log(res, 'Hero was successfully created'))
            .then(dispatch(heroCreated(newHero)))
            .catch(error => console.log(error.message));

        setName('');
        setDescription('');
        setElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading of the elements...</option>
        }
        else if (status === 'error') {
            return <option>Loading error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                if (name === 'all') return;

                return <option value={name} key={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of new hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What can I do?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose elements for the hero</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option >My element is....</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;