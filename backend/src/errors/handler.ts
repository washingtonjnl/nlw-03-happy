import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors: ValidationErrors = {};

    err.inner.forEach(error => {
      errors[error.path] = error.errors;
    });

    console.log(err);

    return res.status(400).json({ message: 'Validation fails', errors });
  }

  console.error(err);

  return res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
