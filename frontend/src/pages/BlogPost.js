import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BlogPost.css";

function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    // Function to navigate back to the blog page
    const handleBackClick = () => {
        navigate("/blog");
    };
    
    // Function to format dates nicely
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Sample blog post content with actual date objects
    const blogPosts = {
        "best-home-tutor": {
            title: "How to Choose the Best Home Tutor in Singapore",
            date: new Date(), // Current date (today)
            author: "The Learning Zone Team",
            image: "/tlz1.webp",
            content: `
                <p>Finding the right home tutor for your child is crucial for their academic success. With so many options available in Singapore, how do you make the best choice?</p>
                
                <h2>Understand Your Child's Needs</h2>
                <p>Before beginning your search, assess what your child specifically needs help with. Is it a particular subject? Do they need help with exam preparation? Understanding these needs will help you find a tutor with the right expertise.</p>
                
                <h2>Check Qualifications and Experience</h2>
                <p>Look for tutors with relevant qualifications and experience teaching the specific subjects your child needs help with. Experienced tutors will have developed effective teaching methods and understand common challenges students face.</p>
                
                <h2>Consider Teaching Style</h2>
                <p>Every child learns differently. Some respond better to structured approaches, while others thrive with creative teaching methods. Discuss teaching styles with potential tutors to ensure they can adapt to your child's learning preferences.</p>
                
                <h2>Evaluate Communication Skills</h2>
                <p>A good tutor should be able to explain complex concepts in simple terms. They should also communicate regularly with you about your child's progress and areas that need improvement.</p>
                
                <h2>Ask for References</h2>
                <p>Don't hesitate to ask for references from parents of other students the tutor has taught. This can provide valuable insights into their teaching effectiveness and reliability.</p>
                
                <h2>Trial Lessons</h2>
                <p>Consider arranging a trial lesson to see how your child responds to the tutor. This gives you an opportunity to assess the tutor's teaching style and your child's comfort level before making a longer-term commitment.</p>
                
                <h2>How The Learning Zone Can Help</h2>
                <p>At The Learning Zone, we carefully vet all our tutors to ensure they meet our high standards for qualifications, experience, and teaching ability. We match tutors to students based on specific needs, learning styles, and personalities to create the most effective learning partnership.</p>
                
                <p>Contact us today to find the perfect tutor for your child!</p>
            `
        },
        "psle-preparation-strategies": {
            title: "PSLE Preparation: Effective Strategies for Success",
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            author: "The Learning Zone Team",
            image: "/tlz2.webp",
            content: `
                <p>The Primary School Leaving Examination (PSLE) is a significant milestone in your child's educational journey. Here are proven strategies to help them prepare effectively and manage exam stress.</p>
                
                <h2>Start Early</h2>
                <p>Begin preparation well in advance to allow sufficient time for thorough understanding of concepts and plenty of practice. Last-minute cramming is rarely effective and increases stress.</p>
                
                <h2>Create a Structured Study Plan</h2>
                <p>Develop a realistic study schedule that covers all subjects and topics. Break down the syllabus into manageable chunks and allocate time for revision and practice papers.</p>
                
                <h2>Focus on Understanding, Not Memorisation</h2>
                <p>Encourage your child to understand concepts rather than memorise facts. This deeper understanding will help them apply knowledge to different types of questions.</p>
                
                <h2>Practise Past Papers</h2>
                <p>Regularly practising past PSLE papers helps familiarise your child with the exam format and types of questions. It also builds time management skills and confidence.</p>
                
                <h2>Identify and Address Weak Areas</h2>
                <p>Regularly assess your child's progress to identify areas that need more attention. Dedicate extra time to these subjects or topics.</p>
                
                <h2>Ensure Balanced Lifestyle</h2>
                <p>Maintain a balance between study and relaxation. Ensure your child gets enough sleep, regular exercise, and healthy meals to support optimal brain function.</p>
                
                <h2>Manage Exam Anxiety</h2>
                <p>Teach your child stress management techniques such as deep breathing, positive visualisation, and mindfulness. Remind them that their worth is not determined by exam results.</p>
                
                <h2>How The Learning Zone Can Support PSLE Preparation</h2>
                <p>Our experienced PSLE tutors provide targeted support for all subjects. They help students master key concepts, develop effective exam strategies, and build confidence. Contact us to learn how we can help your child achieve their best in the PSLE!</p>
            `
        },
        "ib-vs-a-levels": {
            title: "IB vs A-Levels: Which Curriculum is Right for Your Child?",
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
            author: "The Learning Zone Team",
            image: "/tlz3.webp",
            content: `
                <p>Choosing between the International Baccalaureate (IB) and A-Levels is a significant decision that can impact your child's educational journey and university options. Let's compare these two popular curricula to help you make an informed choice.</p>
                
                <h2>Curriculum Structure</h2>
                <p><strong>IB:</strong> The IB Diploma Programme requires students to study six subjects from different subject groups, complete the Theory of Knowledge course, write an Extended Essay, and participate in Creativity, Activity, Service (CAS).</p>
                <p><strong>A-Levels:</strong> Students typically select three or four subjects to study in depth, allowing for greater specialisation in areas of interest or strength.</p>
                
                <h2>Assessment Approach</h2>
                <p><strong>IB:</strong> Uses a combination of internal assessments (coursework, oral examinations, etc.) and final examinations. The assessment is more continuous throughout the two years.</p>
                <p><strong>A-Levels:</strong> Primarily assessed through final examinations at the end of the two-year course, though some subjects include coursework components.</p>
                
                <h2>Teaching Philosophy</h2>
                <p><strong>IB:</strong> Emphasises critical thinking, research skills, and making connections between subjects. It aims to develop well-rounded individuals with a global perspective.</p>
                <p><strong>A-Levels:</strong> Focuses on in-depth knowledge and analytical skills within specific subject areas, preparing students for specialised university courses.</p>
                
                <h2>Workload and Time Management</h2>
                <p><strong>IB:</strong> Generally considered more demanding due to its breadth of requirements. Students need excellent time management skills to balance the various components.</p>
                <p><strong>A-Levels:</strong> More focused workload, but still requires significant independent study and depth of understanding.</p>
                
                <h2>University Recognition</h2>
                <p>Both qualifications are widely recognised by universities worldwide. The IB may offer broader options internationally, while A-Levels are particularly well-regarded by UK universities.</p>
                
                <h2>Which is Right for Your Child?</h2>
                <p>Consider your child's:</p>
                <ul>
                    <li>Learning style and preferences</li>
                    <li>Academic strengths and interests</li>
                    <li>Future university and career plans</li>
                    <li>Time management abilities</li>
                    <li>Need for breadth vs. depth in education</li>
                </ul>
                
                <h2>How The Learning Zone Can Help</h2>
                <p>Our tutors are experienced in both IB and A-Level curricula and can provide guidance and support regardless of which path your child chooses. We offer specialised tutoring to help students excel in either curriculum. Contact us to discuss your child's specific needs!</p>
            `
        }
    };

    const post = blogPosts[slug];

    // Function to render automatic rings in the background
    const renderAutomaticRings = () => {
        const ringCount = 5;
        return Array.from({ length: ringCount }, (_, index) => (
            <div key={index} className="automatic-ring" style={{ animationDelay: `${index * 0.5}s` }}></div>
        ));
    };

    if (!post) {
        return (
            <div className="blog-post-not-found">
                <h1>404 - Blog Post Not Found</h1>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <Link to="/blog" className="back-to-blog-button">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            {/* Back Button */}
            <button className="back-button" onClick={handleBackClick}>
                ← Back to Blog
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
            
            <div className="blog-post-container">
                <h1 className="blog-post-title">{post.title}</h1>
                <div className="blog-post-meta">
                    <span className="blog-post-date">Published on {formatDate(post.date)}</span>
                    <span className="blog-post-author">by {post.author}</span>
                </div>
                
                {post.image && (
                    <div className="blog-post-feature-image">
                        <img src={post.image} alt={post.title} />
                    </div>
                )}
                
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                
                <div className="blog-post-cta">
                    <h3>Need help with your child's education?</h3>
                    <p>Our experienced tutors are ready to provide personalized support.</p>
                    <button 
                        className="contact-button"
                        onClick={() => window.open("https://wa.me/6591684367", "_blank")}
                    >
                        Contact Us on WhatsApp 📲
                    </button>
                </div>
                
                <div className="blog-navigation">
                    <Link to="/blog" className="back-to-blog-button">← Back to All Articles</Link>
                </div>
            </div>
        </div>
    );
}

export default BlogPost; 