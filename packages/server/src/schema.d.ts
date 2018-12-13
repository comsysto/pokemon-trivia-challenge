import { GraphQLResolveInfo } from 'graphql';
/**
 * This file is auto-generated by @pongsatt/graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface GQLQuery {
  helloWorld: string;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface GQLResolver {
  Query?: GQLQueryTypeResolver;
}
export interface GQLQueryTypeResolver<TParent = any> {
  helloWorld?: QueryToHelloWorldResolver<TParent>;
}

export interface QueryToHelloWorldResolver<TParent = any, TResult = string|Promise<string>> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult;
}
