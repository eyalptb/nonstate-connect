
// Support for offline messaging operations

/**
 * Queue messages for sending when back online
 */
export const queueMessageForSending = (message: any) => {
  const queue = JSON.parse(localStorage.getItem('message_queue') || '[]');
  queue.push(message);
  localStorage.setItem('message_queue', JSON.stringify(queue));
};

/**
 * Check for and send queued messages
 */
export const processPendingMessages = async (sendFn: (message: any) => Promise<any>) => {
  const queue = JSON.parse(localStorage.getItem('message_queue') || '[]');
  if (queue.length === 0) return;

  const failedMessages = [];
  
  for (const message of queue) {
    try {
      await sendFn(message);
    } catch (error) {
      console.error('Failed to send queued message:', error);
      failedMessages.push(message);
    }
  }

  localStorage.setItem('message_queue', JSON.stringify(failedMessages));
  return queue.length - failedMessages.length; // Return count of successfully sent messages
};
