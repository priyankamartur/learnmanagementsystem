import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="text-xl font-bold text-foreground">Page Not Found</p>
        <p className="text-xs text-muted-foreground">
          The page <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">{location.pathname}</code> does not exist.
        </p>
        <Button asChild className="gradient-primary text-primary-foreground font-bold">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
