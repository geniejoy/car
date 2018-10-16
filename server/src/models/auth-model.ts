import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';

export interface Mutation {
  getSessionId: string;
}

export interface Credential {
  username?: string;
  password?: string;
}

export interface Resolver {
  Mutation?: MutationTypeResolver;
}

export interface MutationTypeResolver<TParent = any> {
  getSessionId?: MutationToGetSessionIdResolver<TParent>;
}

export interface MutationToGetSessionIdArgs {
  credential?: Credential;
}
export interface MutationToGetSessionIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: MutationToGetSessionIdArgs, context: any, info: GraphQLResolveInfo): TResult;
}
