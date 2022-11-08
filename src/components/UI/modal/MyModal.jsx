// rfc
import React from 'react';
import classes from './MyModal.module.css';

const MyModal = ({ children, visible, setVisible }) => {
   const rootClasses = [classes.myModal];

   // Додаємо перевірку на видимість:
   if (visible) {
      rootClasses.push(classes.active);
   }

   return (
      // .join(' ') - метод повертає рядок, тобто два класа з'єднає через пробіл:
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
         {/* Пропс чілдрен переносить контент з тега */}
         <div
            className={classes.myModalContent}
            onClick={(event) => {
               // Прибираємо вспливання події, щоб на вікно не діяла подія батька
               event.stopPropagation();
            }}
         >
            {children}
         </div>
      </div>
   );
};

export default MyModal;
