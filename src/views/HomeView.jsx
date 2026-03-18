import { useEffect, useState } from 'react'
import { apiRequest, resolveAssetUrl } from '../utils/api'

const fallbackGallery = [
  { slot: 1, image: '/galeria/Imagen 1.jpeg', alt: 'Equipo infantil en la cancha' },
  { slot: 2, image: '/galeria/Imagen 2.jpeg', alt: 'Equipo celebrando en evento' },
  { slot: 3, image: '/galeria/Imagen 3.jpeg', alt: 'Estadio lleno en partido' },
]

function galleryAltBySlot(slot) {
  const found = fallbackGallery.find((item) => item.slot === slot)
  return found?.alt || 'Imagen del club'
}

function HomeView() {
  const [gallery, setGallery] = useState(fallbackGallery)

  useEffect(() => {
    let isMounted = true

    const loadGallery = async () => {
      try {
        const data = await apiRequest('/homepage_gallery.php')
        if (!isMounted) {
          return
        }

        const remote = (data.images || []).map((item) => ({
          slot: item.slot,
          image: item.image,
          alt: galleryAltBySlot(item.slot),
        }))

        if (remote.length === 3) {
          setGallery(remote)
        }
      } catch {
        if (isMounted) {
          setGallery(fallbackGallery)
        }
      }
    }

    loadGallery()
    return () => {
      isMounted = false
    }
  }, [])

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
        {gallery
          .slice()
          .sort((a, b) => a.slot - b.slot)
          .map((item) => (
            <figure className="gallery-item" key={item.slot}>
              <img src={resolveAssetUrl(item.image)} alt={item.alt} />
            </figure>
          ))}
      </section>
    </>
  )
}

export default HomeView
