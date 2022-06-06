import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Formulario } from './components/Formulario'
import { Resultado } from './components/Resultado'
import { Spinner } from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    column-gap: 2rem;
  }
`

const divVacio = styled.div`
  max-width: 400px;
  margin: 100px auto 0 auto;
  width: 80%;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 54vh;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({}) //ES EL "state" QUE VA A CONTENER LOS DATOS DE LAS CRIPTOS DE LADIVISA
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false) //PARA MOSTRAR EL SPINNER

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCotizacion({}) //REINICIAMOS EL OBJETO QUE CONTIENE LOS DATOS DE COTIZACIÓN CADA QUE EJECUTEMOS UNA CONSULTA
        setCargando(true) //MOSTRAMOS EL SPINNER
        const { moneda, criptomoneda } = monedas //HACEMOS "object destructuring" EN EL OBJECTO "monedas" QUE SE LLENA EN EL COMPONENTE "Formulario" A TRAVÉS DEL HOOK "useState" DECLARADO ARRIBA
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` //ACCEDEMOS A LA "url" DE LA API
        const respuesta = await fetch(url) //NOS RETORNA UNA "RESPUESTA HTTP(500,200,400, etc)" DEL REQUEST
        const resultado = await respuesta.json() //NOS PERMITE CONVERTIR EL "REQUEST" A UN OBJETO NATIVO DE JAVASCRIPT, ES UN SERIALIZADOR
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false) //QUITAMOS EL SPINNER
      }

      cotizarCripto()
    }
  }, [monedas])


  return (
    <Contenedor>

      {cotizacion.PRICE ? ( /* SI TENEMOS UNA COTIZACIÓN LA MOSTRAMOS*/
        <Resultado cotizacion={cotizacion} />  
      ) : (
        <divVacio>{cargando && <Spinner/>}</divVacio> //SINO TENEMOS UNA COTIZACIÓN MOSTRAMOS UN "div" VACÍO O SI ESTÁ CARGANDO INFORMACIÓN MOSTRAMOS EL S´PINNER
      )}

      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
      </div>
    </Contenedor>

  )
}

export default App
