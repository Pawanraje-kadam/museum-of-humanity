import { useEffect } from 'react';

export const useKeyPress = (targetKey, modifierKey, action) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Convert both to lowercase to ensure 'K' and 'k' both trigger correctly
      const isTargetKey = event.key.toLowerCase() === targetKey.toLowerCase();
      
      // If a modifier key (like 'metaKey' for Cmd or 'ctrlKey' for Ctrl) is required, check for it.
      // If no modifier is required, default to true.
      const hasModifier = modifierKey ? event[modifierKey] : true;
      
      if (isTargetKey && hasModifier) {
        event.preventDefault(); // Prevents default browser behavior (e.g., native search bars)
        action();
      }
    };
    
    // Attach the event listener to the global window object
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function: Removes the listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [targetKey, modifierKey, action]);
};
