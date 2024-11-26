// interface InputProps{
//     id: string;
//     type: string;
//     label: string;
//     placeholder?: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }



// export const Input: React.FC<InputProps> =({ id, type, label, placeholder, value, onChange}) => {
//     return (
//         <fieldset>
//             <label htmlFor={id}>{label}</label>
//             <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange}/>
//         </fieldset>
//     )
// }

import React from 'react';
import styles from './styles.module.scss'

interface InputProps {
  type: string;
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ type, label, id, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};
