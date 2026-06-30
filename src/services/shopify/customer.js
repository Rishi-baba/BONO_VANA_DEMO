import { storefrontFetch } from './client';

export const customerCreate = async ({ email, password, firstName, lastName }) => {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email firstName lastName }
        customerUserErrors { code field message }
      }
    }
  `;
  const variables = { input: { email, password, firstName, lastName } };
  const data = await storefrontFetch({ query, variables });
  return data?.customerCreate;
};

export const customerAccessTokenCreate = async ({ email, password }) => {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code field message }
      }
    }
  `;
  const variables = { input: { email, password } };
  const data = await storefrontFetch({ query, variables });
  return data?.customerAccessTokenCreate;
};

export const customerAccessTokenDelete = async (customerAccessToken) => {
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors { field message }
      }
    }
  `;
  const variables = { customerAccessToken };
  const data = await storefrontFetch({ query, variables });
  return data?.customerAccessTokenDelete;
};

export const getCustomer = async (customerAccessToken) => {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              fulfillmentStatus
              financialStatus
              totalPrice { amount currencyCode }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant { image { url altText } }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = { customerAccessToken };
  const data = await storefrontFetch({ query, variables });
  return data?.customer;
};
