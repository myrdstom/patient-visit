import React from 'react'
import './loader.styles.scss'

export default function Loader() {
    return (
        <div className="wrap">
            <div className="loading">
                <div className="bounceball"/>
                <div className="text">LOADING DATA</div>
            </div>
        </div>
    )
}

