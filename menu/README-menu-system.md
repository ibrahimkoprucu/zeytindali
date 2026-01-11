# Dynamic Menu System

This directory contains a data-driven menu system that separates content from presentation.

## Files

### 1. `menu-data.json`

JSON file containing all menu data structured by categories. This is the single source of truth for menu content.

**Structure:**

```json
{
  "restaurant": {
    "name": "Restaurant name",
    "location": "Location",
    "contact": { ... }
  },
  "categories": [
    {
      "id": "category-id",
      "nameTR": "Turkish Name",
      "nameEN": "English Name",
      "items": [
        {
          "nameTR": "Turkish dish name",
          "nameEN": "English dish name",
          "description": "Description",
          "image": "path/to/image.jpg",
          "price": 25,
          "currency": "₺",
          "note": "Optional note"
        }
      ]
    }
  ]
}
```

### 2. `menu-renderer.js`

jQuery-based JavaScript module that:

- Loads menu data from JSON
- Dynamically generates navigation tabs
- Renders menu items as Bootstrap cards
- Handles errors gracefully
- Maintains smooth scroll functionality

**Features:**

- Automatic card deck grouping (3 items per row)
- Responsive image handling
- Price display formatting
- Loading spinners
- Error handling with user feedback

### 3. `menu.html`

HTML template that uses the dynamic menu system. Contains:

- Minimal HTML structure
- Loading spinners
- Container elements for dynamic content
- All necessary CSS/JS dependencies
- Consistent navbar across all website pages

### 4. `menu-styles.css`

Stylesheet for the menu page with brand-consistent design:

**CSS Variables:**

```css
:root {
  --primary-color: #0f424a; /* Dark teal - brand color */
  --accent-color: #28a745; /* Green accent */
  --bg-light: #f8f8f5; /* Off-white cream background */
}
```

**Features:**

- Responsive navigation pills
- Card-based menu item layout
- Hover effects and transitions
- Contact banner styling
- Google Fonts (Nunito) with fallback stack

## Usage

### To Update Menu Items:

1. Edit `menu-data.json`
2. Add/modify/remove items in the appropriate category
3. Refresh the page - changes appear automatically

### To Add a New Category:

```json
{
  "id": "unique-category-id",
  "nameTR": "Türkçe İsim",
  "nameEN": "English Name",
  "items": []
}
```

### To Add a New Menu Item:

```json
{
  "nameTR": "Türkçe İsim",
  "nameEN": "English Name",
  "description": "Item description",
  "image": "../img/menu/item.jpg", // optional
  "price": 30, // optional
  "currency": "₺", // optional
  "note": "Special note" // optional
}
```

## Benefits

1. **Easy Maintenance**: Update menu by editing JSON file only
2. **Consistent Formatting**: All items rendered with same structure
3. **Scalability**: Easy to add new categories and items
4. **Separation of Concerns**: Content separated from presentation
5. **Performance**: Only loads data once, renders dynamically
6. **Accessibility**: Maintains semantic HTML and ARIA labels
7. **Brand Consistency**: Uses CSS variables for unified color scheme across entire website
8. **Responsive Design**: Mobile-first approach with Bootstrap 4 grid system

## Migration from Static HTML

The original `menu.html` is static HTML with hard-coded menu items. The dynamic system offers:

- **Before**: 1934 lines of repetitive HTML
- **After**: ~100 lines of HTML + structured JSON data + reusable renderer

## Browser Support

Requires:

- jQuery 3.3.1+
- Bootstrap 4.3.1+
- Modern browser with ES5 support
- Google Fonts (Nunito) with optimized loading

**Performance Optimizations:**

- Font preconnect for faster loading
- `display=optional` for reduced font flickering
- System font fallback stack

## Future Enhancements

Potential improvements:

- Add search/filter functionality
- Implement dietary filters (vegetarian, vegan, gluten-free)
- Add multi-language support
- Include allergen information
- Add item popularity indicators
- Implement admin panel for editing
