
import { useEffect, useState, type FormEvent } from "react";
import "./App.css";

type Room = {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  equipment: string | null;
};

type Reservation = {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string;
  purpose: string | null;
  status: string;
  room: {
    name: string;
    building: string;
  };
};

const API_URL = "http://localhost:3000";

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [building, setBuilding] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipment, setEquipment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Podatki rezervacije
  const [roomId, setRoomId] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);


  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationsError, setReservationsError] = useState("");

  const userId = import.meta.env.VITE_TEST_USER_ID;

  async function loadReservations() {
    if (!userId) return;

    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/reservations`
      );

      if (!response.ok) {
        throw new Error("Pridobivanje rezervacij ni uspelo.");
      }

      const data: Reservation[] = await response.json();
      setReservations(data);
      setReservationsError("");
    } catch {
      setReservationsError("Napaka pri nalaganju rezervacij.");
    }
  }

  useEffect(() => {
    if (!userId) return;

    fetch(`${API_URL}/users/${userId}/reservations`)
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data: Reservation[]) => setReservations(data))
      .catch(() =>
        setReservationsError("Napaka pri nalaganju rezervacij.")
      );
  }, [userId]);

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
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

  const filteredRooms = rooms.filter((room) =>
    (building === "" || room.building === building) &&
    (capacity === "" || room.capacity >= Number(capacity)) &&
    (equipment === "" ||
      (room.equipment ?? "")
        .toLowerCase()
        .includes(equipment.toLowerCase()))
  );

  async function handleReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!roomId || !start || !end) {
      setMessage("Izpolni vsa obvezna polja.");
      return;
    }

    if (!userId) {
      setMessage("Testni uporabnik ni nastavljen.");
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()) ||
        startDate >= endDate) {
      setMessage("Končni čas mora biti poznejši od začetnega.");
      return;
    }

    setSaving(true);

    try {
      const startISO = startDate.toISOString();
      const endISO = endDate.toISOString();

      // Preverjanje razpoložljivosti
      const params = new URLSearchParams({
        start: startISO,
        end: endISO,
      });

      const availabilityResponse = await fetch(
        `${API_URL}/rooms/${roomId}/availability?${params}`
      );

      const availability = await availabilityResponse.json();

      if (!availabilityResponse.ok) {
        throw new Error(
          availability.error || "Preverjanje razpoložljivosti ni uspelo."
        );
      }

      if (!availability.available) {
        setMessage("Soba je v izbranem terminu zasedena.");
        return;
      }

      // Ustvarjanje rezervacije
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          roomId,
          start: startISO,
          end: endISO,
          purpose,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Rezervacija ni uspela.");
      }

      setMessage(`Rezervacija uspešna! ID: ${data.id}`);
      setStart("");
      setEnd("");
      setPurpose("");
      await loadReservations();

    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Prišlo je do napake."
      );
    } finally {
      setSaving(false);
    }
  }

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
              <button onClick={() => {
                setRoomId(room.id);
                setMessage("");
              }}>
                Izberi sobo
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="reservation-section">
        <h2>Nova rezervacija</h2>

        <form onSubmit={handleReservation} className="reservation-form">
          <label>
            Konferenčna soba
            <select
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setMessage("");
              }}
              required
            >
              <option value="">Izberi sobo</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} ({room.building})
                </option>
              ))}
            </select>
          </label>

          <label>
            Začetek rezervacije
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </label>

          <label>
            Konec rezervacije
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </label>

          <label>
            Namen sestanka
            <input
              type="text"
              placeholder="Npr. projektni sestanek"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Shranjevanje ..." : "Rezerviraj sobo"}
          </button>

          {message && <p role="status">{message}</p>}
        </form>
      </section>

      <section className="reservation-section">
        <h2>Moje rezervacije</h2>

        {reservationsError && (
          <p className="error">{reservationsError}</p>
        )}

        {reservations.length === 0 && !reservationsError && (
          <p>Trenutno nimaš rezervacij.</p>
        )}

        <div className="room-grid">
          {reservations.map((reservation) => (
            <article className="room-card" key={reservation.id}>
              <h3>{reservation.room.name}</h3>

              <p>
                <strong>Stavba:</strong> {reservation.room.building}
              </p>

              <p>
                <strong>Začetek:</strong>{" "}
                {new Date(reservation.startTime).toLocaleString("sl-SI")}
              </p>

              <p>
                <strong>Konec:</strong>{" "}
                {new Date(reservation.endTime).toLocaleString("sl-SI")}
              </p>

              <p>
                <strong>Namen:</strong>{" "}
                {reservation.purpose || "Ni naveden"}
              </p>

              <p>
                <strong>Status:</strong> {reservation.status}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
