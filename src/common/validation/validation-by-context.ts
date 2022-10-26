import { SchemaOf, ValidationError as YupValidationError } from 'yup';
import ValidationStatus from './validation-status';
import ValidationError from './validation.error';

async function validationByContext<T>(
  data: unknown,
  schema: SchemaOf<T>
): Promise<ValidationStatus> {
  try {
    await schema.validate(data);
    return {
      succeed: true,
    };
  } catch (error) {
    const { message, path } = error as YupValidationError;
    const serializedPath = String(path);

    return {
      succeed: false,
      error: new ValidationError(
        message,
        serializedPath,
        (data as Record<string, unknown>)[serializedPath]
      ),
    };
  }
}

export default validationByContext;
