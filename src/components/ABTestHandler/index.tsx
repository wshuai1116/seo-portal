import { useGetABTestGroups } from "@/query/abtest";
import { useActiveReport } from "@/query/device";
import sessionStorage from "@/utils/sessionStorage";
import { getGroup, setGroup } from "@/utils/abtest";
import { useEffect } from "react";

function ABTestHandler() {
  const abtestGroupMutation = useGetABTestGroups({
    onSuccess(data) {
      setGroup(data);
    },
  });
  useEffect(() => {
    if (getGroup()) {
      return;
    }
    abtestGroupMutation.mutate({});
  }, []);

  return <></>;
}

export default ABTestHandler;
