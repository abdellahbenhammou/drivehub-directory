import { useState, useEffect } from 'react';

export const useSavedSchools = () => {
  const [savedSchools, setSavedSchools] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedSchools');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedSchools', JSON.stringify(savedSchools));
  }, [savedSchools]);

  const toggleSavedSchool = (schoolId: string) => {
    setSavedSchools(prev => 
      prev.includes(schoolId)
        ? prev.filter(id => id !== schoolId)
        : [...prev, schoolId]
    );
  };

  const isSchoolSaved = (schoolId: string) => savedSchools.includes(schoolId);

  return { savedSchools, toggleSavedSchool, isSchoolSaved };
};