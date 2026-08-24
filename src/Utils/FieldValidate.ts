export function ValidateFields(fieldsToValidate: Record<string, string>) {
  const errors: Record<string, string> = {};

  for (const [key, value] of Object.entries(fieldsToValidate)) {
    errors[key] = value.trim() ? "" : `El campo ${key} debe ser obligatorio`;
  }

  return errors;
}
