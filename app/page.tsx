import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';

async function getHomeData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/home`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      categories: [
        { id: 1, name: "Electronics", slug: "electronics" },
        { id: 2, name: "Fashion", slug: "fashion" },
        { id: 3, name: "Home", slug: "home" },
      ],
      featuredProducts: [
        {
          id: 101,
          slug: "wireless-earbuds",
          title: "Wireless Earbuds Bluetooth 5.3",
          price: 2999,
          sale_price: 2499,
          rating_avg: 4.4,
          sold_count: 1200,
          images: [{ image_url: "https://via.placeholder.com/600x600?text=Earbuds" }],
        },
        {
          id: 102,
          slug: "smart-watch",
          title: "Smart Watch Series Pro (Fitness + Calls)",
          price: 4999,
          sale_price: 3999,
          rating_avg: 4.2,
          sold_count: 860,
          images: [{ image_url: "https://via.placeholder.com/600x600?text=Watch" }],
        },
      ],
    };
  }
}

export default async function Home() {
  let data;
  try {
    data = await getHomeData();
  } catch (error) {
    console.error('Error in Home component:', error);
    data = {
      categories: [],
      featuredProducts: [],
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="container mx-auto px-4 lg:px-6 py-20 lg:py-32 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Discover Amazing Products
                <span className="block text-gray-100 mt-2">From Trusted Vendors</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed">
                Shop the latest trends and best deals from multiple vendors all in one place. 
                Quality products, competitive prices, fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#featured"
                  className="px-8 py-4 bg-white text-primary-700 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Now
                </a>
                <a
                  href="#categories"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary-700 transition-all"
                >
                  Browse Categories
                </a>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full -mr-48 -mt-48 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400 rounded-full -ml-36 -mb-36 opacity-30"></div>
        </section>

        {/* Categories Section */}
        {data?.categories && data.categories.length > 0 ? (
          <section id="categories" className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore our wide range of product categories and find exactly what you're looking for
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {data.categories.map((category: any) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </section>
        )}

        {/* Featured Products Section */}
        {data?.featuredProducts && data.featuredProducts.length > 0 ? (
          <section id="featured" className="py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Handpicked products from our top vendors. Quality guaranteed.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {data.featuredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-600">Loading products...</p>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">All products are verified for quality and authenticity</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">Your transactions are safe and encrypted</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MultiVendor</h3>
              <p className="text-gray-400">
                Your trusted multi-vendor marketplace for quality products and great deals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home & Living</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MultiVendor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
