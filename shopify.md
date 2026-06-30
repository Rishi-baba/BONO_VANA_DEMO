# Shopify Headless Architecture

This project uses Shopify as the backend only.

Frontend is completely custom.

Never generate Shopify themes.

Never use Liquid.

Always assume React + Vite + TailwindCSS.

Use Shopify Storefront GraphQL API.

---

# Store Structure

Shopify is responsible for:

- Products
- Collections
- Variants
- Inventory
- Customers
- Cart
- Checkout
- Menus
- Pages
- Metaobjects
- Metafields
- Search

React is responsible for:

- UI
- Layout
- Components
- Animations
- Routing
- State Management

---

# Data Flow

Customer

↓

React UI

↓

Service Layer

↓

GraphQL Queries

↓

Shopify Storefront API

↓

Shopify Admin

Never fetch Shopify directly inside UI components.

Always use

services/shopify/

or

graphql/

---

# Product

Every product contains

- id
- handle
- title
- description
- vendor
- productType
- tags
- images
- variants
- price
- compareAtPrice
- availableForSale
- featuredImage

Never hardcode products.

---

# Collections

Collections contain

- title
- handle
- description
- image
- products

Used in

Navbar

Homepage

Collection Pages

Filters

---

# Variants

Each product can contain

- Size
- Color
- Material

Each variant has

- id
- title
- image
- price
- inventory
- availability
- SKU

Always use selected variant.

Never assume only one variant exists.

---

# Cart

Cart supports

- Create Cart
- Add Item
- Remove Item
- Update Quantity
- Checkout URL

Cart state should be managed globally.

---

# Checkout

Never build custom checkout.

Always redirect to Shopify Checkout.

---

# Customer

Customer data includes

- Name
- Email
- Orders
- Addresses

Authentication should use Shopify Customer API when required.

---

# Menus

Menus should power

Navbar

Footer

Mobile Menu

Never hardcode navigation that merchants should edit.

---

# Pages

Shopify pages include

About

Shipping

Privacy

Terms

Refund

Use Shopify pages when content should be editable.

---

# Metaobjects

Use Metaobjects for editable homepage content.

Examples

Hero

Campaign Banner

Lookbook

Testimonials

FAQ

Brand Story

Do not hardcode these sections if the merchant needs to edit them.

---

# Metafields

Use Metafields for custom product information.

Examples

Material

Fabric

Care Instructions

Model Information

Size Guide

Country of Origin

---

# Images

Use Shopify product images.

Support multiple images.

Support image galleries.

Support variant image switching.

Never crop product images unnecessarily.

---

# Search

Search products through Shopify.

Support

- Search
- Filters
- Sorting

---

# Component Mapping

Navbar

→ Shopify Menu

Homepage Products

→ Shopify Collection

Product Card

→ Product

Product Page

→ Product + Variants + Metafields

Collection Page

→ Collection

Cart

→ Cart API

Checkout

→ Checkout URL

Footer

→ Menu + Pages

Hero

→ Static or Metaobject

Testimonials

→ Metaobjects

FAQ

→ Metaobjects

---

# API Rules

All Shopify requests belong inside

src/services/shopify/

or

src/graphql/

Never inside components.

Components receive data through props.

---

# Code Rules

Always separate

UI

Business Logic

Shopify API

Never mix them.

Keep components reusable.

Keep Shopify logic centralized.

Always assume merchants will update content from Shopify Admin.

The frontend must automatically reflect those changes.