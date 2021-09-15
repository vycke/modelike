import { Rule, RuleType } from './types';

// string
export const stringRule: Rule = { type: RuleType.string };
export const requiredStringRule: Rule = { ...stringRule, required: true };

// numbers
export const numberRule: Rule = { type: RuleType.number };
export const requiredNumberRule: Rule = { ...numberRule, required: true };

// booleans
export const booleanRule: Rule = { type: RuleType.boolean };
export const requiredBooleanRule: Rule = { ...booleanRule, required: true };

// GUIDs
export const guidRule: Rule = {
  type: RuleType.string,
  regexp: /[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}/,
};
export const requiredGuidRule: Rule = { ...guidRule, required: true };

// iso datetime
export const isoDateRule: Rule = {
  type: RuleType.string,
  custom: (v) =>
    !(isNaN(new Date(v).getTime()) || new Date(v).getFullYear() < 1900),
};
export const requiredIsoDateRule: Rule = { ...isoDateRule, required: true };
