export type O = { [key: string]: unknown };
export type P = number | string | boolean | O | null | undefined;
export enum RuleType {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
}

export type Rule = {
  type: RuleType;
  required?: boolean;
  custom?(value: P, obj?: O): boolean;
  regexp?: RegExp;
};
export type Schema = Record<string, Rule>;
export enum ErrorType {
  required = 'required',
  type = 'type',
  format = 'format',
  custom = 'custom',
}

export type Errors = { [key: string]: ErrorType };
