"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const SECONDS_PER_MINUTE = 60;
const TICK_MS = 1000;

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), TICK_MS);
    return () => clearInterval(id);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Timer</h2>
      <p className={styles.timerDisplay} aria-live="polite">
        {mins} mins {secs} secs
      </p>
      <div className={styles.timerButtons}>
        <button
          className={`${styles.timerButton} ${styles.start}`}
          type="button"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className={`${styles.timerButton} ${styles.stop}`}
          type="button"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className={`${styles.timerButton} ${styles.reset}`}
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
