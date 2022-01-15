
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  VITE_APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.module.less" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module "*.less" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}