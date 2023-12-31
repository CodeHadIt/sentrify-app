import Image from 'next/image'
import Hompage from '@/components/home/hompage'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Hompage />
    </main>
  );
}
