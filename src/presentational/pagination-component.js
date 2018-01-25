import React from 'react';

const Pagination = (props) => (
    <nav>
        <ul className="pagination">
            {props.pagesRange.map(number => {
                return (
                    <li key={number} onClick={() => props.currentPageHandler(number)} className={ number === props.currentPage ? 'page-item active' : 'page-item' }>
                        <a>{number}</a>
                    </li>
                );
            })}  
        </ul>
    </nav>
);

export default Pagination;