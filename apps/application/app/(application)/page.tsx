import Image from "next/image";
import { ApplicationForm } from "./form";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <TopbarHeader />

            <main
                className="grow bg-[#f6f6f6] py-12"
                style={{
                    background:
                        "linear-gradient(135deg, #F9FAFB 15%, #F3F4F6 85%)",
                }}
            >
                <section className="mx-auto grid max-w-4xl gap-y-6">
                    <div className="font-inter grid gap-y-1 leading-[100%]">
                        <h1 className="text-grey-500 text-[2rem] leading-[110%] font-bold italic">
                            Begin Your Application
                        </h1>
                        <p className="text-grey-300">
                            Fill out the form below to start your application
                            process.
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
        <header className="flex h-24 items-center justify-between bg-white px-10 py-5">
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
            <p className="text-grey-500 text-lg leading-[110%] font-semibold">
                Logos International <br />
                Secondary School
            </p>
        </div>
    );
}

function UserProfileMenu() {
    return (
        <button className="group text-grey-500 flex cursor-pointer items-center rounded-full bg-zinc-50 py-2 pr-3 pl-2 transition-colors duration-300 ease-in-out hover:bg-zinc-100 active:scale-[98%]">
            <Image
                src="/avatar.jpeg"
                alt=""
                width={40}
                height={40}
                className="mr-2.5 h-12 w-12 shrink-0 rounded-full"
            />

            <p className="text-grey-500 mr-1 leading-[110%] font-semibold">
                John Doe
            </p>

            <svg
                viewBox="0 0 24 24"
                fill="#3b3b3b"
                className="text-grey-400 h-6 w-6 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
            >
                <path d="M6.3 8.7a1 1 0 0 1 1.4 0L12 13l4.3-4.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4z" />
            </svg>
        </button>
    );
}
