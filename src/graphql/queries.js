import { gql } from '@apollo/client';

// EMPLOYEES QUERIES

export const GET_EMPLOYEE = gql`
  query employee($id: Int!) {
    employee(id: $id) {
      id
      authId
      name
      email
      role
    }
  }
`;

// IMA SERVICES QUERIES

export const GET_IMA_SERVICE = gql`
  query imaService($id: Int!) {
    imaService(id: $id) {
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
        phone
      }
      employeeId
      deviceSerialNumber
      cost
      invoiceId
      invoiceNote
      diagnosis
    }
  }
`;

export const GET_IMA_SERVICES = gql`
  query imaServices {
    imaServices {
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
