import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  ReferenceField,
  Create,
  TopToolbar,
  CreateButton,
  ExportButton,
  TextInputProps
} from "react-admin";
import { Link } from "react-router-dom";

const applicantFilters: React.ReactElement<TextInputProps>[] = [
  <TextInput source="q" label="Search (name/email/skills)" alwaysOn />,
  <SelectInput
    source="status"
    label="Status"
    choices={[
      { id: "New", name: "New" },
      { id: "Shortlisted", name: "Shortlisted" },
      { id: "Interview", name: "Interview" },
      { id: "Hired", name: "Hired" },
      { id: "Rejected", name: "Rejected" }
    ]}
  />,
  <ReferenceInput source="job_id" reference="jobs" label="Job">
    <SelectInput optionText="title" />
  </ReferenceInput>
];

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
    <Link to="/applicants/parse" style={{ marginLeft: 12 }}>Parse Resume</Link>
    <Link to="/applicants/bulk" style={{ marginLeft: 12 }}>Bulk Import</Link>
  </TopToolbar>
);

export const ApplicantList = () => (
  <List filters={applicantFilters} actions={<ListActions />}
  empty={<div>No applicants found or error loading data.</div>}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="skills" />
      <TextField source="status" />
      <ReferenceField source="job_id" reference="jobs" label="Job">
        <TextField source="title" />
      </ReferenceField>
      <DateField source="appliedAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ApplicantEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="email" required />
      <TextInput source="phone" />
      <TextInput source="skills" />
      <SelectInput
        source="status"
        choices={[
          { id: "New", name: "New" },
          { id: "Shortlisted", name: "Shortlisted" },
          { id: "Interview", name: "Interview" },
          { id: "Hired", name: "Hired" },
          { id: "Rejected", name: "Rejected" }
        ]}
      />
      <ReferenceInput source="job_id" reference="jobs" label="Job">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ApplicantCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" required />
      <TextInput source="email" required />
      <TextInput source="phone" />
      <TextInput source="skills" />
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
      <ReferenceInput source="job_id" reference="jobs" label="Job">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
