import { gql } from '@apollo/client';

// EMPLOYEES MUTATIONS

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($createEmployeeInput: CreateEmployeeInput!) {
    createEmployee(createEmployeeInput: $createEmployeeInput) {
      id
      name
      authId
      email
      role
    }
  }
`;

// IMA SERVICES MUTATIONS

export const CREATE_IMA_SERVICE = gql`
  mutation createImaService($createImaServiceInput: CreateImaServiceInput!) {
    createImaService(createImaServiceInput: $createImaServiceInput) {
      id
      clientComment
      employeeNotes
      status
      entryDate
      departureDate
      completedPercent
      toPickup
      deviceModel
      deviceCondition
      deviceNotes
      clientId
      client {
        id
        name
        email
      }
    }
  }
`;
