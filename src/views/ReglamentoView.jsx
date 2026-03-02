const internalRules = [
  'Me presentare en el lugar llegando de manera puntual a la hora de cita indicada de los partidos y entrenamientos designados.',
  'Todos los torneos son de caracter obligatorio y tengo la responsabilidad de cubrir su costo de cada uno de estos, asista o no a dichos torneos.',
  'Respetare la convocatoria de juego, donde se solicite mi presencia senalada por el entrenador.',
  'Respetare las instalaciones de juego (local, visitante) y entrenamiento, asi mismo me hare responsable de cualquier dano que cause.',
  'Me presentare con uniforme vestuario reglamentario en los entrenamientos, partidos de local y visitante, salidas y torneos extraordinarios.',
  'No tendre conductas irrespetuosas ni lenguaje obsceno hacia mis companeros, entrenadores, personal administrativo, equipos, arbitros, entrenadores y porras contrarias.',
  'Acudire a las platicas de desarrollo, clinicas familiares y juntas administrativas.',
  'Me comprometo a no tener mas de 3 faltas injustificadas; sere dado de baja de la categoria asignada. Tres inasistencias continuas (partidos y entrenamientos) tambien sera causal de baja. En caso de enfermedad, permisos, casos fortuitos o vacaciones, informare al centro de formacion en tiempo y forma.',
  'Realizare mis pagos correspondientes en el tiempo y forma que el centro de formacion establezca.',
  'En caso de salidas y visitas a instalaciones de algun club profesional, respetare en todo momento las indicaciones asignadas.',
  'En caso de ser expulsado o amonestado, cumplire con las sanciones economicas y disciplinarias impuestas por la liga y el centro de formacion. La porra tambien aplica en caso de conducta antideportiva.',
  'Ningun jugador podra presentarse a partidos o entrenamientos con vestimenta, accesorios o emblemas de otro club. Quien sea sorprendido sera sancionado o se le restringira el acceso.',
  'No se permite a padres de familia y acompanantes interferir durante entrenamientos y partidos en las instrucciones y decisiones de entrenadores y directores.',
  'Toda multa que imponga la liga por palabras altisonantes, rinas, amenazas o intento de agresion al cuerpo arbitral, porra contraria, jugadores contrarios y miembros de este club se cobrara al responsable o responsables.',
  'Toda ausencia a entrenamientos, partidos de liga, practicas e impuntualidad no justificada sera sancionada como el entrenador lo crea conveniente.',
  'El jugador capitan sera el unico que podra dirigirse al arbitro con respeto y en el momento indicado. Los demas jugadores deberan respetar las decisiones del arbitro sin protestar.',
  'Presentarse con balon individual a los entrenamientos y cuidar el material de entrenamiento asignado para practicas y aprendizaje.',
  'El alumno solicitara permiso por escrito a la administracion para asistir a eventos deportivos ajenos a la institucion (visorias, torneos, partidos, etc.).',
  'Si existe alguna inconformidad del jugador o padre de familia, se atendera en el momento si existe tiempo; en caso contrario se asignara cita previa.',
  'Al termino del ano, el centro realiza una convivencia anual en diciembre. El costo se divide y es obligatorio cubrir al menos el concepto del alumno, asista o no.',
  'Cualquier asunto de formacion deportiva, control administrativo o financiero no estipulado en este reglamento sera resuelto por la administracion del centro de formacion.',
]

const studentRequirements = [
  'Acta de nacimiento original.',
  'CURP impreso a color.',
  'Credencial escolar vigente o constancia de estudios sellada por la institucion escolar.',
  'INE padre, madre o tutor.',
  '6 fotografias tamano infantil b/n o color, recientes.',
  'Certificado medico de cualquier institucion.',
  'Original y 2 copias de cada documento. El acta original se queda en la escuela para expediente fisico.',
]

const digitalDocuments = [
  'Acta de nacimiento.',
  'CURP.',
  'Credencial escolar.',
  'INE de padre, madre o tutor.',
  'Fotografia digital con fondo blanco.',
]

