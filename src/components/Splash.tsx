"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Μόλις φορτώσει το window (images/fonts/etc)
    const onLoad = () => setHide(true);

    if (document.readyState === "complete") {
      setHide(true);
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <div
      id="splash"
      aria-hidden={hide}
      className={hide ? "splash splash--hide" : "splash"}
    >
      <div className="splash__inner">
        <div className="splash__kicker">WELCOME TO</div>
        <div className="splash__logo">VILLA LITHOS</div>
        <div className="splash__line" />
      </div>
    </div>
  );
}
