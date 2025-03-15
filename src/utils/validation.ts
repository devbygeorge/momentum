export const validateField = (
  value: string,
  minLength: number,
  maxLength: number,
  wordMin?: number,
  validateOnSubmit?: boolean
) => {
  const minReqs = wordMin
    ? value.trim().split(/\s+/).length >= wordMin
    : value.length >= minLength;
  const maxReqs = value.length <= maxLength;
  const fullReqs = minReqs && maxReqs;
  const validate = value.length > 0 || validateOnSubmit;

  return { minReqs, maxReqs, fullReqs, validate };
};
