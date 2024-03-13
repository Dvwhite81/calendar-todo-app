import { SyntheticEvent } from 'react';

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
}

const Search = ({ query, setQuery, handleSubmit }: SearchProps) => {
  return (
    <div className="search">
      <h2 className="pad-left">Search</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a search term..."
        />
        <button type="submit" className="btn submit-btn">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
