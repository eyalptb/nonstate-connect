
import React, { useState } from 'react';
import { useTokens } from '@/hooks/useTokens';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Coins, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TokenWallet = () => {
  const { user } = useAuth();
  const { balance, transactions, loading, refreshBalance, refreshTransactions } = useTokens();
  const [activeTab, setActiveTab] = useState('balance');

  const handleRefresh = () => {
    refreshBalance();
    refreshTransactions();
  };

  // If not authenticated, show a sign-in prompt
  if (!user) {
    return (
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">CollabCoin Wallet</CardTitle>
          <CardDescription>Your tokenized incentives</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Coins className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Sign in to view your wallet</h3>
          <p className="text-muted-foreground mb-6 text-center">
            Create an account or sign in to access your CollabCoins and transaction history.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">CollabCoin Wallet</CardTitle>
            <CardDescription>Your tokenized incentives</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="balance" className="pt-4">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex items-center mb-2">
                <Coins className="mr-2 h-6 w-6 text-yellow-500" />
                <span className="text-3xl font-bold">{balance}</span>
              </div>
              <p className="text-muted-foreground text-sm">CollabCoins</p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Token Type</p>
                  <p className="font-medium">ERC-20</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Network</p>
                  <p className="font-medium">Polygon</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="pt-4">
            {loading ? (
              <div className="text-center py-8">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transaction history yet
              </div>
            ) : (
              <ul className="space-y-4">
                {transactions.map((tx) => (
                  <li key={tx.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <Badge variant={tx.transaction_type === 'earn' ? 'outline' : 'secondary'} className={
                        tx.transaction_type === 'earn' 
                          ? 'border-green-200 bg-green-50 text-green-700' 
                          : 'border-red-200 bg-red-50 text-red-700'
                      }>
                        {tx.transaction_type === 'earn' ? '+' : '-'}{tx.amount}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
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
