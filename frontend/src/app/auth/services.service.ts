import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            success
            refreshToken
            errors
            user {
              id
              pk
            }
          }
        }
      `,
      variables: {
        email,
        password
      }
    });
  }

  register(email: string, username: string, password1: string, password2: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Register($email: String!, $username: String!, $password1: String!, $password2: String!) {
          register(email: $email, username: $username, password1: $password1, password2: $password2) {
            success
            token
            errors
          }
        }
      `,
      variables: {
        email,
        username,
        password1,
        password2
      }
    });
  }
}
