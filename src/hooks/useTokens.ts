
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  getUserTokenBalance, 
  getTokenTransactions,
  awardTokens,
  spendTokens,
  TokenTransaction,
  TokenBalance
} from '@/services/tokenService';

export const useTokens = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's token balance
  const fetchBalance = useCallback(async () => {
    if (!user) return;
    
    try {
      const balanceData = await getUserTokenBalance(user.id);
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      toast({
        title: "Error",
        description: "Failed to load token balance",
        variant: "destructive"
      });
    }
  }, [user, toast]);

  // Fetch user's transaction history
  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const transactionsData = await getTokenTransactions(user.id);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to load transaction history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Award tokens to the user
  const earnTokens = async (amount: number, description: string) => {
    if (!user) return false;
    
    try {
      const success = await awardTokens(user.id, amount, description);
      
      if (success) {
        toast({
          title: "Success",
          description: `Earned ${amount} CollabCoins: ${description}`,
        });
        
        // Refresh balance and transactions
        await fetchBalance();
        await fetchTransactions();
        return true;
      } else {
        throw new Error('Failed to award tokens');
      }
    } catch (error) {
      console.error('Error earning tokens:', error);
      toast({
        title: "Error",
        description: "Failed to earn tokens",
        variant: "destructive"
      });
      return false;
    }
  };

  // Spend tokens
  const useTokens = async (amount: number, description: string) => {
    if (!user) return false;
    
    try {
      const success = await spendTokens(user.id, amount, description);
      
      if (success) {
        toast({
          title: "Success",
          description: `Spent ${amount} CollabCoins: ${description}`,
        });
        
        // Refresh balance and transactions
        await fetchBalance();
        await fetchTransactions();
        return true;
      } else {
        throw new Error('Failed to spend tokens');
      }
    } catch (error) {
      console.error('Error spending tokens:', error);
      
      // Check if it's an insufficient tokens error
      const errorMessage = error instanceof Error && error.message.includes('Insufficient') 
        ? "Insufficient tokens" 
        : "Failed to spend tokens";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user, fetchBalance, fetchTransactions]);

  return {
    balance,
    transactions,
    loading,
    earnTokens,
    useTokens,
    refreshBalance: fetchBalance,
    refreshTransactions: fetchTransactions
  };
};
