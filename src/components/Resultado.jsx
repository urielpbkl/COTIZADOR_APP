import React from 'react'
import styled from '@emotion/styled'

const Contenedor = styled.div`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 35vh;
`

const Imagen = styled.img`
  display: block;
  width: 120px;
`

const Texto = styled.p`
  font-size: 18px;
    span{
      font-weight: 700;
    }
`

const Precio = styled.p`
  font-size: 24px;
  span{
    font-weight: 700;
  }
`

export const Resultado = ({ cotizacion }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion
  return (
    <Contenedor>
      
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt='Imagen Cripto'
      />
      <div>
        <Precio>Precio Actual: <span>{PRICE}</span></Precio>
        <Texto>Precio Máximo: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio Mínimo: <span>{LOWDAY}</span></Texto>
        <Texto>Cambio: <span>{CHANGEPCT24HOUR}%</span></Texto>
        <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
      </div>
    </Contenedor>
  )
}
