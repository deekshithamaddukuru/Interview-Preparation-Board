import { useEffect, useMemo, useState } from "react";

const API = "http://localhost:5000/api/topics";
const statuses = ["To Do", "In Progress", "Completed"];
const emptyForm = { title: "", category: "DSA", priority: "Medium", notes: "" };

export default function App() {
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  async function loadTopics() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Could not load topics");
      setTopics(await res.json());
      setError("");
    } catch {
      setError("Backend not connected. Start the backend and check MongoDB.");
    }
  }
  useEffect(() => { loadTopics(); }, []);

  async function saveTopic(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const url = editing ? `${API}/${editing}` : API;
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error();
      setForm(emptyForm); setEditing(null); loadTopics();
    } catch { setError("Unable to save. Please check the backend connection."); }
  }

  async function updateStatus(topic, status) {
    await fetch(`${API}/${topic._id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...topic, status })
    });
    loadTopics();
  }
  async function deleteTopic(id) {
    if (!window.confirm("Delete this topic?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTopics();
  }
  function startEdit(topic) {
    setEditing(topic._id);
    setForm({ title: topic.title, category: topic.category, priority: topic.priority, notes: topic.notes || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const categories = useMemo(() => ["All", ...new Set(topics.map(t => t.category))], [topics]);
  const visible = topics.filter(t => filter === "All" || t.category === filter);
  const completed = topics.filter(t => t.status === "Completed").length;
  const progress = topics.length ? Math.round(completed / topics.length * 100) : 0;

  return <div className="app">
    <header className="topbar"><a className="logo" href="#">Prep<span>Board</span></a><span className="tag">YOUR INTERVIEW JOURNEY</span></header>
    <main>
      <section className="hero">
        <div><p className="eyebrow">PLAN · PRACTICE · PROGRESS</p><h1>Prepare with a <em>clear plan.</em></h1>
          <p className="sub">Keep every interview topic organized and move one step closer to your goal.</p></div>
        <div className="progress-card"><div className="progress-head"><span>Overall progress</span><strong>{progress}%</strong></div>
          <div className="bar"><span style={{width: `${progress}%`}} /></div><small>{completed} of {topics.length} topics completed</small></div>
      </section>

      <section className="stats">
        <div className="stat"><small>TOTAL TOPICS</small><strong>{topics.length}</strong></div>
        <div className="stat"><small>IN PROGRESS</small><strong>{topics.filter(t => t.status === "In Progress").length}</strong></div>
        <div className="stat"><small>COMPLETED</small><strong>{completed}</strong></div>
      </section>

      <section className="panel form-panel">
        <div className="section-title"><div><p className="eyebrow">BUILD YOUR PLAN</p><h2>{editing ? "Edit topic" : "Add a preparation topic"}</h2></div></div>
        <form onSubmit={saveTopic} className="topic-form">
          <label>Topic name<input value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="e.g. Arrays and Strings" required /></label>
          <label>Category<select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>{["DSA","Core CS","Projects","HR","Aptitude","System Design","Other"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Priority<select value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>{["Low","Medium","High"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label className="wide">Notes<textarea value={form.notes} onChange={e => setForm({...form, notes:e.target.value})} placeholder="Add links, reminders or what to practice..." rows="2" /></label>
          <div className="form-actions"><button className="button" type="submit">{editing ? "Save changes" : "Add topic"}</button>{editing && <button className="button light" type="button" onClick={() => {setEditing(null);setForm(emptyForm);}}>Cancel</button>}</div>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="board-heading"><div><p className="eyebrow">YOUR WORKSPACE</p><h2>Preparation board</h2></div>
        <select className="filter" value={filter} onChange={e => setFilter(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></section>
      <section className="board">
        {statuses.map(status => <div className="column" key={status}>
          <div className="column-head"><h3>{status}</h3><span>{visible.filter(t => t.status === status).length}</span></div>
          {visible.filter(t => t.status === status).map(topic => <article className="topic" key={topic._id}>
            <div className="topic-top"><span className="category">{topic.category}</span><span className={`priority ${topic.priority.toLowerCase()}`}>{topic.priority}</span></div>
            <h4>{topic.title}</h4>{topic.notes && <p>{topic.notes}</p>}
            <div className="topic-actions"><select aria-label="Change status" value={topic.status} onChange={e => updateStatus(topic,e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select>
              <button onClick={() => startEdit(topic)}>Edit</button><button className="delete" onClick={() => deleteTopic(topic._id)}>Delete</button></div>
          </article>)}
          {visible.filter(t => t.status === status).length === 0 && <div className="empty">No topics here yet.</div>}
        </div>)}
      </section>
      <footer>Small steps every day make a big difference.</footer>
    </main>
  </div>;
}
