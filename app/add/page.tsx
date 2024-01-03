'use client'
import React, { useState } from 'react'
import AddProjectForm from '@/components/forms/form'
import PassForm from '@/components/forms/passForm'

const AddProjectPage = () => {
  const [isCorrectKey, setIsCorrectKey] = useState<boolean>(false); 

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isCorrectKey ? (
        <PassForm setIsCorrectKey={setIsCorrectKey} />
      ) : (
        <AddProjectForm formType='create' />
      )}
    </section>
  );
}

export default AddProjectPage