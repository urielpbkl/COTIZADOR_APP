import React, { useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Lato', sans-serif;
    color: #FFF;
    display: block;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

export const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('') // VA A CAMBIAR EL "state" CUANDO SELECCIONEMOS UNA OPCIÓN DEL "SELECT" 

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>

            <Select
                value={state}
                onChange={e => setState(e.target.value)} 
            >
                <option value="">Selecciona una Opción</option>

                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ))}

            </Select>

        </>
    )

    return [state, SelectMonedas]
}
