import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://127.0.0.1:8002/graphql'; 

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const authLink = new ApolloLink((operation, forward) => {
    const token = `JWT ${localStorage.getItem('token')}`;
    if (token) {
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `${token}`)
      });
    }

    return forward(operation);
  });

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