const benefits = [
  'Desarrollo personal, fisico y futbolistico.',
  'Participacion en el torneo Inter Redes (obligatorio cada ano) en Metepec y Estadio Nemesio Diez.',
  'Torneo Copa Nemesio Diez.',
  'Visorias oficiales publicadas en la pagina oficial del club.',
  'Torneos en estadios de 1era division profesional.',
  'Firma de autografos con jugadores del primer equipo.',
  'Torneos locales y nacionales con pase a torneos internacionales.',
  'Canchas 100% empastadas.',
  'Torneo anual salida destino turistico cada ano.',
  'Pruebas con equipos de liga de expansion, 2da division y 3era division profesional.',
  'Entrenadores certificados y en constante capacitacion.',
  'Visitas al Estadio Nemesio Diez y al museo de futbol Toluca F.C.',
  'Boletos a bajo costo para asistir a juegos del primer equipo.',
  'Visita a entrenamientos del primer equipo.',
  'Credencial oficial que reconoce su pertenencia al centro de formacion.',
  'Finales de torneos en estadios profesionales.',
  'Entrenamientos matutinos y vespertinos en dias senalados.',
  'Costos accesibles en mensualidad y equipo de vestuario.',
  'Proyeccion de jugadores a fuerzas basicas.',
  'Entrenamiento exclusivo para porteros.',
  'Cartera de jugadores en fuerzas basicas.',
  'Terapias psicologicas individuales y grupales.',
  'Mejora de concentracion, disciplina, responsabilidad y desarrollo emocional.',
  'Mejora de capacidad cardiovascular, coordinacion, fuerza muscular y osea.',
  'Reduce grasa corporal y regula peso.',
  'Ayuda a combatir ansiedad y depresion.',
  'Reduce riesgo de diabetes y colesterol.',
  'Protege la autoestima.',
]

function ReglamentoView() {
  return (
    <main>
      <section className="section club-docs">
        <div className="club-docs-head">
          <p className="section-tag">Reglamento</p>
          <h2>RED TOLUCA CUNA DE CAMPEONES - Reglamento interno</h2>
          <p>
            El objetivo del presente reglamento es formar personas con valores, manteniendo siempre
            una relacion cordial, estructurada y ordenada entre jugador, padre de familia y centro
            de formacion.
          </p>
          <a className="doc-download-btn" href="/solicitud-inscripcion.pdf" download>
            Descargar solicitud
          </a>
        </div>

        <div className="club-doc-grid">
          <article className="club-doc-card">
            <h3>Reglamento interno</h3>
            <ol className="club-number-list">
              {internalRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </article>

          <article className="club-doc-card">
            <h3>Requisitos alumno/jugador</h3>
            <ul className="club-bullet-list">
              {studentRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
            <p className="club-note">
              Envio digital obligatorio al correo <strong>tolucacuautitlancdc@gmail.com</strong>
            </p>
            <ol className="club-number-list compact">
              {digitalDocuments.map((document) => (
                <li key={document}>{document}</li>
              ))}
            </ol>
            <p className="club-note">
              Nota: archivos separados en PDF, adjuntos en un solo correo y asunto con el nombre del
              alumno.
            </p>
          </article>

          <article className="club-doc-card">
            <h3>Beneficios</h3>
            <ul className="club-bullet-list two-columns">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="club-doc-card">
            <h3>Estructura costo y pago</h3>
            <div className="club-cost-grid">
              <div className="club-cost-item">
                <p className="club-cost-title">Anualidad 2025</p>
                <p className="club-cost-value">$500.00 M.N.</p>
                <p className="club-cost-text">Fecha de referencia: 15 de noviembre de 2025.</p>
              </div>
              <div className="club-cost-item">
                <p className="club-cost-title">Inscripcion nuevo ingreso</p>
                <p className="club-cost-value">$500.00 M.N.</p>
                <p className="club-cost-text">El alumno cubre este costo como pago inicial.</p>
              </div>
              <div className="club-cost-item">
                <p className="club-cost-title">Mensualidad</p>
                <p className="club-cost-value">$600.00 M.N.</p>
                <p className="club-cost-text">
                  Pago del dia 1 al 3 de cada mes. Fuera de fecha aplica interes semanal del 20%.
                </p>
              </div>
              <div className="club-cost-item">
                <p className="club-cost-title">Arbitraje y torneos</p>
                <p className="club-cost-text">
                  El arbitraje esta incluido en la mensualidad. Los costos de torneos Apertura,
                  Clausura, Verano, Inter Redes, Nemesio Diez, salida anual, ISA Cup, Copa Record,
                  Torneo Nacional de Campeones y Copa Internacional de Acapulco se informan en tiempo
                  y forma segun la participacion de cada categoria.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default ReglamentoView
