
import { useEffect, useState } from "react";
import "./App.css";

type Room = {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  equipment: string | null;
};

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [building, setBuilding] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipment, setEquipment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Napaka pri pridobivanju sob");
        }
        return response.json();
      })
      .then((data: Room[]) => setRooms(data))
      .catch(() => setError("Povezava s strežnikom ni uspela."))
      .finally(() => setLoading(false));
  }, []);

  const buildings = [...new Set(rooms.map((room) => room.building))];

  const filteredRooms = rooms.filter((room) => {
    return (
      (building === "" || room.building === building) &&
      (capacity === "" || room.capacity >= Number(capacity)) &&
      (equipment === "" ||
        (room.equipment ?? "")
          .toLowerCase()
          .includes(equipment.toLowerCase()))
    );
  });

  return (
    <div className="container">
      <header>
        <h1>RoomFlow</h1>
        <p>Rezervacija konferenčnih sob</p>
      </header>

      <section className="filters">
        <h2>Filtriranje sob</h2>

        <div className="filter-row">
          <label>
            Stavba
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              <option value="">Vse stavbe</option>
              {buildings.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>

          <label>
            Minimalna kapaciteta
            <input
              type="number"
              min="1"
              placeholder="Število oseb"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </label>

          <label>
            Oprema
            <input
              type="text"
              placeholder="Npr. projektor"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </label>
        </div>

        <button onClick={() => {
          setBuilding("");
          setCapacity("");
          setEquipment("");
        }}>
          Ponastavi filtre
        </button>
      </section>

      <section>
        <h2>Konferenčne sobe ({filteredRooms.length})</h2>

        {loading && <p>Nalaganje sob ...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && filteredRooms.length === 0 && (
          <p>Nobena soba ne ustreza izbranim filtrom.</p>
        )}

        <div className="room-grid">
          {!loading && !error && filteredRooms.map((room) => (
            <article className="room-card" key={room.id}>
              <h3>{room.name}</h3>
              <p><strong>Stavba:</strong> {room.building}</p>
              <p><strong>Nadstropje:</strong> {room.floor}</p>
              <p><strong>Kapaciteta:</strong> {room.capacity} oseb</p>
              <p><strong>Oprema:</strong> {room.equipment || "Brez opreme"}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
