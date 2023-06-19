import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { validateSync } from 'class-validator';

function envValidation<T extends object>(
  configuration: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  const finalConfig = plainToClass(envVariablesClass, configuration, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(finalConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return finalConfig;
}

export default envValidation;
