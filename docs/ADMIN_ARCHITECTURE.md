# Admin Infrastructure & CMS Architecture

The ZAHIDAAN platform uses **Sanity.io v3** as its central Control Center. This "Headless" approach allows for a clean separation between content creation and the high-performance storefront.

## 1. The Admin Studio
- **URL**: `zahidaan.sanity.studio`
- **Architecture**: A React-based Single Page Application (SPA) that communicates directly with the Sanity Content Lake via GROQ (Graph-Relational Object Query).

## 2. Content Schema Design

Our schema is custom-built to support the unique requirements of a luxury fragrance brand.

### Product Document Type
- **Fragrance Notes**: A custom object field for Top, Heart, and Base notes, allowing for consistent formatting in the UI.
- **Categorization**: Strict categorization (Attars, Ouds, Perfumes, etc.) that drives the dynamic filtering in the frontend.
- **Media Array**: Support for high-resolution galleries with drag-and-drop reordering.
- **Tiered Pricing**: An array of objects allowing a single product to have multiple sizes (e.g., 6ml, 12ml, 50ml) with unique MRPs and stock counts.

### Blog & Education
A dedicated document type for fragrance education, enabling the owner to build authority and long-tail SEO traffic.

## 3. Image Pipeline
All assets are hosted on Sanity's global CDN. When an admin uploads a bottle shot:
1. **Metadata Extraction**: Sanity automatically extracts the aspect ratio, palette, and dimensions.
2. **On-the-fly Transformation**: The frontend requests specific versions (e.g., `?w=800&q=80`) to ensure the fastest possible load times without compromising quality.

## 4. Rebuild Webhooks
To bridge the gap between CMS updates and the static storefront:
- **Trigger**: When an admin clicks "Publish" in the Studio.
- **Action**: Sanity sends a POST request to the custom `webhook.php` listener on the production server.
- **Execution**: The webhook listener verifies the signature and triggers a GitHub Actions workflow to rebuild and redeploy the site with the new content.
