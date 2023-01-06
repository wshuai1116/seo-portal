export const ANALYSIS_CATEGORY_MAP: Record<string, string> = {
  SITEMAP: "XML站点地图",
  LINKS: "链接",
  INDEXABILITY: "可索引性",
  INTERNAL_LINK: "内链",
  CONTENT_RELEVANCE: "内容相关性",
};

export const METRICS_CATEGORY_MAP: Record<string, string> = {
  ROBOTS: "robots.txt",
  SITEMAP: "sitemap.xml",
  NOTFOUND_LINK: "404页面",
  DEAD_LINK: "死链",
  RENDER_PATTERN: "页面渲染模式",
  INTERNAL_LINK: "站内内链",
  URL_DEPTH: "url层级设计",
  TITLE: "网页标题",
  DESCRIPTION: "网页描述",
  META_LANGUAGE: "meta language",
  H1: "<h1> tag",
  IMG_ALT: "图片alt",
};

export const METRICS_CATEGORY_DESC_MAP: Record<string, string> = {
  ROBOTS:
    "缺少或包含一个无效的robots.txt文件会导致你计划阻止的网页被抓取，或者反过来阻止你想扫描和索引的网页被抓取。",
  SITEMAP: "缺少或包含一个无效的sitemap.xml文件",
  NOTFOUND_LINK:
    "网站上不存在的页面不会响应404 HTTP状态代码，因此搜索引擎会误以为此URL有一个真实的页面，导致该URL可能被抓取，其内容被索引。",
  DEAD_LINK:
    "链接打不开或出现“访问的页面不存在”的提示，可能因为网页内容已经变更为不存在、已删除或需要权限等。过多的死链会使网站被判定为一个低质量的网站，影响网站的排名和权重，甚至导致搜索引擎不再爬取该网站，导致网站的快照不更新，收录量骤减。",
  URL_NAMING:
    "URL中有以下问题：包含非ASCII字符、包含下划线、包含大写字母、包含多个斜杠、包含重复的路径、包含空格、包含内部搜索、包含参数、超过100个字符",
  URL_DEPTH: "页面深度过深，导致该页面搜索引擎爬取缓慢，收录缓慢",
  TITLE:
    "缺失标题导致搜索引擎自行抓取标题（这可能不符合预期），标题重复导致搜索引擎无法判断页面唯一性，标题过长无法被显示，不便于用户和搜索引擎理解页面。",
  DESCRIPTION:
    "缺失描述导致搜索引擎自行抓取描述（这可能不符合预期），描述重复导致搜索引擎无法判断页面唯一性，描述过长无法被显示，不便于用户和搜索引擎理解页面内容",
  META_LANGUAGE: "缺失meta language会导致部分搜索引擎无法准确获取页面语言信息",
  H1: "缺少H1标签，或一个页面存在多个H1标签，网站里包括重复的H1标签的内容，H1标签内容超过70个字符",
  IMG_ALT: "图片alt属性不符合规范",
  RENDER_PATTERN:
    "您的网站使用的框架可能默认为客户端渲染的模式，这意味着浏览器将先生成一个空内容的HTML，然后执行JavaScript渲染内容，客户端渲染对搜索引擎机器人不友好，内容可能会被遗漏，而不包括在搜索引擎的索引中",
};
