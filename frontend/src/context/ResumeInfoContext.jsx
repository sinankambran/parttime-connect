// import { createContext } from "react";

// export const ResumeInfoContext=createContext(null);

import React, { createContext, useState } from 'react';

export const ResumeInfoContext = createContext({});

export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState();

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
