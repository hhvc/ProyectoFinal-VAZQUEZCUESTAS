import { Container } from "react-bootstrap";
import Map from "./Map";
import VehicleForm from "./vehicles/VehicleForm";

export const Consigna = () => {
  return (
    <Container className="mt-4">
      <h1>SISTEMA DE CONSIGNACION</h1>

      <h3>Queremos que te resulte simple, por eso:</h3>
      <h5>- Te asesoramos para que obtengas el mejor resultado</h5>
      <h5>- Te bancamos con los gastos de preparación y alistaje</h5>
      <h5>- Si conveniente hacer arreglos costosos para obtener un mejor rendimiento, también podemos bancarte con los mismos</h5>
      <h5>- La desición siempre será tuya</h5>
      <br/>
      <h3>Traenos tu auto. ¡Te ayudaremos a venderlo!</h3>
      <Map/>
      <div>
      <h3>¿Querés ganar tiempo?:</h3>
      <p>Cargá los datos de tu auto</p>
      <p>Si no estás seguro de algún dato, no te preocupes, después lo corregimos</p>
      <VehicleForm/>
      </div>
    </Container>
  );
};