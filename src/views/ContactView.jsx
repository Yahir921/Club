function ContactView() {
  return (
    <main>
      <section className="section">
        <div className="section-head">
          <p className="section-tag">Contacto</p>
          <h2>Informacion de contacto</h2>
        </div>
        <div className="club-grid">
          <article className="club-card">
            <h3>Email</h3>
            <p>contacto@redtoluca.com</p>
          </article>
          <article className="club-card">
            <h3>Telefono</h3>
            <p>+52 55 1234 5678</p>
          </article>
          <article className="club-card">
            <h3>Direccion</h3>
            <p>Av. Deportiva 100, Toluca, Estado de Mexico</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default ContactView
