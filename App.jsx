import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [game, setGame] = useState(false);
  const [obecny, setobecny] = useState(0);
  const [active, setactive] = useState(0); //aktywnosc elementu
  const [round, setround] = useState(false); //poczatek round czyli pokazanie kolejnosci
  const [tab, setTab] = useState([]);
  const [clear, setclaer] = useState([]);
  const [lose, setlose] = useState(false);
  const [icon, seticon] = useState(false);

  useEffect(() => {
    let timeouts = [];
    setround(true);
    tab.map((item, index) => {
      timeouts.push(
        setTimeout(() => {
          setactive(item);
          setTimeout(() => {
            setactive(0);
          }, 500);
        }, index * 600)
      );
    });
    setclaer(timeouts);
    setTimeout(() => setround(false), tab.length * 600);
  }, [tab]);
  // czas po jakim wsm maja sie pokazac wszystkie elementy np 2 element *600ms

  function getRandomInt() {
    return Math.floor(Math.random() * 4 + 1);
  }

  const Startgame = () => {
    setlose(false);
    setGame(true);
    setTab([getRandomInt()]);
  };
  const reset = () => {
    setactive(0);
    setTab([]);
    setGame(false);
    setround(false);
    clear.forEach(clearTimeout);
    setlose(false);

    setclaer([]);
  };

  function btn(id) {
    if (tab[obecny] == id) {
      if (obecny + 1 == tab.length) {
        setTab([...tab, getRandomInt()]);
        setobecny(0);
        seticon(true);
      } else {
        seticon(false);
        setobecny((prev) => prev + 1);
      }
    } else {
      setGame(false);
      setactive(-1);
      setlose(true);
      setTimeout(() => {
        setactive(0);
      }, 200);
    }
  }

  return (
    <div className="box">
      {icon && <img src="/icon.png" alt="win" className="wins" />}
      {lose && <img src="/lose.png" alt="lose" className="lose" />}

      <div className="gamebox">
        {!game && (
          <button onClick={Startgame} className="start">
            Start
          </button>
        )}
        <button
          disabled={!game || round}
          onClick={() => btn(1)}
          className={`red btn ${active == 1 ? "active" : ""}`}
        >
          1
        </button>

        <button
          disabled={!game || round}
          onClick={() => btn(2)}
          className={`green btn ${active == 2 ? "active" : ""}`}
        >
          2
        </button>
        <button
          disabled={!game || round}
          onClick={() => btn(3)}
          className={`blue btn ${active == 3 ? "active" : ""}`}
        >
          3
        </button>
        <button
          disabled={!game || round}
          onClick={() => btn(4)}
          className={`yellow btn ${active == 4 ? "active" : ""}`}
        >
          4
        </button>
        <div className="level">Poziom: {tab.length}</div>
        <button className="rest_btn" onClick={reset}>
          Reset
        </button>
      </div>
      <p className="info">{lose && "przegrana"}</p>
    </div>
  );
}

export default App;
