import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/shopify';
import { ArrowRight } from 'lucide-react';
import { Preloader } from '../components/ui/Preloader';
import { SEO } from '../components/ui/SEO';

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const data = await getArticles();
      setPosts(data || []);
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  if (isLoading) return <Preloader />;

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const listPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left">
      <SEO 
        title="Journal" 
        description="Read the latest thoughts, essays, and stories from the Boho Vana journal."
      />
      {/* Page Header */}
      <div className="mb-12 space-y-2 border-b border-charcoal/5 pb-6">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          The Journal
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
          Editorial Stories & Care
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sticky Column: Featured Post */}
        {featuredPost ? (
          <article className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <Link to={`/blog/${featuredPost.handle}`} className="block overflow-hidden rounded-[8px] aspect-[4/3] bg-natural-linen/30">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
              />
            </Link>
            <div className="space-y-2">
              <div className="flex gap-4 font-sans text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">
                <span>{featuredPost.publishedAt}</span>
                <span>•</span>
                <span>{featuredPost.author}</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal leading-tight hover:text-deep-olive transition-colors">
                <Link to={`/blog/${featuredPost.handle}`}>{featuredPost.title}</Link>
              </h2>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="pt-2">
                <Link
                  to={`/blog/${featuredPost.handle}`}
                  className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal flex items-center gap-1 hover:text-deep-olive transition-colors"
                >
                  Read Story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="lg:col-span-12 py-24 text-center">
            <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase">
              No stories published yet.
            </p>
          </div>
        )}

        {/* Right Column: Other Posts List */}
        {featuredPost && (
          <main className="lg:col-span-7 space-y-12">
            {listPosts.length === 0 ? (
              <div className="py-24 text-center lg:text-left">
                <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase">
                  More stories coming soon.
                </p>
              </div>
            ) : (
              listPosts.map((post) => (
                <article key={post.id} className="grid grid-cols-1 sm:grid-cols-12 gap-6 border-b border-charcoal/5 pb-12">
                  <div className="sm:col-span-4 aspect-[4/3] rounded-[6px] overflow-hidden bg-natural-linen/30">
                    <Link to={`/blog/${post.handle}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      />
                    </Link>
                  </div>
                  <div className="sm:col-span-8 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="flex gap-3 font-sans text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">
                        <span>{post.publishedAt}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-charcoal hover:text-deep-olive transition-colors leading-tight">
                        <Link to={`/blog/${post.handle}`}>{post.title}</Link>
                      </h3>
                      <p className="font-sans text-xs text-charcoal/60 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 sm:pt-0">
                      <Link
                        to={`/blog/${post.handle}`}
                        className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal flex items-center gap-1 hover:text-deep-olive transition-colors"
                      >
                        Read Story <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </main>
        )}
      </div>
    </div>
  );
};
