import Container from "react-bootstrap/Container"
import CardItem from "./CardItem"

export const ItemListContainer=(props)=>{
    return(
        <Container className="mt-4">
            <h1>{props.greeting}</h1>
            <CardItem/>
        </Container>
    )
}