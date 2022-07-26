const readline = require('readline');

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
       await axios.put(`http://159.223.219.133:3001/api/equipos/${equipos[equipo].id}/${usuarios[i].idPersona}`,{}, {headers: {authorization: token, idPersona: "791718"}})
       .then(()=>{
            readline.clearLine(process.stdout);
            readline.cursorTo(process.stdout, 0, null)
            const show = "equipos "+(equipo+1)+"/6"+", usuarios: "+(i-num1+1)+"/"+(num2-num1)
            process.stdout.write(show)
        })
        .catch(err => console.log(err.message))
    }
}

let usuariosEnEquipos, roles

const getUsuarioEnEquipo = () => {
    return UsuarioEnEquipo.findAll()
        .then(usuarios => usuariosEnEquipos = usuarios)
}

const getRoles = () => {
    return Role.findAll()
        .then(rolesArr => roles = rolesArr)
}

let loading = 0;
const agregarRoles = async (userEq, rol, token) => {
        await axios.put(`http://159.223.219.133:3001/api/equipos/${usuariosEnEquipos[userEq].equipoId}/${usuariosEnEquipos[userEq].usuarioIdPersona}/${roles[rol].id}`,{}, {headers: {authorization: token, idPersona: "791718"}})
        .then(()=>{
            readline.clearLine(process.stdout);
            readline.cursorTo(process.stdout, 0, null)
            const show = loading === 20 ? loading+"/20\n": loading+"/20";
            process.stdout.write(show)
            loading++
        })
        .catch(err => console.log(err))
    }


const login = async () => {
    return await axios.post("http://159.223.219.133:3001/api/usuarios/login", {
        mail: "mariana.gutierrez@gmail.com",
        password: "123456789"
      })
      .then(res => res.data.token)
      .catch(err => console.log(err));
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function waitingForApi(ms) {
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0, null)
    process.stdout.write("esperando a la api")
    await timeout(ms);
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0, null)
    process.stdout.write("continuando")
}

getEquipos()
    .then(() => getUsuarios()
        .then(() => login())
        .then(async (token) => {
            console.log("comenzando segunda seed")
            await addUserToEquipos(0, 0, 7, token)
            await addUserToEquipos(1, 2, 7, token)
            await addUserToEquipos(2, 1, 5, token)
            await addUserToEquipos(3, 0, 6, token)
            await addUserToEquipos(4, 3, 7, token)
            await waitingForApi(20000)
            await addUserToEquipos(5, 1, 6, token)
            return token
        })
        .then(token => {
            console.log("\nsegunda seed lista!!!")
            getUsuarioEnEquipo()
            .then(() => 
                getRoles()
                .then(async () => {
                    console.log("terminando tercer seed:")
                    await agregarRoles(0, 0, token)
                    await agregarRoles(1, 3, token)
                    await agregarRoles(2, 5, token)
                    await agregarRoles(3, 5, token)
                    await agregarRoles(4, 7, token)
                    await agregarRoles(5, 2, token)
                    await agregarRoles(6, 0, token)
                    await agregarRoles(7, 5, token)
                    await agregarRoles(8, 2, token)
                    await agregarRoles(9, 6, token)
                    await agregarRoles(10, 4, token)
                    await agregarRoles(11, 5, token)
                    await agregarRoles(12, 9, token)
                    await agregarRoles(13, 9, token)
                    await agregarRoles(14, 1, token)
                    await agregarRoles(15, 6, token)
                    await agregarRoles(16, 0, token)
                    await agregarRoles(17, 4, token)
                    await agregarRoles(18, 2, token)
                    await agregarRoles(19, 1, token)
                    await agregarRoles(20, 6, token)
                })
            )
        })
    )