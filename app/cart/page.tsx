'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.unit_price * item.qty), 0);
  const subtotal = total;
  const shipping = 0;
  const tax = total * 0.1; // 10% tax
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
            <p className="mt-6 text-gray-600 text-lg">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft p-12 lg:p-16 text-center">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-soft p-6 flex gap-6 hover-lift border border-gray-100">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images?.[0]?.image_url || 'https://via.placeholder.com/200x200'}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.product.title}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option>{item.qty}</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary-600">
                        ${(item.unit_price * item.qty).toLocaleString()}
                      </p>
                      <button className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 lg:sticky lg:top-24 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-4">
                  Proceed to Checkout
                </button>
                <Link
                  href="/"
                  className="block w-full text-center py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  Continue Shopping
                </Link>
                
                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure checkout
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                    Free shipping on orders over $50
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
