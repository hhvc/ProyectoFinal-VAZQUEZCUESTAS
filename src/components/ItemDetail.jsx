export const ItemDetail = ({item}) => {

    return (
        <>
            <h1>{item.title}</h1>
            <img src={item.pictureUrl}/>
            <p>{item.description}</p>

        </>
    )
}

// {
//     id: 1,
//     title: "Cuadril",
//     description: "novillo",
//     price: 4000,
//     category: "carne",
//     pictureUrl:
//       "https://encarnepropia.com.ar/wp-content/uploads/2019/09/IMG_2980-2.jpg",
//   },