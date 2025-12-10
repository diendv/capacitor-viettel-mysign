export interface MysignPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
