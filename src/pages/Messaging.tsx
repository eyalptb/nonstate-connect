
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Messaging = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Messaging</CardTitle>
          <CardDescription>
            This feature is currently unavailable
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-4 text-center text-muted-foreground">
            The messaging functionality is currently unavailable.
          </p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
