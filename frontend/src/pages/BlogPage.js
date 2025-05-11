import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import "./BlogPage.css";

function BlogPage() {
    const navigate = useNavigate();
    
    // Function to navigate back to the homepage
    const handleBackClick = () => {
        navigate("/home");
    };
    
    // Function to format dates nicely
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Sample blog posts with actual date objects
    const blogPosts = [
        { 
            id: 1,
            title: "How to Choose the Best Home Tutor in Singapore", 
            slug: "best-home-tutor", 
            date: new Date(), // Current date (today)
            excerpt: "Finding the right tutor can make all the difference in your child's academic journey. Learn what qualities to look for and questions to ask.",
            image: "/tlz1.webp"
        },
        { 
            id: 2,
            title: "PSLE Preparation: Effective Strategies for Success", 
            slug: "psle-preparation-strategies", 
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            excerpt: "PSLE is a crucial milestone in your child's education. Discover proven strategies to help them prepare effectively and manage exam stress.",
            image: "/tlz2.webp"
        },
        { 
            id: 3,
            title: "IB vs A-Levels: Which Curriculum is Right for Your Child?", 
            slug: "ib-vs-a-levels", 
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
            excerpt: "Comparing the International Baccalaureate and A-Levels programmes to help you make an informed decision about your child's educational path.",
            image: "/tlz3.webp"
        },
    ];

    // Function to render automatic rings in the background
    const renderAutomaticRings = () => {
        const ringCount = 5;
        return Array.from({ length: ringCount }, (_, index) => (
            <div key={index} className="automatic-ring" style={{ animationDelay: `${index * 0.5}s` }}></div>
        ));
    };

    return (
        <div className="blog-page">
            <Helmet>
                <title>Singapore Home Tuition Blog | Private Tutors | The Learning Zone</title>
                <meta name="description" content="Explore The Learning Zone's blog for expert insights on 1-1 private home tuition in Singapore, finding the best home tutors, and educational strategies for academic success." />
                <meta name="keywords" content="1-1 home tuition Singapore, private tuition Singapore, private tutors Singapore, home tutors Singapore, PSLE preparation, O-Level tuition, A-Level tuition" />
                <link rel="canonical" href="https://the-learning-zone.vercel.app/blog" />
                {/* Open Graph / Social Media */}
                <meta property="og:title" content="Singapore Home Tuition Blog | Private Tutors | The Learning Zone" />
                <meta property="og:description" content="Explore our blog for expert insights on 1-1 private home tuition in Singapore, finding the best home tutors, and educational strategies." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://the-learning-zone.vercel.app/blog" />
                <meta property="og:image" content="https://the-learning-zone.vercel.app/TLZ.jpeg" />
                {/* Structured Data */}
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "headline": "Singapore Home Tuition Blog | The Learning Zone",
                        "description": "Expert insights on 1-1 private home tuition in Singapore, finding the best home tutors, and educational strategies for academic success.",
                        "keywords": "1-1 home tuition Singapore, private tuition Singapore, private tutors Singapore, home tutors Singapore",
                        "publisher": {
                            "@type": "Organization",
                            "name": "The Learning Zone",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://the-learning-zone.vercel.app/TLZ.jpeg"
                            }
                        },
                        "url": "https://the-learning-zone.vercel.app/blog",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://the-learning-zone.vercel.app/blog"
                        }
                    }
                `}</script>
            </Helmet>
            
            {/* Back Button */}
            <button className="back-button" onClick={handleBackClick}>
                ← Back
            </button>
            
            {/* Automatic concentric rings */}
            <div className="automatic-rings">{renderAutomaticRings()}</div>
            
            {/* WhatsApp Button */}
            <div className="whatsapp-container">
                <img 
                    src="/whatsapp-logo2.png" 
                    alt="WhatsApp" 
                    className="whatsapp-logo" 
                    onClick={() => window.open("https://wa.me/6591684367", "_blank")}
                />
                <div 
                    className="contact-agent"
                    onClick={() => window.open("https://wa.me/6591684367", "_blank")}
                >
                    Click here to contact an agent!
                </div>
            </div>
            
            <div className="blog-header">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <img src={`${process.env.PUBLIC_URL}/TLZ.jpeg`} alt="The Learning Zone Logo" className="logo" />
                </Link>
                <h1 className="blog-title">The Learning Zone: Singapore's Home Tuition Blog</h1>
                <p className="blog-subtitle">Expert insights, study tips, and guidance from Singapore's leading private tutors</p>
            </div>
            
            <div className="blog-posts-container">
                {blogPosts.map((post) => (
                    <article className="blog-post-card" key={post.id}>
                        {post.image && (
                            <div className="blog-post-image">
                                <img src={post.image} alt={post.title} />
                            </div>
                        )}
                        <div className="blog-post-content">
                            <Link to={`/blog/${post.slug}`} className="blog-post-link">
                                <h2 className="blog-post-title">{post.title}</h2>
                            </Link>
                            <p className="blog-post-date">Published on {formatDate(post.date)}</p>
                            <p className="blog-post-excerpt">{post.excerpt}</p>
                            <Link to={`/blog/${post.slug}`} className="read-more-button">
                                Read More →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default BlogPage; 