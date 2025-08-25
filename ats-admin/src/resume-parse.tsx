import { useState } from "react";
import { Create, SimpleForm, TextInput, SelectInput, ReferenceInput, SaveButton, Toolbar, useCreate, useNotify, useRedirect } from "react-admin";

function extractFields(raw: string) {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const name = lines[0]?.replace(/^Name[:\-]?\s*/i, "") || "";
  const email = (raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])[0] || "";
  const phone = (raw.match(/(?:\+?\d{1,3}[-.\s]?)?(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})/g) || [])[0] || "";
  const skillsLine = lines.find(l => /skills?/i.test(l));
  const skills = skillsLine ? skillsLine.replace(/skills?:?/i, "").trim() : "";

  return { name, email, phone, skills };
}

const ParseToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export default function ResumeParse() {
  const [raw, setRaw] = useState("");
  const [prefill, setPrefill] = useState({ name: "", email: "", phone: "", skills: "" });
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();

  const handleParse = () => {
    const data = extractFields(raw);
    setPrefill(prev => ({ ...prev, ...data }));
    notify("Parsed fields populated. Review and Save.", { type: "info" });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".txt")) {
      notify("For demo, upload a .txt file.", { type: "warning" });
      return;
    }
    const text = await file.text();
    setRaw(text);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Parse Resume → Create Applicant</h2>
      <p>Paste resume text below or upload a <code>.txt</code> for demo.</p>

      <textarea
        value={raw}
        onChange={e => setRaw(e.target.value)}
        placeholder="Paste resume text here..."
        style={{ width: "100%", height: 160, marginBottom: 12 }}
      />
      <input type="file" accept=".txt" onChange={handleFile} />
      <button onClick={handleParse} style={{ marginLeft: 12 }}>Parse</button>

      <Create resource="applicants" title="Create from Parsed Resume">
        <SimpleForm toolbar={<ParseToolbar />}>
          <TextInput source="name" defaultValue={prefill.name} />
          <TextInput source="email" defaultValue={prefill.email} />
          <TextInput source="phone" defaultValue={prefill.phone} />
          <TextInput source="skills" defaultValue={prefill.skills} />
          <SelectInput
            source="status"
            defaultValue="New"
            choices={[
              { id: "New", name: "New" },
              { id: "Shortlisted", name: "Shortlisted" },
              { id: "Interview", name: "Interview" },
              { id: "Hired", name: "Hired" },
              { id: "Rejected", name: "Rejected" }
            ]}
          />
          <ReferenceInput source="job_id" reference="jobs" label="Job" />
        </SimpleForm>
      </Create>
    </div>
  );
}
