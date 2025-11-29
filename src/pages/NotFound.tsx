import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-semibold">Page Not Found</p>
        <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist in Kiro Finance.</p>
        <a 
          href="/" 
          className="inline-block rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
