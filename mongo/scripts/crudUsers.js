const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

/*
TODO: reemplazar <password> por el password, ver de setear variable de entorno 
para la conexion
*/
const uri = 'mongodb+srv://admin:admin@administrappcluster-qjglj.mongodb.net/test?retryWrites=true&w=majority';
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

client.connect((err, result) =>{
    if(!err){
        console.log(chalk.blue('Cliente conectado'));
        let collection = result.db("administrapp").collection("usuarios");
            
        collection.find().limit(20).toArray((err, result) => {
            console.log(result);
            crud(collection);
        });
    } else {
        console.log(chalk.red(err));
    }
});

// Insert user
function insertUser(collection){
    return new Promise((resolve)=>{
        const nuevoUsuario = 
        { 
            nombre: 'Jose', 
            apellido: 'Perez', 
            mail: 'jperez@gmail.com', 
            telefono: '101112', 
            nombreUsuario: 'jperez', 
            password: 'jose', 
            mensajes: [ ] 
        }
        resolve(collection.insertOne(nuevoUsuario));
    });
}

// Update inventor
function updateUser(collection){
    return new Promise((resolve)=>{
        resolve(collection.updateOne({apellido: "Perez"}, {$set: {password: 'abc123'}}));
    });
}

// Delete inventor
function deleteUser(collection){
    return new Promise((resolve)=>{
        resolve(collection.deleteOne({apellido: "Perez"}));
    });
}

// CRUD function
async function crud(collection){
    /*
    await insertUser(collection)
        .then( () => {
            console.log(chalk.yellow("Usuario insertado correctamente"));
        })
        .catch(error => {
            console.log("Error!", error);
        });
    
    await updateUser(collection)
        .then( () => {
            console.log(chalk.yellow("Usuario actualizado correctamente"));
        })
        .catch(error => {
            console.log("Error!", error);
        });
    */
    await deleteUser(collection)
        .then( () => {
            console.log(chalk.yellow("Usuario eliminado correctamente"));
        })
        .catch(error => {
            console.log("Error!", error);
        });
    
}
