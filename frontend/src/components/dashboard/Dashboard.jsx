function Dashboard({ total }) {

    return (

        <div
            style={{
                maxWidth: "900px",
                margin: "30px auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                gap: "20px"
            }}
        >

            <Card titulo="📄 CV" valor="Cargado" />

            <Card titulo="💼 Ofertas" valor={total} />

            <Card titulo="⭐ Favoritos" valor="0" />

            <Card titulo="🤖 Score" valor="89%" />

        </div>

    )

}

function Card({ titulo, valor }){

    return(

        <div
            style={{
                background:"white",
                padding:"20px",
                borderRadius:"15px",
                boxShadow:"0 5px 15px rgba(0,0,0,.08)",
                textAlign:"center"
            }}
        >

            <h3>{titulo}</h3>

            <h1>{valor}</h1>

        </div>

    )

}

export default Dashboard