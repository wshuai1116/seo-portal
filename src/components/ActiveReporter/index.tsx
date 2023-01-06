import { useActiveReport } from "@/query/device";
import sessionStorage from "@/utils/sessionStorage";
import { useEffect } from "react";

function ActiveReporter() {
  const activeReportMutation = useActiveReport({
    onSuccess() {
      let session = {
        expireTime: new Date().getTime() + 1 * 60 * 60 * 1000,
      };
      sessionStorage.set("session", session);
    },
  });
  useEffect(() => {
    let session = JSON.parse(sessionStorage.get("session"));
    if (
      session &&
      session.expireTime &&
      session.expireTime > new Date().getTime()
    ) {
      return;
    }
    activeReportMutation.mutate({});
  }, []);
  return <></>;
}

export default ActiveReporter;
