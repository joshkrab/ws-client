// rfc
import React from 'react';
import { usePages } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
   // Визиваємо функцію будування масива сторінок:
   let pagesArray = usePages(totalPages);

   return (
      <div className="page__wrapper">
         {pagesArray.map((item, index) => (
            <span
               onClick={() => changePage(item)}
               className={page === item ? 'page page__current' : 'page'}
               key={index}
            >
               {item}
            </span>
         ))}
      </div>
   );
};

export default Pagination;
