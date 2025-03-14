
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type TokenTransaction = {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  transaction_type: 'earn' | 'spend';
  created_at: string;
};

export type TokenBalance = {
  balance: number;
  last_updated: string;
};

// Get user's token balance
export const getUserTokenBalance = async (userId: string): Promise<TokenBalance> => {
  try {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('balance, last_updated')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    
    return data || { balance: 0, last_updated: new Date().toISOString() };
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return { balance: 0, last_updated: new Date().toISOString() };
  }
};

// Get user's token transaction history
export const getTokenTransactions = async (userId: string): Promise<TokenTransaction[]> => {
  try {
    const { data, error } = await supabase
      .from('token_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching token transactions:', error);
    return [];
  }
};

// Award tokens to a user
export const awardTokens = async (
  userId: string, 
  amount: number, 
  description: string
): Promise<boolean> => {
  try {
    // First, create the transaction record
    const { error: transactionError } = await supabase
      .from('token_transactions')
      .insert({
        user_id: userId,
        amount,
        description,
        transaction_type: 'earn'
      });
    
    if (transactionError) throw transactionError;
    
    // Then, update the user's balance
    const { data: currentBalance } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    const newBalance = (currentBalance?.balance || 0) + amount;
    
    const { error: updateError } = await supabase
      .from('user_tokens')
      .upsert({
        user_id: userId,
        balance: newBalance,
        last_updated: new Date().toISOString()
      });
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error awarding tokens:', error);
    return false;
  }
};

// Spend tokens 
export const spendTokens = async (
  userId: string, 
  amount: number, 
  description: string
): Promise<boolean> => {
  try {
    // First, get current balance
    const { data: currentBalance } = await supabase
      .from('user_tokens')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    const balance = currentBalance?.balance || 0;
    
    // Check if user has enough tokens
    if (balance < amount) {
      throw new Error('Insufficient tokens');
    }
    
    // Create the transaction record
    const { error: transactionError } = await supabase
      .from('token_transactions')
      .insert({
        user_id: userId,
        amount,
        description,
        transaction_type: 'spend'
      });
    
    if (transactionError) throw transactionError;
    
    // Update the user's balance
    const newBalance = balance - amount;
    
    const { error: updateError } = await supabase
      .from('user_tokens')
      .upsert({
        user_id: userId,
        balance: newBalance,
        last_updated: new Date().toISOString()
      });
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error spending tokens:', error);
    return false;
  }
};
