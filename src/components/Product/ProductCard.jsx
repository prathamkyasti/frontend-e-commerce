import React from 'react';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-400">
          {product.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>

        {product.description && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stockQuantity}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isAdmin ? (
            <button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          ) : (
            <>
              <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
