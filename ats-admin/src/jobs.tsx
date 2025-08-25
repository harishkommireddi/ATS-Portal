import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  Create,
  TopToolbar,
  CreateButton,
  ExportButton
} from "react-admin";

const jobFilters = [
  <TextInput source="q" label="Search (title/location/skills)" alwaysOn />,
  <SelectInput
    source="status"
    label="Status"
    choices={[
      { id: "Open", name: "Open" },
      { id: "On Hold", name: "On Hold" },
      { id: "Closed", name: "Closed" }
    ]}
  />,
  <TextInput source="location" label="Location" />
];

const JobListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const JobList = () => (
  <List filters={jobFilters} actions={<JobListActions />}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="location" />
      <TextField source="skillsRequired" label="Skills" />
      <TextField source="openings" />
      <TextField source="status" />
      <DateField source="postedAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const JobEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" required />
      <TextInput source="location" />
      <TextInput source="skillsRequired" label="Skills Required" />
      <NumberInput source="openings" />
      <SelectInput
        source="status"
        choices={[
          { id: "Open", name: "Open" },
          { id: "On Hold", name: "On Hold" },
          { id: "Closed", name: "Closed" }
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const JobCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" required />
      <TextInput source="location" />
      <TextInput source="skillsRequired" label="Skills Required" />
      <NumberInput source="openings" defaultValue={1} />
      <SelectInput
        source="status"
        defaultValue="Open"
        choices={[
          { id: "Open", name: "Open" },
          { id: "On Hold", name: "On Hold" },
          { id: "Closed", name: "Closed" }
        ]}
      />
    </SimpleForm>
  </Create>
);
