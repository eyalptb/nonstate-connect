
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useInitialDataLoad = <T>(
  user: any,
  fetchOnlineData: () => Promise<T>,
  loadFromLocalStorage: () => T | null,
  saveToLocalStorage: (data: T) => boolean,
  setData: (data: T | null) => void,
  setLastSynced: (date: Date | null) => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      // First try to load from local storage
      const localData = loadFromLocalStorage();
      
      if (localData) {
        setData(localData);
      }
      
      // If online, fetch the latest data
      if (navigator.onLine) {
        try {
          const onlineData = await fetchOnlineData();
          setData(onlineData);
          saveToLocalStorage(onlineData);
          setLastSynced(new Date());
        } catch (error) {
          console.error('Error fetching online data:', error);
          toast({
            title: "Sync Failed",
            description: "Using cached data. Will try again later.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Offline Mode",
          description: "Using cached data. Changes will sync when you're back online.",
        });
      }
    };
    
    loadData();
  }, [user, fetchOnlineData, loadFromLocalStorage, saveToLocalStorage, setData, setLastSynced, toast]);
};
