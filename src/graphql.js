import gql from 'graphql-tag';

export const ME = gql`
  query me {
    user(login:"padpc"){
      name
      avatarUrl
    }
  }
  `