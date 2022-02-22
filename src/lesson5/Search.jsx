import { useLocation } from 'react-router-dom';

const Items = [
    'Lorem Ipsum',
    'Ipsum Dipsum',
    'Foo Bar',
    'A little black cat',
    'A lazy fox',
    'A jumping dog'
];

const doSearch = term => {
    if (!term) {
        return Items;
    }

    return Items.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) !== -1);
};

const Search = () => {
    const query = new URLSearchParams(useLocation().search);
    const term = query.get('q');
    const returned = doSearch(term);

    return (
        <div>
            <h1>Search Page</h1>
            <hr />
            Found results for {term}:
            <ul>
                {returned.map(t => (<li key={t}>{t}</li>))}
            </ul>
        </div>
    );
};

export default Search;