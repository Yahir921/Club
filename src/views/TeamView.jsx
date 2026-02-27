import { useEffect, useMemo, useState } from "react";

const API_URL = "http://192.168.0.76:8000/api/players/";

function TeamView() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiOrigin = useMemo(() => {
    try {
      return new URL(API_URL).origin;
    } catch {
      return "";
    }
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los jugadores");
        }
        return res.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getPlayerKey = (player, index) => {
    if (player.id != null) return `id-${player.id}`;
    if (player.number != null && player.name) return `n-${player.number}-${player.name}`;
    return `player-${index}`;
  };

  const resolvePhotoUrl = (player) => {
    const candidate =
      player.photo || player.image || player.avatar || player.photo_url || player.image_url || null;

    if (!candidate) return null;
    if (/^(https?:|blob:|data:)/i.test(candidate)) return candidate;
    if (!apiOrigin) return candidate;

    return candidate.startsWith("/")
      ? `${apiOrigin}${candidate}`
      : `${apiOrigin}/${candidate.replace(/^\/+/, "")}`;
  };

  const groupedPlayers = useMemo(() => {
    const groups = new Map();

    players.forEach((player, index) => {
      const role = (player.role || "Sin posicion").trim();
      const key = getPlayerKey(player, index);

      if (!groups.has(role)) groups.set(role, []);
      groups.get(role).push({ key, player });
    });

    return Array.from(groups.entries());
  }, [players]);

  if (loading) return <p>Cargando jugadores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <section className="section team">
        <div className="section-head">
          <p className="section-tag">Plantilla</p>
          <h2>Jugadores destacados</h2>
        </div>

        {groupedPlayers.length === 0 ? (
          <p className="team-empty">No hay jugadores para mostrar.</p>
        ) : (
          groupedPlayers.map(([role, rolePlayers]) => (
            <div key={role} className="team-role-group">
              <h3 className="team-role-title">{role}</h3>

              <div className="team-grid team-showcase-grid">
                {rolePlayers.map(({ key, player }) => {
                  const imageUrl = resolvePhotoUrl(player);

                  return (
                    <article key={key} className="player-card player-showcase-card">
                      <div className="player-showcase-top">
                        <p className="player-number">{player.number ?? "-"}</p>

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={`Foto de ${player.name}`}
                            className="player-photo"
                          />
                        ) : (
                          <div className="player-photo-placeholder">Sin foto</div>
                        )}
                      </div>

                      <div className="player-showcase-bottom">
                        <p className="player-role">{player.role || "Sin posicion"}</p>
                        <h4>{player.name}</h4>
                        <small>{player.age ? `${player.age} años` : "Edad no disponible"}</small>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default TeamView;
