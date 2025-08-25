import { useState } from "react";
import { useDataProvider, useNotify } from "react-admin";

function parseCSV(text: string) {
  const [headerLine, ...rows] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",").map(h => h.trim());
  return rows
    .map(r => r.split(","))
    .filter(cols => cols.length === headers.length)
    .map(cols => Object.fromEntries(cols.map((c, i) => [headers[i], c.trim()])));
}

export default function BulkImport() {
  const [csv, setCsv] = useState(`name,email,phone,skills,status,job_id
Sana Iyer,sana@example.com,9000000003,React; UI,New,101
Rohit Sen,rohit@example.com,9000000004,Node.js; SQL,New,102`);
  const [loading, setLoading] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsv(text);
  };

  const importNow = async () => {
    setLoading(true);
    try {
      const items = parseCSV(csv);
      for (const item of items) {
        // normalize types
        const payload = {
          name: item.name,
          email: item.email,
          phone: item.phone,
          skills: item.skills,
          status: item.status || "New",
          job_id: item.job_id ? Number(item.job_id) : undefined,
          appliedAt: new Date().toISOString().slice(0, 10)
        };
        await dataProvider.create("applicants", { data: payload });
      }
      notify(`Imported ${items.length} applicants`, { type: "success" });
    } catch (e: any) {
      notify(`Import failed: ${e.message || e}`, { type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Bulk Import Applicants (CSV)</h2>
      <p>Headers required: <code>name,email,phone,skills,status,job_id</code></p>
      <input type="file" accept=".csv" onChange={handleFile} />
      <br /><br />
      <textarea
        value={csv}
        onChange={e => setCsv(e.target.value)}
        style={{ width: "100%", height: 200 }}
      />
      <br />
      <button onClick={importNow} disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Importing..." : "Import"}
      </button>
    </div>
  );
}
