import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full top-0 absolute">
        <img 
          className="m-6"
          src="/logo_white.svg"
          alt="Logo"
        />
      </div>
      <div className="w-full h-100">
        <Image 
          src="/AMBER_0007_AMBER_0006_Group 10.jpg"
          alt="Fashion Editorial"
          className="object-cover w-full h-full"
          width={8015}
          height={5017}
        />
      </div>
    </main>
  );
}
