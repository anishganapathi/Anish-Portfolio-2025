'use client';

import React from 'react';
import SplineComponent from './spline';

const HeroM = () => {
  return (
    <div className="h-screen w-full relative flex flex-col items-start justify-center overflow-hidden">
      {/* Spline component container with negative z-index */}
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <SplineComponent />
      </div>
    </div>
  );
};

export default HeroM;
