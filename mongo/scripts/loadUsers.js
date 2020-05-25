db = db.getSiblingDB('administrapp');
db.usuarios.drop();
db.usuarios.insertMany([
      { 
        nombre: 'Sebastian', 
        apellido: 'Panetta', 
        mail: 'sebastianpanetta@gmail.com', 
        telefono: '123123', 
        nombreUsuario: 'spanetta', 
        password: 'admin', 
        mensajes: [ ] 
      },
      { 
        nombre: 'Juan', 
        apellido: 'Acunia', 
        mail: 'jfacunia@gmail.com', 
        telefono: '321321', 
        nombreUsuario: 'jacunia', 
        password: 'admin', 
        mensajes: [ ] 
      }
]);