import { useEffect, useState } from "react";
import "./styles.css";

function Vanessa() {
  useEffect(() => {
    console.log('Van Mounted');

    return () => {
      console.log('Van was removed from the DOm')
    }
  }, []);

  return (
    <div className="img-holder">
      <h2>Vanessa</h2>
      <img
        src="https://th.bing.com/th?id=OIP.Ov7D0xGmRX2fB1ElB6F-DAHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.7&pid=3.1&rm=2"
        alt="vanessa"
        height={200}
        width={200}
      />
    </div>
  );
}

export function Page() {
  const [shouldMountV, setShouldMountV] = useState(false);

  return (
    <div className="container">
      hello app.
      <div className="btn-holder">
        <button onClick={() => setShouldMountV(true)}>mount Vanessa</button>
        <button onClick={() => setShouldMountV(false)}>unmount Vanessaa</button>
      </div>
      {shouldMountV ? <Vanessa /> : null}
    </div>
  );
}
