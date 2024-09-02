import { GraphQLError } from 'graphql';

export class ApplicationError extends GraphQLError {
  constructor(message: string, code: string, statusCode: number) {
    super(message, {
      extensions: { code, http: { status: statusCode } },
    });
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

