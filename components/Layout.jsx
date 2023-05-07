import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./logo";

export default function Layout({ children }) {
	const [showNav, setShowNav] = useState(false);
	const { data: session } = useSession();
	if (!session) {
		console.log(session);
		return (
			<div className="bg-gray-200 w-screen h-screen flex items-center">
				<div className="text-center w-full">
					<button
						className="bg-white p-2  px-4 rounded-lg"
						onClick={() => signIn("google")}
					>
						Login with Google
					</button>
				</div>
			</div>
		);
	}
	return (
		<div className="bg-gray-200 min-h-screen">
			<div className=" md:hidden flex items-center  p-4 ">
				<button onClick={() => setShowNav(true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
						/>
					</svg>
				</button>
				<div className="flex grow  justify-center mr-6">
					<Logo />
				</div>
			</div>

			<div className=" flex">
				<Nav show={showNav} />
				<div className="flex-grow  bg-white  mt-2 mr-2  mb-0 rounded-lg p-4">
					{children}
				</div>
			</div>
		</div>
	);
}
