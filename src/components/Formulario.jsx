import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { Error } from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]) //CREAMOS EL "state" QUE VA ACONTENER LOS DATOS DE LAS CRIPTOS, INICIALIZÁNDOLO COMO UN ARREGLO VACÍO QUE VAMOS A LLENAR ABAJO CON LOS DATOS DE LA "api"
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas) //"monedas" VIENE DEL ARCHIVO "monedas.jsx" DE LA CARPETA "data"
    const [criptomoneda, SelectCriptoMoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)
    const [error, setError] = useState(false)

    useEffect(() => {

        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' //ACCEDEMOS A LA "url" DE LA API
            const respuesta = await fetch(url) //NOS RETORNA UNA "RESPUESTA HTTP(500,200,400, etc)" DEL REQUEST
            const resultado = await respuesta.json() //NOS PERMITE CONVERTIR EL "REQUEST" A UN OBJETO NATIVO DE JAVASCRIPT, ES UN SERIALIZADOR

            const arrayCriptos = resultado.Data.map(cripto => { //CREAMOS UN ARRAY CON LOS DATOS QUE OBTUVIMOS DEL "REQUEST"
                const datosCripto = {
                    id: cripto.CoinInfo.Name, //EL "id" VA A SER IGUAL A SU TICKER
                    nombre: cripto.CoinInfo.FullName, //EL NOMBRE VA A SER IGUAL AL NOMBRE DE LA CRIPTO
                }
                return datosCripto //RETORNAMOS EL OBJETO CON LOS DATOS DE LAS CRIPTOS
            })
            setCriptos(arrayCriptos)
        }
        consultarAPI(); //UNA VEZ QUE SE CARGA EL COMPONENTE EJECUTAMOS LA "CONSULTA" A LA "API"
    }, []) //CUANDO ESTÉ LISTO EL COMPONENTE "Formulario" VA A EJECUTARSE LA CONSULTA UNA SOLA VEZ, POR ESO ESTÁ VACÍO EL ARREGLO

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) { //SI ALGUNO DE LOS DOS "states" TIENE UN STRING VACÍO
            setError(true) //MOSTRAMOS UN MENSAJE DE ERROR
            return //SE DETIENE AQUÍ LA EJECUCUIÓN Y NO SE EJECUTA EL CÓDIGO DE ABAJO DE LA FUNCIÓN
        }
        setError(false) //SI NO SE CUMPLE LA CONDICIÓN DE ARRIBA, ELIMINAMOS EL MENSAJE DE ERROR
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los Campos son Obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptoMoneda />
                <InputSubmit type='submit' value='Cotizar' />
            </form>
        </>

    )
}
