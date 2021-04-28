require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo.js");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");

const Tareas = require("./models/tareas.js");

const main = async () => {
  const tareas = new Tareas();
  let opt = "";
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //Imprimir el Menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Crear Opcion
        const desc = await leerInput("Descripción:  ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarCompletadas(true);
        break;
      case "4":
        tareas.listarCompletadas(false);
        break;
      case "5":
        const ids=  await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareaBorrar(tareas.listadoArr);
        if (id != "0") {
          const ok = await confirmar("¿Estas seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada".italic);
          }
        }
        break;
      case "7":
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};
main();
