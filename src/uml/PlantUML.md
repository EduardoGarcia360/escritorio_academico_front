# diagrama de ER para las tablas en formato PLANT UML
# este se puede ver graficamente desde:
# https://www.plantuml.com/plantuml/uml/SoWkIImgAStDuNBCoKnELT2rKt3AJx9IS2mjoKZDAybCJYp9pCzJ24ejB4qjBk42oYde0jM05MDHLLoGdrUSoeLkM5u-K5sHGY9sGo6ARNHr2QY66kwGcfS2SZ00

@startuml

package "Principal" #FFD54F {
	class Colegio  {
	  **id_colegio**: INT AUTO_INCREMENT PRIMARY KEY
	  nombre: VARCHAR(100) NOT NULL
	  direccion: VARCHAR(255)
	  telefono: VARCHAR(20)
	  correo_electronico: VARCHAR(100)
	  pagina_web: VARCHAR(100)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}
}

package "Registro Estudiantes" #4FC3F7 {
	class CicloEscolar  {
	  **id_ciclo**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre: VARCHAR(50) NOT NULL
	  fecha_inicio: DATE NOT NULL
	  fecha_fin: DATE NOT NULL
	  estado: ENUM('A','I','C')
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class NivelEducacion  {
	  **id_nivel**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre: VARCHAR(50) NOT NULL
	  descripcion: VARCHAR(255)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Jornada  {
	  **id_jornada**: INT AUTO_INCREMENT PRIMARY KEY
	  id_nivel: INT NOT NULL
	  nombre: VARCHAR(50) NOT NULL
	  horario_inicio: TIME
	  horario_fin: TIME
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class JornadaCicloEscolar  {
	  **id_jornada_ciclo**: INT AUTO_INCREMENT PRIMARY KEY
	  id_jornada: INT NOT NULL
	  id_ciclo: INT NOT NULL
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Grado  {
	  **id_grado**: INT AUTO_INCREMENT PRIMARY KEY
	  id_jornada_ciclo: INT NOT NULL
	  nombre: VARCHAR(50) NOT NULL
	  seccion: VARCHAR(10)
	  descripcion: VARCHAR(255)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Estudiante  {
	  **id_estudiante**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_completo: VARCHAR(100) NOT NULL
	  identificacion: VARCHAR(50) UNIQUE NOT NULL
	  telefono_contacto: VARCHAR(20)
	  correo_electronico: VARCHAR(100)
	}

	class Grado  {
	  **id_grado**: INT AUTO_INCREMENT PRIMARY KEY
	  id_jornada_ciclo: INT NOT NULL
	  nombre: VARCHAR(50) NOT NULL
	  seccion: VARCHAR(10)
	  descripcion: VARCHAR(255)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class PersonalDocente  {
	  **id_docente**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_completo: VARCHAR(100) NOT NULL
	  identificacion: VARCHAR(50) UNIQUE NOT NULL
	  telefono: VARCHAR(20)
	  correo_electronico: VARCHAR(100) UNIQUE
	  direccion: VARCHAR(255)
	  titulo_academico: VARCHAR(100)
	  codigo_empleado: VARCHAR(20) UNIQUE
	  fecha_ingreso: DATE
	  fecha_egreso: DATE
	  especialidad: VARCHAR(50)
	  estado_empleo: ENUM('A','L','R')
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Estudiante  {
	  **id_estudiante**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_completo: VARCHAR(100) NOT NULL
	  fecha_nacimiento: DATE
	  identificacion: VARCHAR(50) UNIQUE NOT NULL
	  direccion: VARCHAR(255)
	  telefono_contacto: VARCHAR(20)
	  correo_electronico: VARCHAR(100)
	  nombre_tutor: VARCHAR(100)
	  telefono_tutor: VARCHAR(20)
	  estado_matricula: ENUM('A','R','G')
	  codigo_estudiante: VARCHAR(20) UNIQUE
	  fecha_inscripcion: DATE NOT NULL
	  sexo: ENUM('M','F','O')
	  condiciones_especiales: VARCHAR(255)
	  observaciones: VARCHAR(255)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	  fotografia: VARCHAR(1000)
	}

	class AsignacionDocenteGrado  {
	  **id_asignacion**: INT AUTO_INCREMENT PRIMARY KEY
	  id_docente: INT NOT NULL
	  id_grado: INT NOT NULL
	  fecha_asignacion: DATE NOT NULL
	  rol_docente: VARCHAR(50)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class AsignacionEstudianteGrado  {
	  **id_asignacion**: INT AUTO_INCREMENT PRIMARY KEY
	  id_estudiante: INT NOT NULL
	  id_grado: INT NOT NULL
	  fecha_inscripcion: DATE NOT NULL
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Tutor  {
	  **id_tutor**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_completo: VARCHAR(100)
	  identificacion: VARCHAR(50)
	  telefono: VARCHAR(20)
	  correo_electronico: VARCHAR(100)
	  direccion: VARCHAR(255)
	  relacion_colegio: VARCHAR(50)
	  id_usuario: INT
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class TutorEstudiante  {
	  **id_relacion**: INT AUTO_INCREMENT PRIMARY KEY
	  id_tutor: INT NOT NULL
	  id_estudiante: INT NOT NULL
	  relacion: VARCHAR(50)
	  es_responsable_principal: BOOLEAN
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}
}

package "Cuotas Estudiantes" #81C784 {
	class CuotaColegio  {
	  **id_cuota**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_cuota: VARCHAR(100)
	  monto: DECIMAL(10,2)
	  periodicidad: VARCHAR(50)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class CuotaEstudiante  {
	  **id_cuota_estudiante**: INT AUTO_INCREMENT PRIMARY KEY
	  id_cuota: INT NOT NULL
	  id_estudiante: INT NOT NULL
	  periodo: VARCHAR(50)
	  monto: DECIMAL(10,2)
	  estado: ENUM('P','R','G')
	  fecha_vencimiento: DATE
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class Banco  {
	  **id_banco**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_banco: VARCHAR(100) NOT NULL
	  direccion: VARCHAR(255)
	  telefono: VARCHAR(20)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class CuentaBancariaColegio  {
	  **id_cuenta_colegio**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  id_banco: INT NOT NULL
	  numero_cuenta: VARCHAR(50) NOT NULL
	  tipo_cuenta: ENUM('A','M','C')
	  nombre_titular: VARCHAR(100)
	  moneda: VARCHAR(10)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class PagoCuota  {
	  **id_pago**: INT AUTO_INCREMENT PRIMARY KEY
	  id_cuota_estudiante: INT NOT NULL
	  id_cuenta_colegio: INT
	  monto_pagado: DECIMAL(10,2)
	  fecha_pago: DATE
	  numero_boleta: VARCHAR(50)
	  fecha_boleta: DATE
	  imagen_boleta: VARCHAR(255)
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class GastoExtraordinario  {
	  **id_gasto**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  nombre_gasto: VARCHAR(100)
	  monto: DECIMAL(10,2)
	  fecha_gasto: DATE
	  descripcion: VARCHAR(255)
	  es_actividad_bus: BOOLEAN DEFAULT FALSE
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class AsignacionGastoExtra  {
	  **id_asignacion**: INT AUTO_INCREMENT PRIMARY KEY
	  id_gasto: INT NOT NULL
	  id_grado: INT NOT NULL
	  monto: DECIMAL(10,2) NOT NULL
	  descripcion: TEXT
	  fecha_asignacion: DATE
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}
}

package "Transporte Escolar" #FF8A65 {
	class Bus  {
	  **id_bus**: INT AUTO_INCREMENT PRIMARY KEY
	  id_colegio: INT NOT NULL
	  matricula: VARCHAR(50) NOT NULL
	  capacidad: INT NOT NULL
	  marca: VARCHAR(50)
	  modelo: VARCHAR(50)
	  anio: INT
	  color: VARCHAR(30)
	  numero_seguro: VARCHAR(50)
	  fecha_proximo_mantenimiento: DATE
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class AsignacionTransporteExtra  {
	  **id_asignacion_transporte**: INT AUTO_INCREMENT PRIMARY KEY
	  id_asignacion: INT NOT NULL
	  id_bus: INT NOT NULL
	  id_docente: INT NOT NULL
	  nombre_piloto: VARCHAR(100)
	  licencia: VARCHAR(50)
	  telefono_piloto: VARCHAR(20)
	  observaciones: TEXT
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class CoordenadaBus  {
	  **id_coordenada**: INT AUTO_INCREMENT PRIMARY KEY
	  id_asignacion_transporte: INT NOT NULL
	  latitud: DECIMAL(10,6) NOT NULL
	  longitud: DECIMAL(10,6) NOT NULL
	  accuracy: DECIMAL(10,6)
	  altitude: DECIMAL(10,6)
	  altitude_accuracy: DECIMAL(10,6)
	  simulated: BOOLEAN
	  speed: DECIMAL(10,7)
	  bearing: DECIMAL(10,5)
	  time: BIGINT
	  id_usuario_creo: INT
	  id_usuario_modifico: INT
	  createdAt: DATE
	  updatedAt: DATE
	}

	class RegistroHorarioBus  {
	  **id_registro_horario**: INT AUTO_INCREMENT PRIMARY KEY
	  id_asignacion_transporte: INT NOT NULL
	  tipo_registro: ENUM('S','L') NOT NULL
	  latitud: DECIMAL(10,6)
	  longitud: DECIMAL(10,6)
	  observaciones: VARCHAR(250)
	  id_usuario_creo: INT
	  createdAt: DATE
	  updatedAt: DATE
	}
}

Colegio --> CicloEscolar
Colegio --> NivelEducacion
NivelEducacion --> Jornada
Jornada --> JornadaCicloEscolar
JornadaCicloEscolar --> CicloEscolar
JornadaCicloEscolar --> Grado
Colegio --> Estudiante
Grado --> Estudiante
Grado --> JornadaCicloEscolar
PersonalDocente --> Colegio
Estudiante --> Colegio
Grado --> Estudiante
AsignacionDocenteGrado --> PersonalDocente
AsignacionDocenteGrado --> Grado
AsignacionEstudianteGrado --> Estudiante
AsignacionEstudianteGrado --> Grado
Tutor --> Colegio
TutorEstudiante --> Tutor
TutorEstudiante --> Estudiante
CuotaColegio --> Colegio
CuotaEstudiante --> CuotaColegio
CuotaEstudiante --> Estudiante
Banco --> Colegio
CuentaBancariaColegio --> Colegio
CuentaBancariaColegio --> Banco
PagoCuota --> CuotaEstudiante
PagoCuota --> CuentaBancariaColegio
GastoExtraordinario --> Colegio
AsignacionGastoExtra --> GastoExtraordinario
AsignacionGastoExtra --> Grado
Bus --> Colegio
AsignacionTransporteExtra --> AsignacionGastoExtra
AsignacionTransporteExtra --> Bus
AsignacionTransporteExtra --> PersonalDocente
CoordenadaBus --> AsignacionTransporteExtra
RegistroHorarioBus --> AsignacionTransporteExtra

@enduml
