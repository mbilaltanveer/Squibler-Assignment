import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private apollo: Apollo, private http: HttpClient) { }

  GET_PROJECTS_QUERY = `query {
    projects {
      id
      name
      textData
      user {
        email
        username
      }
    }
  }`

  CRETE_PROJECT_MUTATION = `mutation{
    createProject{
      project{
        id
        name
        textData
      }
    }
  }`

  GET_PROJECT_BY_ID_QUERY = `query GetProject($id: Int!) {
    project(id: $id) {
      id
      name
      textData
      user {
        email
        username
      }
    }
  }`

  UPDATE_PROJECT_QUERY = `mutation UpdateProject($projectId: Int!, $textData: String!) {
    updateProject(projectId: $projectId, textData: $textData) {
      project {
        id
        name
        textData
      }
    }
  }`


  updateProject(projectId: number, textData: string) {
    return this.apollo.mutate({
      mutation: gql`${this.UPDATE_PROJECT_QUERY}`,
      variables: {
        projectId,
        textData
      },
      // refetchQueries: [
      //   {
      //     query: gql`${this.GET_PROJECTS_QUERY}`
      //   }
      // ]
    });
  }
  getProjectById(id: number) {
    return this.apollo.watchQuery({
      query: gql`${this.GET_PROJECT_BY_ID_QUERY}`,
      variables: {
        id
      }
    }).valueChanges;
  }
  getProjects() {
    return this.apollo.watchQuery({
      query: gql`${this.GET_PROJECTS_QUERY}`
    }).valueChanges;
  }

  createProject() {
    return this.apollo.mutate({
      mutation: gql`${this.CRETE_PROJECT_MUTATION}`,
      refetchQueries: [
        {
          query: gql`${this.GET_PROJECTS_QUERY}`
        }
      ]
    });
  }


  getWordDefinition(word: string): Observable<any> {
    debugger
    let uri = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    return this.http.get<any>(uri);
  }
}


