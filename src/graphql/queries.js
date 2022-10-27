import { gql } from '@apollo/client';

export const GET_EMPLOYEE = gql`
  query GetEmployee {
    employee {
      id
      name
      email
    }
  }
`;

export const GET_IMA_SERVICES = gql`
  query getImaServices {
    imaServices {
      id
      clientName
    }
  }
`;
