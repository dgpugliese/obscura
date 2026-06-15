(async function () {
  let data;
  try {
    // Honor the worker's 5-min max-age — public, aggregate, refreshed cheaply.
    // The "as of" timestamp in the UI already tells the user it's not real-time.
    const r = await fetch("/api/transparency");
    if (!r.ok) throw new Error("HTTP " + r.status);
    data = await r.json();
  } catch (e) {
    document.getElementById("generatedAt").textContent = "transparency endpoint unreachable";
    return;
  }

  const days = Object.values(data.daily || {});
  const totals = { created: 0, burned: 0, expired: 0, exhausted: 0 };
  for (const d of days) {
    totals.created += d.created || 0;
    totals.burned += d.burned || 0;
    totals.expired += d.expired || 0;
    totals.exhausted += d.exhausted || 0;
  }
  document.getElementById("t-created").textContent = totals.created.toLocaleString();
  document.getElementById("t-burned").textContent = totals.burned.toLocaleString();
  document.getElementById("t-expired").textContent = totals.expired.toLocaleString();
  document.getElementById("t-exhausted").textContent = totals.exhausted.toLocaleString();
  document.getElementById("generatedAt").textContent =
    "as of " + new Date(data.generatedAt).toISOString().replace("T", " ").slice(0, 19) + " UTC";

  const bars = document.getElementById("bars");
  const max = Math.max(1, ...days.map(d => d.created || 0));
  let peak = { date: "—", count: 0 };
  for (const d of days) {
    const bar = document.createElement("div");
    const c = d.created || 0;
    bar.className = "bar" + (c === 0 ? " empty" : "");
    bar.style.height = (c === 0 ? 2 : Math.max(3, (c / max) * 90)) + "px";
    bar.title = d.date + " · " + c + " created";
    bars.appendChild(bar);
    if (c > peak.count) peak = { date: d.date, count: c };
  }
  document.getElementById("peakDay").textContent =
    peak.count > 0 ? "peak " + peak.count + " on " + peak.date : "no activity";

  const strip = document.getElementById("activityStrip");
  let activeDays = 0;
  for (const d of days) {
    const created = d.created || 0;
    const burned = d.burned || 0;
    const expired = d.expired || 0;
    const exhausted = d.exhausted || 0;
    const total = created + burned + expired + exhausted;
    const day = document.createElement("div");
    day.className = "activity-day";
    if (exhausted) day.classList.add("exhausted");
    else if (expired) day.classList.add("expired");
    else if (burned) day.classList.add("burned");
    else if (created) day.classList.add("created");
    if (total > 0) activeDays += 1;
    day.title = `${d.date} · ${created} created · ${burned} burned · ${expired} expired · ${exhausted} exhausted`;
    strip.appendChild(day);
  }
  document.getElementById("activitySummary").textContent =
    activeDays > 0 ? `${activeDays} active days / ${days.length}` : `0 active days / ${days.length}`;

  document.getElementById("abuseReceived").textContent = (data.abuse && data.abuse.received) || 0;
  document.getElementById("abuseActioned").textContent = (data.abuse && data.abuse.actioned) || 0;
})();
