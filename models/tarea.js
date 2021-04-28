const { v4: uuidv4 } = require('uuid');

class Tarea {
        constructor ( desc, completadoEn ) {
            this.id=uuidv4(),
            this.desc=desc,
            this.completadoEn=null
        }
}

module.exports = Tarea;