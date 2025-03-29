
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Authentication Removed</CardTitle>
          <CardDescription>Authentication has been completely removed</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The authentication system has been temporarily removed as requested.</p>
          <Button onClick={handleNavigateHome}>Return to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
