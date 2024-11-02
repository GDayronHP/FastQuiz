import React from 'react'

import styles from "../styles/login.module.css";


const Login = ({src, alt, text}) => {
    return (
        <React.Fragment>
            <div className={styles ['auth-container']}>
                <img src={src} alt={alt} />
                <p>{text}</p>
            </div>
        </React.Fragment>
    )
}

export default Login