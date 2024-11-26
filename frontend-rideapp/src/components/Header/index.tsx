import React from 'react'
import styles from './styles.module.scss'

export const Header: React.FC = () =>{
    return(
        <header className={styles.header}>
        <h1>ShopperDriver</h1>
        </header>
    )
}