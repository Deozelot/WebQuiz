"use client";

import { useState } from "react";
import styles from "./page.module.css";

const MIN = 0;
const MAX = 100;

type UserRequest = { userName: string; fullName: string; age: number };

export default function Home() {
  const [percentage, setPercentage] = useState(10);
  const [submitted, setSubmitted] = useState<UserRequest | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setPercentage(Math.min(MAX, Math.max(MIN, value)));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const request: UserRequest = {
      userName: String(data.get("username")).trim().toUpperCase(),
      fullName: String(data.get("fullname")).trim().toUpperCase(),
      age: Number(data.get("age")),
    };
    setSubmitted(request);
    alert(JSON.stringify(request, null, 2));
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Progress bar</h1>

        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={percentage}
        >
          <div className={styles.fill} style={{ width: `${percentage}%` }}>
            <span className={styles.label}>{percentage}%</span>
          </div>
        </div>

        <label className={styles.inputRow}>
          Input Percentage:
          <input
            className={styles.input}
            type="number"
            min={MIN}
            max={MAX}
            value={percentage}
            onChange={handleChange}
          />
        </label>
      </section>

      <section className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            Username:
            <input name="username" type="text" required minLength={3} />
          </label>
          <label className={styles.field}>
            FullName:
            <input name="fullname" type="text" required minLength={3} />
          </label>
          <label className={styles.field}>
            Age:
            <input name="age" type="number" required min={1} max={120} />
          </label>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>

        {submitted && (
          <div className={styles.result} aria-live="polite">
            <h2 className={styles.resultTitle}>
              Request Sent to DB with below request data
            </h2>
            <ul className={styles.resultList}>
              <li>UserName: {submitted.userName}</li>
              <li>FullName: {submitted.fullName}</li>
              <li>Age: {submitted.age}</li>
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
