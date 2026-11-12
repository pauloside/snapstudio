"use client";

import { useState } from "react";

const packages = ["The Portrait Edit", "The Story Session", "The Celebration"];

export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState(packages[0]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="field"><label htmlFor="fullName">Your name</label><input id="fullName" name="name" placeholder="Full name" required /></div>
      <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="you@example.com" required /></div>
      <div className="field"><label htmlFor="package">Choose a package</label><select id="package" value={selected} onChange={e => setSelected(e.target.value)}>{packages.map(item => <option key={item}>{item}</option>)}</select></div>
      <div className="field"><label htmlFor="date">Preferred date</label><input id="date" name="date" type="date" required /></div>
      <div className="field full"><label htmlFor="notes">Tell us a little about your session</label><textarea id="notes" name="notes" rows={3} placeholder="What are we celebrating or creating?" /></div>
      <button className="button-primary" type="submit">Send booking request ↗</button>
      {sent && <p className="form-message" role="status">Your request is ready in this preview. Connect the booking database and email service to receive and manage live submissions.</p>}
    </form>
  );
}
