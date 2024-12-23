import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Privacy Hub | ${title}`;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}; 