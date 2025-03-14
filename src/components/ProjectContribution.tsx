
import React, { useState } from 'react';
import { useTokens } from '@/hooks/useTokens';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Coins, Award, ArrowRight } from 'lucide-react';

const contributionOptions = [
  {
    id: 'report',
    title: 'Submit a Project Report',
    description: 'Share detailed findings about project progress and outcomes',
    tokens: 50,
    icon: <Award className="h-8 w-8 text-primary" />
  },
  {
    id: 'review',
    title: 'Peer Review',
    description: 'Review and provide feedback on other contributors\' work',
    tokens: 25,
    icon: <Coins className="h-8 w-8 text-primary" />
  }
];

const ProjectContribution = () => {
  const { earnTokens } = useTokens();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [contributionText, setContributionText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !contributionText.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a contribution type and add your content",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    try {
      const option = contributionOptions.find(opt => opt.id === selectedOption);
      if (!option) return;
      
      // In a real app, you would save the contribution to the database here
      // For now, we'll just award tokens
      
      const success = await earnTokens(
        option.tokens,
        `${option.title} contribution`
      );
      
      if (success) {
        setContributionText('');
        setSelectedOption(null);
        toast({
          title: "Contribution Successful",
          description: `You earned ${option.tokens} CollabCoins for your contribution!`
        });
      }
    } catch (error) {
      console.error('Error submitting contribution:', error);
      toast({
        title: "Error",
        description: "Failed to submit your contribution",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Contribute & Earn</CardTitle>
        <CardDescription>
          Share your expertise to earn CollabCoins
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contributionOptions.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer border transition-all ${
                  selectedOption === option.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {option.description}
                      </p>
                      <div className="flex items-center text-sm font-medium">
                        Earn: <Coins className="h-3 w-3 ml-1 mr-1" /> {option.tokens} CollabCoins
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedOption && (
            <div className="space-y-4 pt-4">
              <h3 className="font-medium">Your Contribution</h3>
              <Textarea
                value={contributionText}
                onChange={(e) => setContributionText(e.target.value)}
                placeholder="Enter your contribution here..."
                className="min-h-32"
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button 
          disabled={!selectedOption || !contributionText.trim() || submitting}
          onClick={handleSubmit}
        >
          Submit Contribution {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectContribution;
