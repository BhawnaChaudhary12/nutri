import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { useCart } from './CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import { Navigation, Pagination } from 'swiper/modules';


const productData = {
  'Intimate Care': {
    price: 141,
    description: 'Gentle intimate wash for daily use.',
    images: [
      '/images/intimate wash 0.1.jpg',
      '/images/intimate wash 0.2.jpg',
      '/images/intimate wash 0.3.jpg'
    ],
    specs: {
      'Skin Type': 'All',
      'Scent': 'Fresh',
      'Item Form': 'Gel',
      'Special Feature': 'Soothing, PH Balance, Prevent Infections',
      'Country of Origin': 'India',
      'Benefits': [
        'Gentle Formula: Designed specifically for women\'s intimate hygiene, ensuring a mild and soothing cleanse.',
        'Anti-Bacterial Properties: Helps prevent infections by maintaining a healthy balance of natural bacteria.',
        'Skin-Friendly: Suitable for all skin types, offering a smooth and irritation-free experience.',
        'pH Balanced: Maintains the natural pH balance of the vaginal area, promoting overall health and freshness.',
        'Daily Use: Perfect for regular use, providing long-lasting freshness and comfort.'
      ]
    }
  },
  'Sunscreen': {
    price: 175,
    description: 'SPF 50 Sunscreen for sun protection.',
    images: [
      '/images/sun screen 0.1.jpg',
      '/images/sun screen 0.2.jpg'
    ],
    specs: {
      'Skin Type': 'All',
      'Sun Protection': '50 SPF',
      'Item Form': 'Lotion',
      'Country of Origin': 'India',
      'Benefits': [
        'Broad-Spectrum Protection: SPF 50+ and PA+++ shield against UVA, UVB, and blue light.',
        'For All Skin Types: Suitable for men and women, offering versatile protection.',
        'Deep Moisturization: Hydrates and nourishes the skin without greasiness.',
        'Lightweight Formula: Absorbs quickly, perfect for daily use under makeup or alone.',
        'Prevents Skin Damage: Helps prevent sunburn, premature aging, and damage from digital devices.'
      ]
    }
  },
  'Face Wash': {
    price: 156,
    description: 'Vitamin C enriched face wash.',
    images: [
      '/images/face wash 0.1.jpg',
      '/images/face wash 0.2.jpg'
    ],
    specs: {
      'Skin Type': 'All',
      'Scent': 'Mint',
      'Product Benefits': [
        'Acne Prevention',
        'Hydrating',
        'Tan Removal',
        'Oil Control',
        'Brightening',
        'Shine Control'
      ],
      'Item Form': 'Gel',
      'Special Feature': [
        'Safe Ingredient',
        'Natural Ingredients',
        'Nourishing'
      ],
      'Material Type Free': [
        'Artificial Colour Free',
        'Gluten Free',
        'No Alcohol',
        'No Parabens',
        'Animal Fat Free'
      ],
      'Country of Origin': 'India',
      'Benefits': [
        'Natural Ingredients: Infused with Aloe Vera, Neem, and Vitamin C for clear, healthy skin.',
        'Acne and Blackhead Fighter: Combats acne and blackheads with antibacterial Neem.',
        'Hydrating and Refreshing: Provides deep hydration and a refreshing cleanse.',
        'Brightens Complexion: Vitamin C helps brighten skin and reduce dark spots.',
        'Safe and Gentle: Sulphate and paraben-free formula suitable for all skin types.'
      ]
    }
  },
  'Bath Soap': {
    price: 41.80,
    description: 'Moisturising bath soap.',
    images: [
      '/images/soap 0.1.jpg',
      '/images/soap 0.2.jpg'
    ],
    specs: {
      'Skin Type': 'All',
      'Scent': 'Aloe Vera',
      'Product Benefits': [
        'Nourishing Formula',
        'Gentle & Soothing',
        'Deeply Hydrating',
        'Perfume'
      ],
      'Item Form': 'Bar',
      'Special Feature': [
        'Glycerin',
        'Aloevera',
        'Scented',
        'Vitamin E',
        'Safe Ingredient'
      ],
      'Material Type Free': [
        'Artificial Colour Free',
        'Animal Fat Free'
      ],
      'Country of Origin': 'India',
      'Benefits': [
        'Natural Ingredients: Enriched with Aloe Vera, Vitamin E, and Glycerin for superior skin care.',
        'Germ and Virus Protection: Provides effective cleansing to protect against germs and viruses.',
        'Hydrating Formula: Moisturizes and nourishes the skin, preventing dryness and irritation.',
        'Soft and Smooth Skin: Leaves skin feeling silky smooth and beautifully soft with regular use.',
        'Daily Use: Suitable for all skin types, ideal for the entire family for everyday bathing.'
      ]
    }
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const navigate = useNavigate(); 
  const product = productData[id];
  const productInCart = cart.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : 1);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, id, quantity });
  };

  const handleViewCart = () => {
    navigate('/cart'); 
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        {/* Left - Product Images */}
        <div className="product-image-section">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={id} className="product-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right - Product Info */}
        <div className="product-info-section">
          <h1 className="product-title">{id}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>

          {/* Quantity Selector */}
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="quantity-input"
            />
            

            {/* Buttons for Add to Cart and View Cart */}
            <div className="button-container">
              <button onClick={handleAddToCart} className="add-to-cart-button">
                {productInCart ? 'Add to Cart' : 'Add to Cart'}
              </button>
              <button onClick={handleViewCart} className="view-cart-button">
                View Cart
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div className="product-specs">
            <h2>Specifications</h2>
            <ul>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

