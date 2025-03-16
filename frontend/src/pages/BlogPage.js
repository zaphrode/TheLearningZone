import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
            image: "/blog-images/choosing-tutor.jpg"
        },
        { 
            id: 2,
            title: "PSLE Preparation: Effective Strategies for Success", 
            slug: "psle-preparation-strategies", 
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            excerpt: "PSLE is a crucial milestone in your child's education. Discover proven strategies to help them prepare effectively and manage exam stress.",
            image: "/blog-images/psle-prep.jpg"
        },
        { 
            id: 3,
            title: "IB vs A-Levels: Which Curriculum is Right for Your Child?", 
            slug: "ib-vs-a-levels", 
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
            excerpt: "Comparing the International Baccalaureate and A-Levels programs to help you make an informed decision about your child's educational path.",
            image: "/blog-images/curriculum-choice.jpg"
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
                <img src={`${process.env.PUBLIC_URL}/TLZ.jpeg`} alt="The Learning Zone Logo" className="logo" />
                <h1 className="blog-title">The Learning Zone Blogs</h1>
                <p className="blog-subtitle">Expert insights, study tips, and guidance to help students excel in Singapore</p>
            </div>
            
            <div className="blog-posts-container">
                {blogPosts.map((post) => (
                    <div className="blog-post-card" key={post.id}>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogPage; 