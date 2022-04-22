
const URL = "http://192.168.1.76:8000/api/";


const crearUsuario = (nombre,apellidos,correo, password) => {
    fetch(URL+'usuarios',{
        method: 'POST',
        body: JSON.stringify({
            nombre,
            apellidos,
            correo,
            password
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
    });
};

const Categorias = () => {
    fetch(URL+'categorias',{
        method: 'GET',
        
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
    });
};
const productosPorCategoria = (id) => {
    fetch(URL+'productosCategoria',{
        method: 'GET',
        body: JSON.stringify({
            id
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
    });
};

const compararClave = (correo,password) => {
    fetch(URL+'login',{
        method: 'POST',
        body: JSON.stringify({
            correo,
            password
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.data);
    });
};


module.exports ={crearUsuario, compararClave, productosPorCategoria, Categorias};
