# 🚀 Antigravity Project Instructions
## Project: Premium Headless Shopify Fashion Store

---

# Project Goal

Build a premium, production-ready fashion e-commerce website.

Frontend is completely custom.

Backend is Shopify Headless.

Everything must be modular, reusable and scalable.

Never generate Shopify themes.

Never use Liquid.

Always assume this project uses Shopify Storefront API.

---

# Tech Stack

Frontend

- React
- Vite
- TailwindCSS
- React Router
- Framer Motion (if animation needed)

Backend

- Shopify Headless
- Storefront GraphQL API

Language

- TypeScript preferred
- JavaScript acceptable

---

# Folder Structure

src/

    api/

    graphql/

    components/

        ui/

        layout/

        sections/

        product/

        collection/

        cart/

    pages/

    hooks/

    context/

    services/

    utils/

    assets/

Never create huge files.

Keep components under 150 lines whenever possible.

---

# UI Philosophy

This is a premium luxury fashion brand.

Design should feel similar to

- COS
- Zara
- Aime Leon Dore
- Fear of God
- Aesop
- Apple

Avoid

- Bright colors
- Rounded childish cards
- Bootstrap style layouts
- Generic templates

Prefer

Large whitespace

Minimal typography

Elegant spacing

Large imagery

Smooth animation

Luxury aesthetic

---

# Component Rules

Every UI element should be reusable.

Never duplicate components.

Examples

ProductCard

CollectionCard

Button

Input

Badge

Price

Navbar

Footer

Gallery

Each component should receive props.

Never hardcode data.

Example

GOOD

<ProductCard product={product} />

BAD

<ProductCard title="Oversized Tee" />

---

# Data Rules

Never hardcode products.

Always assume data comes from Shopify.

Products

Collections

Variants

Cart

Customer

Menu

Pages

Metaobjects

Metafields

Even if mock data is used, structure it exactly like Shopify.

---

# Homepage Structure

Announcement Bar

Navbar

Hero

Featured Collections

Featured Products

Campaign Banner

New Arrivals

Lookbook

Testimonials

Newsletter

Footer

---

# Product Page Structure

Gallery

Title

Price

Compare Price

Variant Selector

Quantity

Add to Cart

Description

Product Details

Related Products

Recently Viewed

---

# Collection Page

Collection Banner

Filters

Sorting

Grid

Pagination

---

# Cart

Slide Drawer

Quantity Update

Remove Item

Subtotal

Checkout Button

---

# Shopify Integration Rules

Always use Storefront API.

Never use Admin API on frontend.

Every API call should live inside

/api

or

/graphql

Never fetch directly inside UI components.

Example

BAD

ProductCard.jsx

fetch()

GOOD

getProducts()

↓

ProductGrid

↓

ProductCard

---

# State Management

Global

Cart

Customer

Theme

Local

Modal

Dropdown

Accordion

Never place business logic inside UI components.

---

# Styling Rules

Tailwind only.

No inline CSS.

No random spacing.

Use consistent spacing scale.

4

8

12

16

24

32

48

64

96

Typography

Large headings

Minimal body text

Readable spacing

---

# Images

Always optimize.

Lazy load images.

Responsive images.

Never stretch.

Maintain aspect ratio.

---

# Animations

Use Framer Motion.

Animations should feel smooth.

Never over animate.

Fade

Reveal

Scale

Parallax

Subtle hover

Luxury feel.

---

# Performance

Lazy load routes.

Memoize expensive components.

Skeleton loading.

Image optimization.

Code splitting.

Avoid unnecessary rerenders.

---

# Accessibility

Keyboard navigation.

ARIA labels.

Semantic HTML.

Proper buttons.

Proper headings.

---

# Error Handling

Loading State

Error State

Empty State

Every page must support all three.

---

# Naming

Components

PascalCase

Hooks

useSomething

Utilities

camelCase

Folders

lowercase

---

# Before Writing Code

Always ask

Is this reusable?

Does Shopify already provide this data?

Should this be static or dynamic?

Can the merchant edit this later?

Will this scale?

---

# Shopify Data Mapping

Navbar

↓

Menus

Homepage Products

↓

Collections

Product Card

↓

Product

Product Page

↓

Product

Variants

Images

Metafields

Cart

↓

Cart API

Checkout

↓

Checkout URL

Footer Links

↓

Menus

Policies

↓

Pages

Hero

↓

Static or Metaobjects

---

# Code Quality

No duplicate code.

No unnecessary libraries.

No giant components.

Always split logic.

Prefer composition over repetition.

---

# Overall Mindset

Think like a Senior Frontend Engineer.

Think like a Shopify Architect.

Think like a UI Designer.

The frontend should be beautiful.

The backend should be Shopify.

The merchant should manage everything from Shopify Admin.

The customer should never know Shopify exists.
