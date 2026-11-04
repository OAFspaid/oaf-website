---
layout: page
title: "Freedom Bear Coffee"
permalink: /freedom-bear-coffee/
description: "Shop Freedom Bear Coffee, a proud partner of Operation Antifragile, for coffee, mugs, and more."
hero_kicker: "Partners"
hero_title: "Freedom Bear Coffee"
breadcrumbs: true
---

<section class="content-section">
  <div class="section-content">
    <p>Freedom Bear Coffee is a proud partner of Operation Antifragile. Shop the Mycelioperator Lion's Mane Chaga blend, OAF travel mug, and matcha below.</p>
  </div>
</section>

<section class="content-section">
  <div class="section-content">
    <div class="fb-products">
      <div class="fb-products__col"><div id='product-component-1762980574068'></div></div>
      <div class="fb-products__col"><div id='product-component-1762980574069'></div></div>
      <div class="fb-products__col"><div id='product-component-1762980574070'></div></div>
    </div>
    <style>
      .fb-products {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        justify-content: center;
      }
      .fb-products__col {
        flex: 1 1 0;
        min-width: 0;
      }
      .fb-products__col * {
        max-width: 100%;
      }
      @media (max-width: 600px) {
        .fb-products {
          flex-direction: column;
          align-items: center;
        }
        .fb-products__col {
          max-width: 100%;
          width: 100%;
        }
      }
    </style>
    <script type="text/javascript">
    /*<![CDATA[*/
    (function () {
      var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          loadScript();
        }
      } else {
        loadScript();
      }
      function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
      }
      function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
          domain: 'bear-necessity-coffee-company.myshopify.com',
          storefrontAccessToken: 'a263020449d74cbbd11438257a7e069b',
        });
        var productOptions = {
      "product": {
        "styles": {
          "product": {
            "max-width": "100%",
            "margin-left": "0px",
            "margin-bottom": "0px"
          },
          "button": {
            "font-family": "Avant Garde, sans-serif",
            "font-size": "18px",
            "padding-top": "17px",
            "padding-bottom": "17px",
            ":hover": {
              "background-color": "#4a7980"
            },
            "background-color": "#52868e",
            ":focus": {
              "background-color": "#4a7980"
            },
            "border-radius": "7px",
            "padding-left": "36px",
            "padding-right": "36px"
          },
          "quantityInput": {
            "font-size": "18px",
            "padding-top": "17px",
            "padding-bottom": "17px"
          }
        },
        "buttonDestination": "modal",
        "contents": {
          "options": false
        },
        "text": {
          "button": "View product"
        }
      },
      "productSet": {
        "styles": {
          "products": {
            "@media (min-width: 601px)": {
              "margin-left": "-20px"
            }
          }
        }
      },
      "modalProduct": {
        "contents": {
          "img": false,
          "imgWithCarousel": true,
          "button": false,
          "buttonWithQuantity": true
        },
        "styles": {
          "product": {
            "@media (min-width: 601px)": {
              "max-width": "100%",
              "margin-left": "0px",
              "margin-bottom": "0px"
            }
          },
          "button": {
            "font-family": "Avant Garde, sans-serif",
            "font-size": "18px",
            "padding-top": "17px",
            "padding-bottom": "17px",
            ":hover": {
              "background-color": "#4a7980"
            },
            "background-color": "#52868e",
            ":focus": {
              "background-color": "#4a7980"
            },
            "border-radius": "7px",
            "padding-left": "36px",
            "padding-right": "36px"
          },
          "quantityInput": {
            "font-size": "18px",
            "padding-top": "17px",
            "padding-bottom": "17px"
          }
        },
        "text": {
          "button": "Add to cart"
        }
      },
      "option": {},
      "cart": {
        "styles": {
          "button": {
            "font-family": "Avant Garde, sans-serif",
            "font-size": "18px",
            "padding-top": "17px",
            "padding-bottom": "17px",
            ":hover": {
              "background-color": "#4a7980"
            },
            "background-color": "#52868e",
            ":focus": {
              "background-color": "#4a7980"
            },
            "border-radius": "7px"
          }
        },
        "text": {
          "total": "Subtotal",
          "button": "Checkout"
        },
        "popup": false
      },
      "toggle": {
        "styles": {
          "toggle": {
            "font-family": "Avant Garde, sans-serif",
            "background-color": "#52868e",
            ":hover": {
              "background-color": "#4a7980"
            },
            ":focus": {
              "background-color": "#4a7980"
            }
          },
          "count": {
            "font-size": "18px"
          }
        }
      }
    };
        ShopifyBuy.UI.onReady(client).then(function (ui) {
          // Mycelioperator Lion's Mane Chaga
          ui.createComponent('product', {
            id: '9461922627858',
            node: document.getElementById('product-component-1762980574068'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: productOptions,
          });
          // OAF Travel Mug
          ui.createComponent('product', {
            id: '10295356424466',
            node: document.getElementById('product-component-1762980574069'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: productOptions,
          });
          // Matcha
          ui.createComponent('product', {
            id: '10291377471762',
            node: document.getElementById('product-component-1762980574070'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: productOptions,
          });
        });
      }
    })();
    /*]]>*/
    </script>
  </div>
</section>
