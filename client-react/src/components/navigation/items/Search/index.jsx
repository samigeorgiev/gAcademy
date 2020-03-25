import React from 'react';

import styles from './index.module.css';

import searchIcon from '../../../../assets/images/search.svg';

const Search = props => {
    return (
        <form className={styles.Search}>
            <input type="text" placeholder="Search for anything" />
            <button type="submit" className={styles.SearchButton}>
                <img src={searchIcon} alt="search icon" />
            </button>
        </form>
    );
};

export default Search;
