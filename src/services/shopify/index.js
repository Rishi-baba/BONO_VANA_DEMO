import { storefrontFetch } from './client';

const mapShopifyProducts = (edges) => {
  return edges.map(({ node }) => {
    const featuredImage = node.images && node.images.edges.length > 0 
      ? node.images.edges[0].node 
      : { url: "/images/hero_resort_wear.jpg", altText: node.title };

    return {
      ...node,
      featuredImage,
      metafields: [
        { namespace: "custom", key: "details", value: "Check product description for details." },
        { namespace: "custom", key: "measurements", value: "" },
        { namespace: "custom", key: "materials", value: "100% Sustainable Materials" }
      ]
    };
  });
};

export const getProducts = async () => {
  try {
    const query = `
      query getProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              vendor
              productType
              tags
              options { name values }
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              compareAtPriceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 5) {
                edges { node { url altText } }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price { amount currencyCode }
                    selectedOptions { name value }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const data = await storefrontFetch({ query });
    if (data && data.products && data.products.edges.length > 0) {
      return mapShopifyProducts(data.products.edges);
    }
  } catch (err) {
    console.error("Failed to fetch live products", err);
  }
  return [];
};

export const getProductByHandle = async (handle) => {
  try {
    const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          vendor
          productType
          tags
          options { name values }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 10) {
            edges { node { url altText } }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    `;
    const data = await storefrontFetch({ query, variables: { handle } });
    if (data && data.product) {
      return mapShopifyProducts([{ node: data.product }])[0];
    }
  } catch (err) {
    console.error("Failed to fetch live product", err);
  }
  return null;
};

export const getCollections = async () => {
  try {
    const query = `
      query getCollections {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              image { url altText }
            }
          }
        }
      }
    `;
    const data = await storefrontFetch({ query });
    if (data && data.collections) {
      return data.collections.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        image: node.image?.url || "/images/hero_resort_wear.jpg",
        products: []
      }));
    }
  } catch (err) {
    console.error("Failed to fetch collections", err);
  }
  return [];
};

export const getCollectionByHandle = async (handle) => {
  try {
    const query = `
      query getCollectionByHandle($handle: String!) {
        collection(handle: $handle) {
          id
          title
          handle
          description
          image { url altText }
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                vendor
                productType
                tags
                options { name values }
                priceRange { minVariantPrice { amount currencyCode } }
                compareAtPriceRange { minVariantPrice { amount currencyCode } }
                images(first: 2) { edges { node { url altText } } }
                variants(first: 10) {
                  edges {
                    node { id title availableForSale price { amount currencyCode } selectedOptions { name value } }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const data = await storefrontFetch({ query, variables: { handle } });
    if (data && data.collection) {
      const col = data.collection;
      return {
        id: col.id,
        title: col.title,
        handle: col.handle,
        description: col.description,
        image: col.image?.url || "/images/hero_resort_wear.jpg",
        products: col.products ? mapShopifyProducts(col.products.edges) : []
      };
    }
  } catch (err) {
    console.error("Failed to fetch collection", err);
  }
  return null;
};

export { NAVIGATION_MENU } from '../../data/content';

// --- CART OPERATIONS ---

const CART_QUERY_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText }
            price { amount currencyCode }
            product {
              id
              title
              handle
            }
          }
        }
      }
    }
  }
`;

export const createCart = async (variantId, quantity = 1) => {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          ${CART_QUERY_FRAGMENT}
        }
      }
    }
  `;
  const variables = {
    input: { lines: [{ merchandiseId: variantId, quantity }] }
  };
  const data = await storefrontFetch({ query, variables });
  return data?.cartCreate?.cart;
};

export const addCartLines = async (cartId, lines) => {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_QUERY_FRAGMENT}
        }
      }
    }
  `;
  const data = await storefrontFetch({ query, variables: { cartId, lines } });
  return data?.cartLinesAdd?.cart;
};

export const updateCartLines = async (cartId, lines) => {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${CART_QUERY_FRAGMENT}
        }
      }
    }
  `;
  const data = await storefrontFetch({ query, variables: { cartId, lines } });
  return data?.cartLinesUpdate?.cart;
};

export const removeCartLines = async (cartId, lineIds) => {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${CART_QUERY_FRAGMENT}
        }
      }
    }
  `;
  const data = await storefrontFetch({ query, variables: { cartId, lineIds } });
  return data?.cartLinesRemove?.cart;
};

export const getCart = async (cartId) => {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ${CART_QUERY_FRAGMENT}
      }
    }
  `;
  const data = await storefrontFetch({ query, variables: { cartId } });
  return data?.cart;
};

// --- BLOG OPERATIONS ---

export const getArticles = async () => {
  try {
    const query = `
      query getArticles {
        articles(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              publishedAt
              image { url altText }
              authorV2 { name }
            }
          }
        }
      }
    `;
    const data = await storefrontFetch({ query });
    if (data && data.articles) {
      return data.articles.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        excerpt: node.excerpt,
        publishedAt: new Date(node.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: node.image?.url || "/images/linen_textures.jpg",
        author: node.authorV2?.name || "Boho Vana"
      }));
    }
  } catch (err) {
    console.error("Failed to fetch articles", err);
  }
  return [];
};

export const getArticleByHandle = async (handle) => {
  try {
    const query = `
      query getArticleByHandle($query: String!) {
        articles(first: 1, query: $query) {
          edges {
            node {
              id
              title
              handle
              excerpt
              contentHtml
              publishedAt
              image { url altText }
              authorV2 { name }
            }
          }
        }
      }
    `;
    
    const data = await storefrontFetch({ query, variables: { query: `handle:${handle}` } });
    if (data && data.articles && data.articles.edges.length > 0) {
      const node = data.articles.edges[0].node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        excerpt: node.excerpt,
        content: node.contentHtml,
        publishedAt: new Date(node.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        image: node.image?.url || "/images/linen_textures.jpg",
        author: node.authorV2?.name || "Boho Vana"
      };
    }
  } catch (err) {
    console.error("Failed to fetch article", err);
  }
  return null;
};

// --- CUSTOMER OPERATIONS ---
export * from './customer';
