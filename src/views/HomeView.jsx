function HomeView() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <p className="kicker">Pasion por el futbol</p>
          <h1>Un club, una aficion que nunca se rinde.</h1>
          <p>
            Promovemos la formacion futbolistica, compartimos informacion del club,
            entrenamientos, becas, eventos y el trabajo con nuestras categorias.
          </p>
          <a className="cta" href="#/contacto">Unete al club</a>
        </div>
      </header>

      <section className="gallery" aria-label="Galeria del club">
        <figure className="gallery-item">
          <img src="/galeria/Imagen 1.jpeg" alt="Equipo infantil en la cancha" />
        </figure>
        <figure className="gallery-item">
          <img src="/galeria/Imagen 2.jpeg" alt="Equipo celebrando en evento" />
        </figure>
        <figure className="gallery-item">
          <img src="/galeria/Imagen 3.jpeg" alt="Estadio lleno en partido" />
        </figure>
      </section>
    </>
  )
}

export default HomeView
