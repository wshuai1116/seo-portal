import { CenterItem, FlexRow } from "@/components/display/Flex";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Root = styled.div`
  background: #f7f8fa;
  padding: 14px;
  border-radius: 8px 8px 0px 0px;
`;

const CategoryItem = styled(CenterItem)<{
  active?: boolean;
}>`
  padding: 10px 16px;
  cursor: pointer;
  ${(props) =>
    props.active
      ? css`
          background: rgba(31, 31, 31, 0.15);
          border-radius: 100px;
          color: #1f1f1f;
          font-weight: 500;
        `
      : css`
          color: rgba(31, 31, 31, 0.75);
          font-weight: 400;
        `}
`;

function AnalysisCategorySelector({
  onSelect,
}: {
  onSelect: (analysisCategory: string | undefined) => void;
}) {
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  const categoryList = useMemo(() => {
    return [
      {
        name: "所有分类",
        value: undefined,
      },
      {
        name: "链接",
        value: "LINKS",
      },
      {
        name: "XML站点地图",
        value: "SITEMAP",
      },
      {
        name: "可索引性",
        value: "INDEXABILITY",
      },
      {
        name: "内容相关性",
        value: "CONTENT_RELEVANCE",
      },
    ];
  }, []);

  return (
    <Root>
      <FlexRow
        style={{
          gap: 5,
        }}
      >
        {categoryList.map((i) => {
          return (
            <CategoryItem
              active={currentCategory === i.value}
              onClick={() => {
                setCurrentCategory(i.value);
                onSelect(i.value);
              }}
            >
              {i.name}
            </CategoryItem>
          );
        })}
      </FlexRow>
    </Root>
  );
}

export default AnalysisCategorySelector;
