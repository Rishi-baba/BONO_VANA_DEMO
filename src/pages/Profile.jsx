import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { Preloader } from '../components/ui/Preloader';
import { LogOut } from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const Profile = () => {
  const { customer, isLoading, logout } = useCustomer();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !customer) {
      navigate('/login');
    }
  }, [customer, isLoading, navigate]);

  if (isLoading || !customer) return <Preloader />;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const orders = customer.orders?.edges?.map(edge => edge.node) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-24">
      <SEO 
        title="My Account" 
        description="View your order history and account details."
      />
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-charcoal/10 pb-8 mb-12 gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal mb-2">
            My Account
          </h1>
          <p className="font-sans text-sm text-charcoal/60">
            Welcome back, {customer.firstName || 'User'}
          </p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/60 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Account Details Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-natural-linen/20 p-8 rounded-[8px]">
            <h3 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-6 pb-4 border-b border-charcoal/10">
              Account Details
            </h3>
            <div className="space-y-4 font-sans text-sm text-charcoal/80">
              <div>
                <p className="font-bold text-charcoal mb-1">Name</p>
                <p>{customer.firstName} {customer.lastName}</p>
              </div>
              <div>
                <p className="font-bold text-charcoal mb-1">Email</p>
                <p>{customer.email}</p>
              </div>
              {customer.phone && (
                <div>
                  <p className="font-bold text-charcoal mb-1">Phone</p>
                  <p>{customer.phone}</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Order History */}
        <main className="lg:col-span-8">
          <h3 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal mb-8">
            Order History
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-natural-linen/10 rounded-[8px] border border-charcoal/5">
              <p className="font-sans text-sm text-charcoal/60 mb-6">You haven't placed any orders yet.</p>
              <Link to="/shop" className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal border-b border-charcoal pb-1 hover:text-forest-green hover:border-forest-green transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-charcoal/10 rounded-[8px] p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-charcoal/5">
                    <div>
                      <h4 className="font-sans font-bold text-charcoal mb-1">
                        Order #{order.orderNumber}
                      </h4>
                      <p className="font-sans text-xs text-charcoal/60">
                        {new Date(order.processedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-serif text-lg text-charcoal mb-1">
                        ₹{parseFloat(order.totalPrice.amount).toFixed(2)}
                      </p>
                      <span className="inline-block bg-natural-linen/50 text-charcoal text-[9px] tracking-widest uppercase font-bold px-2 py-1 rounded">
                        {order.fulfillmentStatus || 'Unfulfilled'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.lineItems.edges.map(({ node }, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-natural-linen/30 rounded overflow-hidden flex-shrink-0">
                          {node.variant?.image ? (
                            <img src={node.variant.image.url} alt={node.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-charcoal/5"></div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-sans text-sm font-medium text-charcoal">{node.title}</p>
                          <p className="font-sans text-xs text-charcoal/60">Qty: {node.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
