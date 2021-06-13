import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState(" Search for something.. ");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then((result) =>
      setResults(result)
    );
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
    console.log(searchOption);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 1) {
      return results[0].show
        ? results.map((item) => <div key={item.show.id}>{item.show.name}</div>)
        : results.map((item) => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search for something.."
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      <div>
        <label htmlFor="show-search">
          Shows
          <input
            id="show-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
