const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Fetch data from Shopify Storefront API
 * @param {string} query GraphQL query string
 * @param {object} variables Variables for the GraphQL query
 * @returns {Promise<any>} The data object from the response
 */
export async function storefrontFetch({ query, variables = {} }) {
  if (!domain || !storefrontAccessToken) {
    console.warn("Shopify credentials are not set. Ensure VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN are in your .env.local file.");
    throw new Error("Missing Shopify credentials");
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify GraphQL Errors:", json.errors);
      throw new Error("GraphQL Error");
    }

    return json.data;
  } catch (error) {
    console.error("Storefront API fetch error:", error);
    throw error;
  }
}
