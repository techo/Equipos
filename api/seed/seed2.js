//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js

const { Equipo, Usuario, UsuarioEnEquipo, Role } = require("../models")
const axios = require("axios")

let equipos, usuarios

const getEquipos = () => {
    return Equipo.findAll()
        .then((eqs) => equipos = eqs)
}

const getUsuarios = () => {
    return Usuario.findAll()
        .then(usrs => usuarios = usrs)
}

const addUserToEquipos = async (equipo, num1, num2, token) => {
    for (let i = num1; i < num2; i++) {
       await axios.put(`http://localhost:3001/api/equipos/${equipos[equipo].id}/${usuarios[i].idPersona}`, {token})
    }
}


//INSTRUCCIONES PARA SEEDAR DB --> En package.json hay un script "seed":
// 1--> Al final de esa linea poner 1 "/seed1" y escribir en la consola npm run seed p/seedear seed1.js
// 2--> Al final de esa linea poner 2 "/seed2" y escribir en la consola npm run seed p/seedear seed2.js
// 3--> Al final de esa linea poner 3 "/seed3" y escribir en la consola npm run seed p/seedear seed3.js

let usuariosEnEquipos, roles

const getUsuarioEnEquipo = () => {
    return UsuarioEnEquipo.findAll()
        .then(usuarios => usuariosEnEquipos = usuarios)
}

const getRoles = () => {
    return Role.findAll()
        .then(rolesArr => roles = rolesArr)
}

const agregarRoles = async (userEq, rol, token) => {
        await axios.put(`http://localhost:3001/api/equipos/${usuariosEnEquipos[userEq].equipoId}/${usuariosEnEquipos[userEq].usuarioIdPersona}/${roles[rol].id}`, {token})
        .catch(err => console.log(err))
    }


const login = async () => {
    return await axios.post("http://localhost:3001/api/usuarios/login", {
        mail: "mariana.gutierrez@gmail.com",
        password: "123456789"
      })
      .then(res => res.data.token)
      .catch(err => console.log(err));
}

getEquipos()
    .then(() => getUsuarios()
        .then(() => login())
        .then(async (token) => {
            await addUserToEquipos(0, 0, 7, token)
            await addUserToEquipos(1, 2, 7, token)
            await addUserToEquipos(2, 1, 5, token)
            await addUserToEquipos(3, 0, 6, token)
            await addUserToEquipos(4, 3, 7, token)
            await addUserToEquipos(5, 1, 6, token)
            return token
        })
        .then(token => {
            console.log("second seed done!!!")
            getUsuarioEnEquipo()
            .then(() => 
                getRoles()
                .then(() => {
                    agregarRoles(0, 0, token)
                    agregarRoles(1, 3, token)
                    agregarRoles(2, 5, token)
                    agregarRoles(3, 5, token)
                    agregarRoles(4, 7, token)
                    agregarRoles(5, 2, token)
                    agregarRoles(6, 0, token)
                    agregarRoles(7, 5, token)
                    agregarRoles(8, 2, token)
                    agregarRoles(9, 6, token)
                    agregarRoles(10, 4, token)
                    agregarRoles(11, 5, token)
                    agregarRoles(12, 9, token)
                    agregarRoles(13, 9, token)
                    agregarRoles(14, 1, token)
                    agregarRoles(15, 6, token)
                    agregarRoles(16, 0, token)
                    agregarRoles(17, 4, token)
                    agregarRoles(18, 2, token)
                    agregarRoles(19, 1, token)
                    agregarRoles(20, 6, token)
                })
            )
        })
    )