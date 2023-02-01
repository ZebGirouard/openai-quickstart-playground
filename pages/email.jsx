import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Email() {
  const [emailInput, setEmailInput] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: emailInput,
        person: personInput,
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setEmailInput("");
    setPersonInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Email Generator</title>
      </Head>

      <main className={styles.main}>
        <h3>Don't have time to respond to an important email?</h3>
        <h4>Put the person's name or relation to you in the first input.</h4>
        <h4>Put the email body in the second input.</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="person"
            placeholder="Bob, my boss, my friend, etc."
            value={personInput}
            onChange={(e) => setPersonInput(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Dear You, blah blah blah important things. Love, Me."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input type="submit" value="Generate email" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
