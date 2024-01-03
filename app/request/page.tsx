import React from 'react'
import AddProjectForm from '@/components/forms/form'

const RequestPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <AddProjectForm formType='request' />
    </section>
  );
}

export default RequestPage