import React, { useState, useEffect } from 'react'

export default function useSetError(error) {
    const [customError, setCustomError] = useState(null)

    useEffect(() => {
        setCustomError(error);
        const id = setTimeout(() => {
          setCustomError("");
        }, 3000);
    
        return () => clearTimeout(id);
      }, [error])

  return {customError}
}
