import React from 'react'
import styled from '@emotion/styled'

const Mensaje = styled.div`
    width: 60vh;
    margin: auto;
    background-color: #CD5C5C;
    color: #FFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    border-radius: 10px;
`

export const Error = ({ children }) => {
    return (
        <Mensaje>
            {children}
        </Mensaje>
    )
}
