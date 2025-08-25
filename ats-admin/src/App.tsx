import { Admin, Resource, CustomRoutes, Layout } from "react-admin";
import { Route } from "react-router-dom";
import fakeDataProvider from "ra-data-fakerest";

import { ApplicantList, ApplicantEdit, ApplicantCreate } from "./applicants";
import { JobList, JobEdit, JobCreate } from "./jobs";
import ResumeParse from "./resume-parse";
import BulkImport from "./bulk-import";
import CustomMenu from "./menu";

// 👇 mock data for testing
const mockData = {
  applicants: [
    { id: 1, name: "John Doe", email: "john@example.com", jobId: 1 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", jobId: 2 },
  ],
  jobs: [
    { id: 1, title: "Frontend Developer", company: "Deloitte", location: "Hyderabad" },
    { id: 2, title: "Backend Developer", company: "Infosys", location: "Bangalore" },
  ],
};

// 👇 replace jsonServerProvider with fakerest provider
const dataProvider = fakeDataProvider(mockData);

// 👇 create a custom layout that injects your menu
const CustomLayout = (props: any) => <Layout {...props} menu={CustomMenu} />;

export default function App() {
  return (
    <Admin dataProvider={dataProvider} layout={CustomLayout}>
      <Resource
        name="applicants"
        options={{ label: "Applicants" }}
        list={ApplicantList}
        edit={ApplicantEdit}
        create={ApplicantCreate}
      />
      <Resource
        name="jobs"
        options={{ label: "Job Postings" }}
        list={JobList}
        edit={JobEdit}
        create={JobCreate}
      />
      <CustomRoutes>
        <Route path="/applicants/parse" element={<ResumeParse />} />
        <Route path="/applicants/bulk" element={<BulkImport />} />
      </CustomRoutes>
    </Admin>
  );
}
