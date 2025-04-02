
// Check if we're currently offline
export const isOffline = () => {
  return !navigator.onLine;
};

// Store pending sync operations for when connection is restored
export const storePendingSync = (operation: any) => {
  try {
    const pendingOps = JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
    pendingOps.push({
      ...operation,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('pending_sync_operations', JSON.stringify(pendingOps));
    return true;
  } catch (error) {
    console.error('Failed to store pending sync operation:', error);
    return false;
  }
};

// Get all pending sync operations
export const getPendingSyncOperations = () => {
  try {
    return JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
  } catch (error) {
    console.error('Failed to retrieve pending sync operations:', error);
    return [];
  }
};

// Remove a specific pending sync operation (after successful sync)
export const removePendingSyncOperation = (index: number) => {
  try {
    const pendingOps = JSON.parse(localStorage.getItem('pending_sync_operations') || '[]');
    if (index >= 0 && index < pendingOps.length) {
      pendingOps.splice(index, 1);
      localStorage.setItem('pending_sync_operations', JSON.stringify(pendingOps));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to remove pending sync operation:', error);
    return false;
  }
};
