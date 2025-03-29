
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const MessagingLayout = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Messaging Unavailable</CardTitle>
          <CardDescription>
            Authentication has been removed from the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The messaging functionality is currently unavailable as it requires authentication,
            which has been temporarily removed from the application.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingLayout;
