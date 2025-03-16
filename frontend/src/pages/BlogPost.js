import React, { useEffect } from "react";
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
                <p>Finding the right home tutor can make all the difference in your child's academic journey, especially with the rigorous demands of our local curriculum. The right educational support can transform a struggling student into a confident learner who excels in national examinations.</p>
                
                <h2>Understand Your Child's Specific Academic Needs</h2>
                <p>Before engaging a tutor, identify exactly where your child needs support. Is it the challenging problem sums in P5 Math? Perhaps it's the application questions in Upper Secondary Chemistry? Or maybe it's improving their composition skills for English Paper 1?</p>
                <p>Different academic challenges require different teaching approaches. A child struggling with PSLE Science might need help with concept application and answering techniques for open-ended questions, while a JC1 student might need support with the leap in difficulty from O-Level to H2 Mathematics.</p>
                
                <h2>Verify Relevant Qualifications and Track Record</h2>
                <p>Look beyond general teaching credentials. For primary levels, tutors familiar with the latest SEAB assessment objectives and PSLE scoring bands can provide targeted preparation. For secondary students, subject specialists who understand the nuances between Express, Normal (Academic), and IP streams offer more valuable guidance.</p>
                <p>Ask potential tutors about their experience with students from schools similar to your child's. A tutor who has successfully guided students from schools like Raffles Institution, Hwa Chong, or Nanyang Girls' High will have different strengths than one experienced with neighbourhood schools. Neither is inherently better—what matters is the match with your child's needs.</p>
                
                <h2>Assess Teaching Methodology</h2>
                <p>The MOE curriculum has evolved significantly in recent years, moving away from rote learning toward conceptual understanding and application. Effective tutors should demonstrate how they develop both fundamental skills and higher-order thinking.</p>
                <p>For Mathematics, ask how they approach heuristics and model drawing for problem-solving. For languages, inquire about their methods for improving comprehension and composition beyond formulaic templates. For Science, understand how they balance conceptual teaching with examination techniques for data-based questions.</p>
                
                <h2>Consider Subject-Specific Expertise</h2>
                <p>Different subjects at different levels require specialised knowledge:</p>
                <ul>
                    <li><strong>Primary Mathematics:</strong> Look for tutors who can teach model drawing, heuristics, and problem-solving strategies aligned with the latest PSLE requirements.</li>
                    <li><strong>Secondary Sciences:</strong> Chemistry, Physics, and Biology tutors should be familiar with practical assessment requirements and the latest syllabus changes from SEAB.</li>
                    <li><strong>JC subjects:</strong> H1/H2/H3 subjects require tutors with deep subject knowledge and familiarity with A-Level marking schemes.</li>
                    <li><strong>Mother Tongue:</strong> For Higher Chinese, Tamil, or Malay, tutors should understand both the oral examination format and the written component requirements.</li>
                </ul>
                
                <h2>Evaluate Communication Style and Rapport</h2>
                <p>Effective tutors can break down complex topics from the MOE syllabus into digestible parts. They should explain challenging concepts like Differentiation in Calculus or Organic Chemistry reactions in ways that resonate with your child's learning style.</p>
                <p>Beyond academic instruction, good tutors provide regular updates on progress, highlighting improvements in areas like AQ (Application Questions) responses or Mathematical problem-solving approaches. They should be able to identify when your child is struggling with specific topics like Vectors or Redox Reactions before these gaps affect overall performance.</p>
                
                <h2>Request Concrete Evidence of Results</h2>
                <p>Experienced tutors should be able to share specific examples of how they've helped students improve. Rather than vague claims, look for concrete evidence: "I helped a student move from AL6 to AL2 in PSLE Math" or "My O-Level Chemistry students improved from C5 to A2 within six months."</p>
                <p>Ask about their familiarity with school-specific requirements. Different schools set papers with different emphases—RI preliminary papers often feature challenging application questions, while schools like Dunman High might emphasise certain topic areas differently.</p>
                
                <h2>Arrange a Diagnostic Session</h2>
                <p>Before committing to regular lessons, arrange a diagnostic session where the tutor can assess your child's current level and identify specific gaps. A good tutor will quickly pinpoint whether your child struggles with Algebraic manipulation, Scientific concept application, or Comprehension inference questions.</p>
                <p>During this session, observe how the tutor builds rapport and whether they can adapt their teaching to your child's responses. Do they merely provide answers, or do they guide your child through the thinking process? The latter approach builds long-term understanding essential for examinations like the N-Levels, O-Levels, or A-Levels.</p>
                
                <h2>Consider Practical Logistics</h2>
                <p>With the demanding schedules many students face—balancing CCAs, supplementary lessons, and regular schoolwork—practical considerations matter. Evaluate whether home-based tuition would save valuable time compared to travelling to a tuition centre in places like Bishan or Jurong East.</p>
                <p>Discuss scheduling flexibility, particularly during examination periods when additional sessions before PSLE, EOYs, or prelims might be beneficial. A good tutor should be able to provide more intensive support during the crucial weeks before major examinations.</p>
                
                <h2>How The Learning Zone Matches Students with the Right Tutors</h2>
                <p>At The Learning Zone, we carefully select tutors based on their proven track record with local curricula. Many of our tutors are former MOE teachers or graduates from our top universities who have excelled in the subjects they teach.</p>
                <p>We match tutors to students based on specific academic needs, learning styles, and the particular school curriculum they follow. Our tutors are familiar with the latest syllabus requirements from SEAB and keep updated with changes to examination formats for all major national examinations.</p>
                <p>We also provide regular progress updates using concrete metrics relevant to your child's academic goals, whether that's improving PSLE foundation scores or preparing for the rigour of JC promotional examinations.</p>
                
                <p>Contact us today to find a tutor who can truly make a difference in your child's academic journey!</p>
            `
        },
        "psle-preparation-strategies": {
            title: "PSLE Preparation: Effective Strategies for Success",
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            author: "The Learning Zone Team",
            image: "/tlz2.webp",
            content: `
                <p>The Primary School Leaving Examination represents the first major academic milestone in a student's journey. With the shift to the Achievement Level (AL) scoring system and increasingly application-based questions, preparation strategies must evolve beyond mere memorisation and drilling.</p>
                
                <h2>Master the New AL Scoring System</h2>
                <p>The AL scoring system (bands from AL1 to AL8) has transformed how students should approach their preparation. Unlike the previous T-score system, each subject is now assessed independently, making consistent performance across all four subjects crucial. A single weak subject can significantly impact secondary school options.</p>
                <p>Familiarise yourself with the cut-off points for various secondary schools under the new system. Popular schools like Nanyang Girls' High School, Raffles Institution, and Methodist Girls' School typically require scores in the 6-8 range (lower is better), while the cut-off for schools like Crescent Girls' School or Catholic High School might be slightly higher.</p>
                
                <h2>Develop Subject-Specific Strategies</h2>
                
                <h3>English Language</h3>
                <p>Beyond basic grammar and vocabulary, focus on the nuanced requirements of Paper 1 (Writing) and Paper 2 (Comprehension):</p>
                <ul>
                    <li><strong>Situational Writing:</strong> Practice the various formats (email, letter, report) with attention to purpose, audience, and context.</li>
                    <li><strong>Continuous Writing:</strong> Develop strong narrative techniques and descriptive vocabulary for the four main composition types (narrative, personal recount, expository, argumentative).</li>
                    <li><strong>Comprehension:</strong> Work specifically on inference questions and vocabulary-in-context questions, which students typically find challenging.</li>
                    <li><strong>Oral Communication:</strong> Prepare for the Reading Aloud and Stimulus-based Conversation components by developing clear articulation and the ability to express personal viewpoints.</li>
                </ul>
                
                <h3>Mathematics</h3>
                <p>The PSLE Mathematics paper has evolved to include more heuristic problem-solving questions that test conceptual understanding:</p>
                <ul>
                    <li><strong>Heuristics:</strong> Master strategies like working backwards, using models, look for patterns, and making systematic lists.</li>
                    <li><strong>Model Drawing:</strong> Practice the bar model method for solving complex word problems involving ratios, fractions, and percentages.</li>
                    <li><strong>Non-routine Problems:</strong> Expose your child to challenging questions that require multiple concepts and steps to solve.</li>
                    <li><strong>Time Management:</strong> Develop strategies for the two booklets, ensuring sufficient time for the more challenging Paper 2 questions.</li>
                </ul>
                
                <h3>Science</h3>
                <p>PSLE Science tests both content knowledge and process skills, with open-ended questions forming a significant portion of the paper:</p>
                <ul>
                    <li><strong>Experimental Design:</strong> Understand fair testing and variable control in scientific investigations.</li>
                    <li><strong>Data Analysis:</strong> Practice interpreting graphs, tables, and diagrams to draw conclusions.</li>
                    <li><strong>Open-ended Responses:</strong> Master the technique of providing complete answers with scientific reasoning, particularly for "explain" and "why" questions.</li>
                    <li><strong>Key Concepts:</strong> Focus on commonly tested topics like energy conversions, forces, plant and animal systems, and materials.</li>
                </ul>
                
                <h3>Mother Tongue</h3>
                <p>Whether it's Chinese, Malay, or Tamil, effective preparation requires regular exposure and practice:</p>
                <ul>
                    <li><strong>Comprehension:</strong> Develop strategies for both literal and inferential understanding of passages.</li>
                    <li><strong>Composition:</strong> Build a bank of useful phrases and practice planning structured narratives.</li>
                    <li><strong>Oral:</strong> Improve fluency through regular reading practice and conversation in the language.</li>
                    <li><strong>Higher Mother Tongue:</strong> If applicable, prepare for the additional components and higher language demands.</li>
                </ul>
                
                <h2>Utilise Targeted Resources</h2>
                <p>Not all assessment books are created equal. Select resources that align with the current PSLE format:</p>
                <ul>
                    <li><strong>TopicalTest Papers:</strong> Use these for initial mastery of individual topics before attempting full papers.</li>
                    <li><strong>Preliminary Papers:</strong> Papers from schools known for their rigorous standards (like Nanyang Primary, Rosyth School, or Catholic High Primary) provide excellent practice.</li>
                    <li><strong>SEAB Sample Papers:</strong> These official resources give insight into the expected standard and question types.</li>
                    <li><strong>Digital Resources:</strong> Platforms like Student Learning Space (SLS) and approved educational websites offer interactive practice aligned with the latest syllabus.</li>
                </ul>
                
                <h2>Implement Strategic Practice</h2>
                <p>Quality trumps quantity when it comes to examination preparation:</p>
                <ul>
                    <li><strong>Timed Practice:</strong> Gradually introduce time constraints to build examination stamina and pace management.</li>
                    <li><strong>Error Analysis:</strong> Maintain an error log to identify pattern mistakes and conceptual misunderstandings.</li>
                    <li><strong>Spaced Repetition:</strong> Revisit challenging topics at increasing intervals to strengthen long-term retention.</li>
                    <li><strong>Mock Examinations:</strong> Simulate full examination conditions, including all papers and time constraints, at least a month before the actual PSLE.</li>
                </ul>
                
                <h2>Manage Examination Anxiety</h2>
                <p>The pressure surrounding PSLE can affect even well-prepared students:</p>
                <ul>
                    <li><strong>Develop Routines:</strong> Establish consistent study and rest patterns that can be maintained through the examination period.</li>
                    <li><strong>Teach Calming Techniques:</strong> Simple breathing exercises and positive self-talk can help manage in-the-moment anxiety.</li>
                    <li><strong>Maintain Perspective:</strong> Remind your child that while PSLE is important, it's just one of many assessments in their academic journey.</li>
                    <li><strong>Practice Paper Navigation:</strong> Teach strategies like attempting easier questions first and managing time per mark to build confidence during the actual examination.</li>
                </ul>
                
                <h2>How The Learning Zone Supports PSLE Preparation</h2>
                <p>Our PSLE preparation programme addresses both content mastery and examination techniques:</p>
                <ul>
                    <li><strong>Diagnostic Assessment:</strong> We identify specific areas for improvement across all four subjects.</li>
                    <li><strong>Customised Learning Plans:</strong> Our tutors develop targeted strategies based on your child's learning profile and current achievement levels.</li>
                    <li><strong>Examination Techniques:</strong> We teach specific approaches for different question types, from model drawing in Mathematics to structured responses in Science.</li>
                    <li><strong>Regular Mock Assessments:</strong> We provide realistic practice with detailed feedback to track progress and refine examination strategies.</li>
                </ul>
                
                <p>Contact us to learn how we can help your child achieve their best possible PSLE results and secure a place in their preferred secondary school!</p>
            `
        },
        "ib-vs-a-levels": {
            title: "IB vs A-Levels: Which Curriculum is Right for Your Child?",
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
            author: "The Learning Zone Team",
            image: "/tlz3.webp",
            content: `
                <p>Choosing between the International Baccalaureate Diploma Programme (IBDP) and Cambridge GCE A-Levels represents a significant decision that shapes not only the next two years of education but potentially university pathways and beyond. Each curriculum offers distinct advantages that may align differently with your child's learning style, academic strengths, and future aspirations.</p>
                
                <h2>Curriculum Structure and Subject Selection</h2>
                
                <h3>A-Levels</h3>
                <p>The A-Level curriculum typically involves selecting three or four subjects to study in depth over two years. Students at institutions like Raffles Institution, Hwa Chong Institution, or Victoria Junior College usually take:</p>
                <ul>
                    <li>Three H2 subjects (major subjects with greater depth and breadth)</li>
                    <li>One H1 subject (typically General Paper)</li>
                    <li>Project Work (completed in JC1)</li>
                    <li>Mother Tongue (if requirements haven't been fulfilled at O-Levels)</li>
                </ul>
                <p>Popular subject combinations include PCME (Physics, Chemistry, Mathematics, Economics), BCME (Biology, Chemistry, Mathematics, Economics), or arts-focused combinations with subjects like Literature, History, and Economics.</p>
                
                <h3>IB Diploma</h3>
                <p>The IBDP, offered at schools like Anglo-Chinese School (Independent), St. Joseph's Institution, and School of the Arts, requires students to study six subjects from different subject groups:</p>
                <ul>
                    <li>Three subjects at Higher Level (HL)</li>
                    <li>Three subjects at Standard Level (SL)</li>
                    <li>Theory of Knowledge (TOK) course</li>
                    <li>Extended Essay (EE) - a 4,000-word research paper</li>
                    <li>Creativity, Activity, Service (CAS) - extracurricular programme</li>
                </ul>
                <p>This structure ensures breadth across languages, humanities, sciences, mathematics, and arts, while still allowing some specialisation through HL subjects.</p>
                
                <h2>Assessment Approaches</h2>
                
                <h3>A-Levels</h3>
                <p>The A-Level assessment model is predominantly examination-based:</p>
                <ul>
                    <li><strong>Examination Focus:</strong> Most subjects are assessed through final examinations at the end of JC2, with some having practical components or coursework.</li>
                    <li><strong>Grading System:</strong> Results are reported on an A to E scale, with distinctions possible in H1 General Paper and H3 subjects.</li>
                    <li><strong>University Admission Points:</strong> Calculated using the University Admission Score (UAS) system, which converts grades to points (A=10 points for H2, A=5 points for H1).</li>
                    <li><strong>Examination Periods:</strong> Major examinations occur in October/November, with preliminary examinations typically held in August/September.</li>
                </ul>
                
                <h3>IB Diploma</h3>
                <p>The IBDP uses a more balanced assessment approach:</p>
                <ul>
                    <li><strong>Internal Assessments:</strong> 20-30% of the final grade comes from coursework assessed by teachers and moderated externally.</li>
                    <li><strong>External Examinations:</strong> 70-80% comes from final examinations held in May or November.</li>
                    <li><strong>Grading System:</strong> Each subject is graded from 1-7, with additional points (up to 3) awarded for TOK and EE performance.</li>
                    <li><strong>Total Score:</strong> Maximum of 45 points (42 from six subjects plus 3 bonus points).</li>
                    <li><strong>Continuous Assessment:</strong> Work is assessed throughout the two-year programme, not just in final examinations.</li>
                </ul>
                
                <h2>Teaching and Learning Approaches</h2>
                
                <h3>A-Levels</h3>
                <p>The A-Level curriculum tends to emphasise:</p>
                <ul>
                    <li><strong>Subject Specialisation:</strong> Deep knowledge within chosen disciplines.</li>
                    <li><strong>Analytical Thinking:</strong> Developing critical analysis within subject boundaries.</li>
                    <li><strong>Examination Techniques:</strong> Mastering specific question types and formats.</li>
                    <li><strong>Content Mastery:</strong> Thorough understanding of prescribed syllabus content.</li>
                </ul>
                <p>Teaching methods in JCs often include lecture-tutorial systems, with content delivery in larger groups followed by smaller tutorial discussions. Independent study is expected but within clearly defined syllabus parameters.</p>
                
                <h3>IB Diploma</h3>
                <p>The IBDP emphasises:</p>
                <ul>
                    <li><strong>Interdisciplinary Connections:</strong> Making links between different subject areas.</li>
                    <li><strong>Research Skills:</strong> Developed through the Extended Essay and internal assessments.</li>
                    <li><strong>Critical Thinking:</strong> Encouraged through Theory of Knowledge.</li>
                    <li><strong>Global Perspective:</strong> International mindedness is embedded throughout the curriculum.</li>
                    <li><strong>Balanced Development:</strong> Academic, physical, and social growth through CAS.</li>
                </ul>
                <p>Teaching approaches tend to be more discussion-based, with an emphasis on inquiry and student-led learning. Classes are typically smaller, allowing for more personalised attention.</p>
                
                <h2>University Recognition and Pathways</h2>
                
                <h3>A-Levels</h3>
                <p>A-Levels have particular advantages for:</p>
                <ul>
                    <li><strong>Local Universities:</strong> NUS, NTU, and SMU are very familiar with the A-Level system and have clear cut-off points for different courses.</li>
                    <li><strong>UK Universities:</strong> The British university system is designed around A-Level qualifications, with specific grade requirements for different courses.</li>
                    <li><strong>Specialised Courses:</strong> Medicine, Law, and Engineering at prestigious universities often have specific subject requirements that align well with A-Level specialisation.</li>
                    <li><strong>Scholarship Applications:</strong> Many local scholarships have traditionally been geared toward A-Level graduates.</li>
                </ul>
                
                <h3>IB Diploma</h3>
                <p>The IB Diploma offers advantages for:</p>
                <ul>
                    <li><strong>International Universities:</strong> Widely recognised across North America, Europe, Australia, and beyond.</li>
                    <li><strong>Liberal Arts Colleges:</strong> The breadth of the IB curriculum aligns well with the philosophy of liberal arts education.</li>
                    <li><strong>Competitive US Universities:</strong> The holistic nature of the IB programme is valued by selective institutions like Ivy League schools.</li>
                    <li><strong>Research-Focused Programmes:</strong> The research skills developed through the Extended Essay transfer well to university-level research.</li>
                </ul>
                <p>Both qualifications are accepted by all local universities, with conversion tables to equate IB scores to A-Level points for admission purposes.</p>
                
                <h2>Student Suitability Factors</h2>
                
                <h3>A-Levels May Suit Students Who:</h3>
                <ul>
                    <li>Have clear strengths in specific subject areas</li>
                    <li>Perform well under examination conditions</li>
                    <li>Prefer depth over breadth in their studies</li>
                    <li>Have definite career paths in mind that require specific subject expertise</li>
                    <li>Thrive in structured learning environments with clear expectations</li>
                    <li>Are targeting competitive courses at local universities or UK institutions</li>
                </ul>
                
                <h3>IB Diploma May Suit Students Who:</h3>
                <ul>
                    <li>Have balanced abilities across different subject areas</li>
                    <li>Enjoy research and independent learning</li>
                    <li>Prefer continuous assessment over high-stakes examinations</li>
                    <li>Are interested in making connections between different disciplines</li>
                    <li>Value developing a global perspective</li>
                    <li>Are considering international university options</li>
                    <li>Enjoy participating in extracurricular activities as part of their educational experience</li>
                </ul>
                
                <h2>How The Learning Zone Supports Both Pathways</h2>
                <p>Our tutors have extensive experience with both curricula and can provide:</p>
                <ul>
                    <li><strong>Subject Expertise:</strong> Specialised tutoring for A-Level H1/H2 subjects and IB HL/SL courses.</li>
                    <li><strong>Examination Preparation:</strong> Targeted strategies for both assessment systems.</li>
                    <li><strong>Extended Essay and Project Work Support:</strong> Guidance on research methodologies and academic writing.</li>
                    <li><strong>University Application Advice:</strong> Help with personal statements, interviews, and course selection.</li>
                    <li><strong>Curriculum Transition Support:</strong> Assistance for students moving from O-Levels or IGCSE to either A-Levels or IB.</li>
                </ul>
                
                <p>Contact us to discuss how we can support your child's pre-university education, whether they choose the A-Level or IB pathway!</p>
            `
        }
    };

    // Get the post based on the slug
    const post = blogPosts[slug];
    
    // Add this useEffect to handle cases where the page is refreshed
    useEffect(() => {
        // If the post doesn't exist and we're not in the process of navigating
        if (!post && slug) {
            console.log(`Post with slug "${slug}" not found`);
        }
    }, [post, slug]);
    
    // If post not found, show a 404 message
    if (!post) {
        return (
            <div className="blog-post-container">
                <button className="back-button" onClick={handleBackClick}>
                    ← Back to Blog
                </button>
                <div className="blog-post-not-found">
                    <h1>404 - Blog Post Not Found</h1>
                    <p>Sorry, the blog post you're looking for doesn't exist.</p>
                    <Link to="/blog" className="back-to-blog-button">Back to Blog</Link>
                </div>
            </div>
        );
    }

    // Function to render automatic rings in the background
    const renderAutomaticRings = () => {
        const ringCount = 5;
        return Array.from({ length: ringCount }, (_, index) => (
            <div key={index} className="automatic-ring" style={{ animationDelay: `${index * 0.5}s` }}></div>
        ));
    };

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