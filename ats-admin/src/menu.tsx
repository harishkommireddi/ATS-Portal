import { Menu } from "react-admin";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadIcon from "@mui/icons-material/Upload";

export default function CustomMenu() {
  return (
    <Menu>
      <Menu.ResourceItem name="applicants" />
      <Menu.Item to="/applicants/parse" primaryText="Parse Resume" leftIcon={<DescriptionIcon />} />
      <Menu.Item to="/applicants/bulk" primaryText="Bulk Import" leftIcon={<UploadIcon />} />
      <Menu.ResourceItem name="jobs" />
    </Menu>
  );
}
