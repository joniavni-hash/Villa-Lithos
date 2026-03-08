import Link from "next/link";

export default function NotFound() {
    return (
          <section
                  className="not-found-page"
                  style={{
                            minHeight: "70vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "4rem 1.5rem",
                            backgroundColor: "var(--outer, #F7F6F4)",
                  }}
                >
                <div style={{ maxWidth: "540px" }}>
                  {/* Big 404 number */}
                        <p
                                    style={{
                                                  fontFamily: "var(--font-serif, 'DM Serif Display', serif)",
                                                  fontSize: "7rem",
                                                  lineHeight: 1,
                                                  color: "var(--accent, #8B9A7D)",
                                                  margin: "0 0 0.5rem",
                                                  fontWeight: 400,
                                    }}
                                  >
                                  404
                        </p>p>
                
                  {/* Heading */}
                        <h1
                                    style={{
                                                  fontFamily: "var(--font-serif, 'DM Serif Display', serif)",
                                                  fontSize: "1.75rem",
                                                  color: "var(--text, #1A2332)",
                                                  margin: "0 0 1rem",
                                                  fontWeight: 400,
                                    }}
                                  >
                                  Page Not Found
                        </h1>h1>
                
                  {/* Description */}
                        <p
                                    style={{
                                                  fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                                                  fontSize: "1rem",
                                                  color: "var(--text-secondary, #3D4A5C)",
                                                  lineHeight: 1.7,
                                                  margin: "0 0 2.5rem",
                                    }}
                                  >
                                  The page you&apos;re looking for doesn&apos;t exist or has been moved.
                                  Let us help you find your way back.
                        </p>p>
                
                  {/* Buttons */}
                        <div
                                    style={{
                                                  display: "flex",
                                                  gap: "1rem",
                                                  justifyContent: "center",
                                                  flexWrap: "wrap",
                                    }}
                                  >
                          {/* Back to Homepage */}
                                  <Link
                                                href="/"
                                                style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "0.5rem",
                                                                padding: "0.875rem 2rem",
                                                                backgroundColor: "var(--accent, #8B9A7D)",
                                                                color: "#fff",
                                                                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                                                                fontSize: "0.875rem",
                                                                fontWeight: 500,
                                                                letterSpacing: "0.05em",
                                                                textTransform: "uppercase" as const,
                                                                textDecoration: "none",
                                                                borderRadius: "2px",
                                                                transition: "background-color 0.2s ease",
                                                }}
                                              >
                                              Back to Homepage
                                  </Link>Link>
                        
                          {/* WhatsApp contact */}
                                  <a
                                                href="https://wa.me/306932757142"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "0.5rem",
                                                                padding: "0.875rem 2rem",
                                                                backgroundColor: "transparent",
                                                                color: "var(--text, #1A2332)",
                                                                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                                                                fontSize: "0.875rem",
                                                                fontWeight: 500,
                                                                letterSpacing: "0.05em",
                                                                textTransform: "uppercase" as const,
                                                                textDecoration: "none",
                                                                borderRadius: "2px",
                                                                border: "1px solid var(--border, #D1D5DB)",
                                                                transition: "border-color 0.2s ease",
                                                }}
                                              >
                                              Contact Us
                                  </a>a>
                        </div>div>
                </div>div>
          </section>section>
        );
}</section>
