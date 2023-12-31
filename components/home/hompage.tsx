import React from 'react'
import AddProjectForm from '../forms/form'
import { Chrome, Github} from 'lucide-react';
import Link from 'next/link';

const Hompage = () => {
  return (
    <div className="flex flex-col text-center items-center gap-8">
      <div className="space-y-2">
        <h1 className="text-7xl">
          Welcome to <span className="text-primary font-bold">SENTRIFY.</span>
        </h1>
        <p>
          Verify the{" "}
          <span className="text-primary font-bold">authenticity</span> of any
          Web3 Dapp url.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Chrome className="text-primary" />
        </Link>
        <Link href="/">
          <Github className="text-primary" />
        </Link>
      </div>
    </div>
  );
}

export default Hompage