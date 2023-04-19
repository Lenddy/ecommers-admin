import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Layout({ children }) {
	const { data: session } = useSession();
	if (!session) {
		console.log(session);
		return (
			<div className={"bg-blue-900 w-screen h-screen flex items-center"}>
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
		<div className="bg-blue-900 min-h-screen flex">
			<Nav />
			<div className="bg-white flex-grow mt-2 mr-2  mb-0 rounded-lg p-4">
				{/* logged in {session.user.email} */}
				{children}
			</div>
			{/* <img src={session.user.image} alt="l" /> */}
			{/* <button onClick={() => signOut()} className=" bg-red-400">
				sign out
			</button> */}
		</div>
	);
}
