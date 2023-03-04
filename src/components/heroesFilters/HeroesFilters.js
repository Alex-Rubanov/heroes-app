
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">All</button>
                    <button className="btn btn-danger">Fire</button>
                    <button className="btn btn-primary">Water</button>
                    <button className="btn btn-success">Wind</button>
                    <button className="btn btn-secondary">Earth</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;