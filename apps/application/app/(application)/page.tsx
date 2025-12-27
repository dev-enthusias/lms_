import Image from "next/image";
import { ApplicationForm } from "./form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopbarHeader />

      <main className="bg-[#f6f6f6] grow py-12" style={{ background: "linear-gradient(135deg, #F9FAFB 15%, #F3F4F6 85%)" }}>
        <section className="mx-auto grid gap-y-6 max-w-4xl">
          <div className="font-inter leading-[100%] grid gap-y-1">
            <h1 className="font-bold text-[2rem] leading-[110%] text-grey-500 italic">
              Begin Your Application
            </h1>
            <p className="text-grey-300">
              Fill out the form below to start your application process.
            </p>
          </div>

          <ApplicationForm />
        </section>
      </main>
    </div>
  );
}

function TopbarHeader() {
  return (
    <header className="bg-white h-24 items-center flex px-10 py-5 justify-between ">
      <Logo />
      <UserProfileMenu />
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-x-1.5">
      <Image
        src="/logo.png"
        alt=""
        width={64}
        height={64}
        className="h-16 w-16"
      />
      <p className="font-semibold text-lg text-grey-500 leading-[110%]">
        Logos International <br />
        Secondary School
      </p>
    </div>
  );
}

function UserProfileMenu() {
  return (
    <button className="flex group items-center active:scale-[98%] text-grey-500 hover:bg-zinc-100 bg-zinc-50 rounded-full cursor-pointer pl-2 pr-3 py-2 transition-colors duration-300 ease-in-out">
      <Image
        src="/avatar.jpeg"
        alt=""
        width={40}
        height={40}
        className="h-12 w-12 rounded-full shrink-0 mr-2.5"
      />

      <p className="font-semibold text-grey-500 leading-[110%] mr-1">
        John Doe
      </p>

      <svg
        viewBox="0 0 24 24"
        fill="#3b3b3b"
        className="h-6 w-6 text-grey-400 opacity-0 group-hover:opacity-100 transition-opacity group-focus-visible:opacity-100 duration-300 ease-in-out"
      >
        <path d="M6.3 8.7a1 1 0 0 1 1.4 0L12 13l4.3-4.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4z" />
      </svg>
    </button>
  );
}

function PreviewApplicationSlip() {
  return (
    <div className="w-full overflow-x-auto">
      <article className="bg-white mx-auto p-6 w-full max-w-[595px] print:w-[210mm] print:min-h-[297mm]">
        {/* Slip content */}
      </article>
    </div>
  );
}
