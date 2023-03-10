import Button from "@/components/base/Button";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import { analysisCompetitor, useDeleteCompetitor } from "@/query/competitor";
import { Competitor } from "@/query/competitor/types";
import { useListCompetitors } from "@/query/competitor/useListCompetitors";
import { useOrganization } from "@/query/organization";
import { Message, useEventEmitter } from "@/states/ws";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Modal, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DashboardNav from "../nav";
import CompetitorCreateModal from "./create-modal";
import CompetitorNav from "./nav";
import { createCompetitorModal } from "./states";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled(FlexColumn)`
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const TitleBar = styled(SBFlex)`
  background-color: white;
  padding: 12px 20px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #e1e3e6;
`;

const SectionTitle = styled.span`
  color: #000000;
  font-size: 28px;
`;

const TDKItem = styled.div`
  margin-bottom: 10px;
`;

function CompetitorPage() {
  const pageSize = 10;

  const [pageNum, setPageNum] = useState(1);

  const navigate = useNavigate();

  const { data: organization } = useOrganization();

  const { data: competitors, refetch } = useListCompetitors({
    organizationId: organization.organizationId,
    pageNum: pageNum,
    pageSize: pageSize,
  });

  const deleteCompetitorMutation = useDeleteCompetitor({
    onSuccess(data, params) {
      notification.success("????????????");
    },
  });

  const eventEmitter = useEventEmitter();

  useEffect(() => {
    const listener = (message: Message) => {
      if (
        message.topic === "competitor-task-completed" ||
        message.topic === "competitor-task-failed"
      ) {
        if (message.params.organizationId !== organization.organizationId) {
          return;
        }
        refetch();
      }
    };

    if (eventEmitter) {
      eventEmitter.addListener("message", listener);
    }

    return () => {
      eventEmitter?.removeListener("message", listener);
    };
  }, [eventEmitter]);

  useEffect(() => {
    if (pageNum) {
      refetch();
    }
  }, [pageNum]);

  const handleCreate = () => {
    createCompetitorModal.open();
  };

  const handleRedo = (competitorId: string) => {
    analysisCompetitor(organization.organizationId, competitorId)
      .then(({ result }) => {
        refetch();
      })
      .catch((err) => {
        notification.error(err.message);
      });
  };

  const handleDelete = (competitorId: string) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `????????????????????????`,
      maskClosable: true,
      onOk() {
        deleteCompetitorMutation.mutate({
          organizationId: organization.organizationId,
          competitorId: competitorId,
        });
      },
      zIndex: 9999,
    });
  };

  const getColumns: () => ColumnsType<Competitor> = () => [
    {
      title: "??????",
      dataIndex: "siteUrl",
      render: (siteUrl) => (
        <a href={siteUrl} target="_blank">
          {siteUrl}
        </a>
      ),
    },
    {
      title: "?????? ???????????????????????????",
      render: (competitor) => {
        if (competitor.status === "COMPLETED") {
          return (
            <>
              <TDKItem>{`??????: ${
                competitor.title ? competitor.title : "???"
              }`}</TDKItem>
              <TDKItem>{`??????: ${
                competitor.description ? competitor.description : "???"
              }`}</TDKItem>
              <TDKItem>{`?????????: ${
                competitor.keywords ? competitor.keywords : "???"
              }`}</TDKItem>
            </>
          );
        }
        if (competitor.status === "PROCESSING") {
          return (
            <>
              ???????????????
              <LoadingOutlined
                style={{
                  marginLeft: 10,
                }}
              />
            </>
          );
        }
        if (competitor.status === "FAILED") {
          return <>??????????????????????????????????????????</>;
        }
        return <></>;
      },
    },
    {
      title: "????????????",
      dataIndex: "modifiedTime",
      render: (modifiedTime) => {
        return modifiedTime
          ? moment(modifiedTime).format("YYYY/MM/DD HH:mm:ss")
          : "--";
      },
    },
    {
      title: "??????",
      render: (competitor) => (
        <FlexRow>
          <Tooltip title="????????????">
            <RedoOutlined
              onClick={() => handleRedo(competitor.competitorId)}
              style={{
                cursor: "pointer",
              }}
            />
          </Tooltip>
          <Tooltip title="??????">
            <DeleteOutlined
              onClick={() => handleDelete(competitor.competitorId)}
              style={{
                cursor: "pointer",
                marginLeft: 10,
              }}
            />
          </Tooltip>
        </FlexRow>
      ),
    },
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, []);

  if (!competitors) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>????????????</title>
      </Helmet>
      <DashboardNav projectName="??????" title="????????????" />
      <TitleBar>
        <FlexRow center>
          <SectionTitle>????????????</SectionTitle>
        </FlexRow>
        <FlexRow center>
          <Button type="primary" onClick={() => handleCreate()}>
            <PlusOutlined /> ??????
          </Button>
        </FlexRow>
      </TitleBar>
      <MainContainer>
        <Table
          sticky
          rowKey={(competitor) => competitor.competitorId}
          columns={columns}
          locale={{
            emptyText: () => `????????????`,
          }}
          dataSource={competitors?.result}
          pagination={{
            total: competitors?.total,
            pageSize: pageSize,
            onChange(page) {
              setPageNum(page);
            },
          }}
        />
      </MainContainer>
      <CompetitorCreateModal />
    </Root>
  );
}

export default CompetitorPage;
