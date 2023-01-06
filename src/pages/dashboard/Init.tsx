import { listProjects } from "@/query/project";
import { getUser } from "@/utils/auth";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as notification from "@/components/display/Notification";
import { useListOrganizations } from "@/query/organization";

function DashboardInit() {
  const userInfo = getUser();
  const navigate = useNavigate();

  const { data: organizations } = useListOrganizations();

  const { organizationId } = useParams();

  useEffect(() => {
    if (organizationId) {
      return;
    }
    if (!organizations) {
      return;
    }
    fetchDefaultProject(organizations[0].organizationId);
  }, [organizations]);

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    fetchDefaultProject(organizationId);
  }, [organizationId]);

  const fetchDefaultProject = (organizationId: string) => {
    listProjects({
      organizationId: organizationId,
      pageNum: 1,
      pageSize: 1,
    })
      .then(({ result }) => {
        if (result.result.length > 0) {
          navigate(
            `/organization/${organizationId}/project/${result.result[0].projectId}/overview`,
            {
              replace: true,
            }
          );
        } else {
          navigate(`/organization/${organizationId}/seo-create-project`, {
            replace: true,
          });
        }
      })
      .catch((err) => {
        notification.error(err.message);
      });
  };

  return <></>;
}

export default DashboardInit;
