/**
 * Menu Renderer - jQuery script to dynamically render menu items from JSON data
 * @author Zeytin Dalı Restaurant
 * @version 1.0.0
 */

(function ($) {
  "use strict";

  const MenuRenderer = {
    /**
     * Initialize the menu renderer
     */
    init: function () {
      this.loadMenuData();
      this.setupEventHandlers();
    },

    /**
     * Load menu data from JSON file
     */
    loadMenuData: function () {
      const self = this;

      $.ajax({
        url: "menu-data.json",
        dataType: "json",
        cache: false,
        success: function (data) {
          self.renderMenu(data);
          console.log("Menu data loaded successfully");
        },
        error: function (xhr, status, error) {
          console.error("Error loading menu data:", error);
          self.showError("Failed to load menu data. Please refresh the page.");
        }
      });
    },

    /**
     * Render the complete menu
     * @param {Object} data - Menu data object
     */
    renderMenu: function (data) {
      const categories = data.categories;

      // Render navigation tabs
      this.renderNavigationTabs(categories);

      // Render menu content sections
      this.renderMenuSections(categories);

      // Update contact information
      this.updateContactInfo(data.restaurant);
    },

    /**
     * Render navigation tabs
     * @param {Array} categories - Array of menu categories
     */
    renderNavigationTabs: function (categories) {
      const $tabContainer = $("#pills-tab");
      $tabContainer.empty();

      categories.forEach((category, index) => {
        const isActive = index === 0 ? "active" : "";
        const ariaSelected = index === 0 ? "true" : "false";

        const $tab = $(`
          <a class="m-1 btn btn-outline-success nav-link ${isActive}" 
             id="${category.id}-tab" 
             data-toggle="pill" 
             href="#${category.id}" 
             role="tab" 
             aria-controls="${category.id}" 
             aria-selected="${ariaSelected}">
              <span class="category-name">${category.nameTR}</span>
              <span class="category-name-en">${category.nameEN}</span>
          </a>
        `);

        $tabContainer.append($tab);
      });
    },

    /**
     * Render menu content sections
     * @param {Array} categories - Array of menu categories
     */
    renderMenuSections: function (categories) {
      const $contentContainer = $("#pills-tabContent");
      $contentContainer.empty();

      categories.forEach((category, index) => {
        const isActive = index === 0 ? "show active" : "";

        const $section = $(`
          <section class="tab-pane fade ${isActive}" 
                   id="${category.id}" 
                   role="tabpanel" 
                   aria-labelledby="${category.id}-tab">
          </section>
        `);

        // Render items in this category
        if (category.items && category.items.length > 0) {
          const itemsHtml = this.renderCategoryItems(category.items);
          $section.append(itemsHtml);
        } else {
          $section.append('<p class="text-muted text-center py-5">No items available in this category yet.</p>');
        }

        $contentContainer.append($section);
      });
    },

    /**
     * Render items within a category
     * @param {Array} items - Array of menu items
     * @returns {jQuery} jQuery object containing rendered items
     */
    renderCategoryItems: function (items) {
      const $container = $("<div></div>");
      let currentDeck = null;

      items.forEach((item, index) => {
        // Create new card deck every 3 items
        if (index % 3 === 0) {
          currentDeck = $('<div class="card-deck"></div>');
          $container.append(currentDeck);
        }

        const $card = this.createMenuItemCard(item);
        currentDeck.append($card);
      });

      return $container;
    },

    /**
     * Create a menu item card
     * @param {Object} item - Menu item object
     * @returns {jQuery} jQuery card element
     */
    createMenuItemCard: function (item) {
      const $card = $('<article class="card mb-3 d-flex flex-column"></article>');

      // Add image if available
      if (item.image) {
        const $img = $(
          `<img src="${item.image}" class="card-img-top" alt="${item.nameEN}" style="height: 200px; object-fit: contain; background-color: #f8f9fa; cursor: pointer;">`
        );

        // Add click handler for image preview
        $img.on("click", function () {
          MenuRenderer.showImageModal(item.image, item.nameEN || item.nameTR);
        });

        $card.append($img);
      }

      // Create card body
      const $cardBody = $('<div class="card-body d-flex flex-column"></div>');

      // Add Turkish name
      if (item.nameTR) {
        $cardBody.append(`<h5 class="card-title">${item.nameTR}</h5>`);
      }

      // Add English name
      if (item.nameEN) {
        $cardBody.append(`<h5 class="card-title category-name-en">${item.nameEN}</h5>`);
      }

      // Add description
      if (item.description) {
        $cardBody.append(`<p class="card-text">${item.description}</p>`);
      }

      // Add note if available
      if (item.note) {
        $cardBody.append(`<p class="card-text"><em class="note">${item.note}</em></p>`);
      }

      // Add price if available (push to bottom with mt-auto)
      if (item.price !== null && item.price !== undefined) {
        const currency = item.currency || "₺";
        $cardBody.append(`<p class="card-text mt-auto"><small class="text-muted">${item.price} ${currency}</small></p>`);
      }

      $card.append($cardBody);
      return $card;
    },

    /**
     * Update contact information
     * @param {Object} restaurant - Restaurant information object
     */
    updateContactInfo: function (restaurant) {
      if (restaurant && restaurant.contact) {
        const phone = restaurant.contact.phone;
        const messenger = restaurant.contact.messenger;

        $('.contact-banner a[href^="tel:"]').attr("href", `tel:${phone}`).text(phone);
        $('.contact-banner a[href^="https://m.me"]').attr("href", messenger);
      }
    },

    /**
     * Setup event handlers
     */
    setupEventHandlers: function () {
      // Smooth scroll on tab click (keeping existing functionality)
      $("body").on("click", "a[role=tab]", function (event) {
        const hash = this.hash;
        const $target = $(hash);

        if ($target.length) {
          event.preventDefault();
          const tab = document.getElementById($target.attr("id"));

          $("html, body").animate(
            {
              scrollTop: tab.offsetTop
            },
            500,
            function () {
              window.location.hash = hash;
              tab.scrollIntoView();
            }
          );
        }
      });
    },

    /**
     * Show image in modal overlay
     * @param {string} imageSrc - Image source URL
     * @param {string} imageTitle - Image title/alt text
     */
    showImageModal: function (imageSrc, imageTitle) {
      // Check if modal already exists, if not create it
      let $modal = $("#imageModal");

      if ($modal.length === 0) {
        $modal = $(`
          <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="imageModalLabel"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body text-center">
                  <img id="modalImage" src="" alt="" class="img-fluid" style="max-height: 70vh; display: block; margin: 0 auto;">
                </div>
              </div>
            </div>
          </div>
        `);
        $("body").append($modal);
      }

      // Update modal content
      $modal.find("#imageModalLabel").text(imageTitle);
      $modal.find("#modalImage").attr("src", imageSrc).attr("alt", imageTitle);

      // Show modal
      $modal.modal("show");
    },

    /**
     * Show error message to user
     * @param {string} message - Error message to display
     */
    showError: function (message) {
      const $alert = $(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `);

      $(".container").prepend($alert);

      // Auto-dismiss after 5 seconds
      setTimeout(function () {
        $alert.alert("close");
      }, 5000);
    }
  };

  // Initialize when document is ready
  $(document).ready(function () {
    MenuRenderer.init();
  });
})(jQuery);
