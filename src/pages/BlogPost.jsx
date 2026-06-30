import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleByHandle, getArticles } from '../services/shopify';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Preloader } from '../components/ui/Preloader';
import { SEO } from '../components/ui/SEO';

export const BlogPost = () => {
  const { handle } = useParams();
  const [post, setPost] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      const article = await getArticleByHandle(handle);
      if (article) {
        setPost(article);
        // Fetch recent articles for recommendations
        const allArticles = await getArticles();
        const recs = allArticles.filter(p => p.id !== article.id).slice(0, 2);
        setRecommended(recs);
      } else {
        setPost(null);
      }
      setIsLoading(false);
    };
    fetchPostData();
    window.scrollTo(0, 0);
  }, [handle]);

  if (isLoading) return <Preloader />;

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="font-serif text-3xl font-medium text-charcoal mb-4">Story Not Found</h1>
        <Link to="/blog" className="text-sm tracking-widest uppercase font-bold text-charcoal underline hover:text-forest-green transition-colors">
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-16 text-left">
      <SEO 
        title={post.title} 
        description={post.excerpt || `Read ${post.title} on Boho Vana Journal`}
        image={post.image}
        type="article"
      />
      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 mb-12">
        <div className="flex justify-center gap-4 font-sans text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] max-w-3xl mx-auto">
          {post.title}
        </h1>
        <p className="font-sans text-sm md:text-base text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Hero Image */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-16">
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-[8px] overflow-hidden bg-natural-linen/30">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div 
          className="prose prose-stone prose-headings:font-serif prose-headings:font-medium prose-p:font-sans prose-p:leading-relaxed prose-p:text-charcoal/80 prose-a:text-forest-green prose-blockquote:border-forest-green prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:text-deep-olive prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 flex justify-between items-center">
          <Link to="/blog" className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal flex items-center gap-2 hover:text-deep-olive transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Journal
          </Link>
          <div className="flex gap-4">
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Share</span>
            <button className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal hover:text-forest-green transition-colors">PIN</button>
            <button className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal hover:text-forest-green transition-colors">FB</button>
          </div>
        </div>
      </div>

      {/* Recommended Reading */}
      {recommended.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
          <h3 className="font-serif text-2xl font-medium text-charcoal mb-8 border-b border-charcoal/5 pb-4">
            Further Reading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommended.map((rec) => (
              <article key={rec.id} className="group cursor-pointer block">
                <Link to={`/blog/${rec.handle}`}>
                  <div className="aspect-[4/3] rounded-[6px] overflow-hidden bg-natural-linen/30 mb-4">
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="font-sans text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">
                      {rec.publishedAt}
                    </div>
                    <h4 className="font-serif text-xl font-semibold text-charcoal group-hover:text-deep-olive transition-colors leading-tight">
                      {rec.title}
                    </h4>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
