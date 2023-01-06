const ISSUE_MAP: Record<string, string> = {
  T01: "网页缺失标题",
  T02: "标题小于30个字符",
  T03: "标题大于60个字符",
  T02_CN: "标题小于15个字符",
  T03_CN: "标题大于30个字符",
  T04: "网页包含多个标题",
  T05: "标题与其他网页标题重复",
  D01: "网页缺失描述",
  D02: "描述小于110个字符",
  D03: "描述大于160个字符",
  D02_CN: "描述为空",
  D03_CN: "描述大于78个字符",
  D04: "网页包含多个描述",
  D05: "描述与其他网页描述重复",
  H101: "网页缺失H1标签",
  H102: "H1标签内容超过70个字符",
  H103: "网页包含多个H1标签",
  H104: "H1标签内容与其他网页的H1重复",
  ML01: "网页缺失Meta Language",
  ML02: "网页包含错误的Meta Language",
  IMGALT01: "图片缺少Alt描述",
  IMGALT02: "图片Alt描述超过100个字符",
  IMG01: "包含错误的图片标签",
  URLDEPTH01: "页面深度太深（超过3级）",
  URLDEPTH02: "页面深度太深（超过5级）",
  SITEMAP01: "网站缺失sitemap.xml文件",
  ROBOTS01: "网站缺失robots.txt文件",
  NOTFOUND01: "失效链接未返回404",
  DEADLINK01: "包含损坏的内部链接",
  CR01: "通过客户端渲染",
};



export function getIssue(issueCode: string) {
  return ISSUE_MAP[issueCode]
}

export function getIssueByCodes(issueCodes: string) {
  if (!issueCodes) {
    return ""
  }
  const arr = issueCodes.split(",")
  let result: string[] = []
  arr.forEach((i) => {
    result.push(ISSUE_MAP[i])
  });
  return result.join(",")
}
