
import React, { useState } from 'react';
import { useTokens } from '@/hooks/useTokens';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Coins, Vote, Badge, Shield, Users } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const marketplaceItems = [
  {
    id: 'premium',
    title: 'Premium Account',
    description: 'Unlock advanced collaboration features and analytics',
    tokens: 500,
    icon: <Shield className="h-8 w-8" />
  },
  {
    id: 'voting',
    title: 'Voting Rights',
    description: 'Get voting power in project decisions and governance',
    tokens: 200,
    icon: <Vote className="h-8 w-8" />
  },
  {
    id: 'badge',
    title: 'Expert Badge',
    description: 'Showcase your expertise with a verified profile badge',
    tokens: 300,
    icon: <Badge className="h-8 w-8" />
  },
  {
    id: 'network',
    title: 'Network Access',
    description: 'Connect with exclusive expert networks and partners',
    tokens: 400,
    icon: <Users className="h-8 w-8" />
  }
];

const TokenMarketplace = () => {
  const { balance, useTokens } = useTokens();
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<typeof marketplaceItems[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!selectedItem) return;
    
    if (balance < selectedItem.tokens) {
      toast({
        title: "Insufficient tokens",
        description: `You need ${selectedItem.tokens} CollabCoins to purchase this item`,
        variant: "destructive"
      });
      setIsDialogOpen(false);
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      const success = await useTokens(
        selectedItem.tokens,
        `Purchased ${selectedItem.title}`
      );
      
      if (success) {
        toast({
          title: "Purchase Successful",
          description: `You've purchased ${selectedItem.title}!`
        });
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error making purchase:', error);
      toast({
        title: "Error",
        description: "Failed to complete the purchase",
        variant: "destructive"
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Token Marketplace</CardTitle>
            <CardDescription>Spend your CollabCoins on premium features</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{balance}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {marketplaceItems.map((item) => (
            <Card key={item.id} className="border overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted/30 flex items-center justify-center p-6">
                  {React.cloneElement(item.icon, { className: "h-12 w-12 text-primary" })}
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Coins className="h-3.5 w-3.5" />
                      <span>{item.tokens}</span>
                    </div>
                    <Dialog open={isDialogOpen && selectedItem?.id === item.id} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) setSelectedItem(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => setSelectedItem(item)}
                          disabled={balance < item.tokens}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Purchase
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Purchase</DialogTitle>
                          <DialogDescription>
                            You are about to purchase {selectedItem?.title} for {selectedItem?.tokens} CollabCoins.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex items-center justify-center bg-muted/30 rounded-lg p-6 mb-4">
                            {selectedItem && React.cloneElement(selectedItem.icon, { className: "h-16 w-16 text-primary" })}
                          </div>
                          <h3 className="font-medium text-lg text-center mb-2">{selectedItem?.title}</h3>
                          <p className="text-sm text-center text-muted-foreground mb-4">{selectedItem?.description}</p>
                          <Separator className="my-4" />
                          <div className="flex justify-between text-sm">
                            <span>Your balance:</span>
                            <span className="font-medium">{balance} CollabCoins</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span>Cost:</span>
                            <span className="font-medium text-destructive">- {selectedItem?.tokens} CollabCoins</span>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between font-medium">
                            <span>Remaining balance:</span>
                            <span>{selectedItem ? balance - selectedItem.tokens : balance} CollabCoins</span>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handlePurchase} disabled={isPurchasing}>
                            Confirm Purchase
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Items purchased with CollabCoins are tied to your account and cannot be transferred
        </p>
      </CardFooter>
    </Card>
  );
};

export default TokenMarketplace;
