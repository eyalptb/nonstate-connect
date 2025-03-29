
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';

export const TokenWallet = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">CollabCoin Wallet</CardTitle>
        <CardDescription>Your tokenized incentives</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Coins className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">CollabCoin Wallet</h3>
        <p className="text-muted-foreground mb-6 text-center">
          View your CollabCoins and transaction history.
        </p>
        <div className="flex items-center mb-2">
          <Coins className="mr-2 h-6 w-6 text-yellow-500" />
          <span className="text-3xl font-bold">0</span>
        </div>
        <p className="text-muted-foreground text-sm">CollabCoins</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          CollabCoins can be earned through collaboration and spent on premium features
        </p>
      </CardFooter>
    </Card>
  );
};

export default TokenWallet;
