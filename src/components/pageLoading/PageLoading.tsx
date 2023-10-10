import { CircularProgress } from "@mui/material";
import "./pageLoading.css";

export default function PageLoading() {
  return (
    <div className="page-loading">
      <CircularProgress />
    </div>
  );
}
