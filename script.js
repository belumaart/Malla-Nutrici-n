const estructura = {
  "Primer Año": {
    "I Semestre": [
      "Curso Introductorio",
      "Bases Biológicas de la nutrición humana",
      "Química Alimentaria",
      "Fundamentos de la nutrición humana",
      "Metodología de las practicas articuladoras"
    ],
    "II Semestre": [
      "Bioquímica nutricional",
      "Normativa alimentaria",
      "Seguridad alimentaria nutricional y soberanía alimentaria",
      "Administración aplicada al ejercicio de la profesión",
      "Práctica articuladora I"
    ]
  },
  "Segundo Año": {
    "III Semestre": [
      "Diagnóstico y evaluación del estado nutricional",
      "Nutrición y alimentación en el ciclo de la vida",
      "Salud pública",
      "Bioestadística y métodos de investigación",
      "Práctica articuladora II"
    ],
    "IV Semestre": [
      "Producción e industrialización de alimentos",
      "Transformaciones físico- química de los alimentos",
      "Epidemiologia nutricional",
      "Educación en alimentación y nutrición Fundamentos y praxis",
      "Práctica articuladora III"
    ]
  },
  "Tercer Año": {
    "V Semestre": [
      "Ética de la alimentación",
      "Nutrición poblacional",
      "Diseño de alimentos",
      "Nutrición clínica I",
      "Práctica articuladora IV"
    ],
    "VI Semestre": [
      "Nutrición Clínica II",
      "Gestión de servicios de alimentación colectiva",
      "Práctica articuladora V"
    ]
  },
  "Cuarto Año": {
    "VII Semestre": [
      "Práctica profesional"
    ]
  }
};

// Guardar/leer materias aprobadas en localStorage
let aprobados = JSON.parse(localStorage.getItem("ramos_aprobados") || "[]");

function guardarEstado() {
  localStorage.setItem("ramos_aprobados", JSON.stringify(aprobados));
}

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  Object.entries(estructura).forEach(([anio, semestres]) => {
    Object.entries(semestres).forEach(([semestre, materias]) => {
      const divSemestre = document.createElement("div");
      divSemestre.className = "semestre";

      const titulo = document.createElement("h2");
      titulo.textContent = `${anio} - ${semestre}`;
      divSemestre.appendChild(titulo);

      const contRamos = document.createElement("div");
      contRamos.className = "ramos";

      materias.forEach(nombre => {
        const id = nombre.toLowerCase().replace(/\s+/g, "_").replace(/[^\w_]/g, "");

        const btn = document.createElement("div");
        btn.className = "ramo";
        btn.textContent = nombre;

        if (aprobados.includes(id)) {
          btn.classList.add("aprobado");
        }

        btn.addEventListener("click", () => {
          if (aprobados.includes(id)) {
            aprobados = aprobados.filter(x => x !== id);
          } else {
            aprobados.push(id);
          }
          guardarEstado();
          crearMalla(); // volver a renderizar
        });

        contRamos.appendChild(btn);
      });

      divSemestre.appendChild(contRamos);
      contenedor.appendChild(divSemestre);
    });
  });
}

crearMalla();
