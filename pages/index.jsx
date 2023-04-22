import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import Layout from "@/components/Layout";

export default function Home() {
	const { data: session, status } = useSession();
	console.log({ session });
	return (
		<Layout>
			<div className=" text-blue-900 flex justify-between  ">
				<h2>
					Hello, <b>{session?.user?.name} </b>{" "}
				</h2>

				<div className=" flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden">
					<img
						src={session?.user?.image}
						alt="profile pic"
						className=" w-6 h-6"
					/>
					<span className=" px-2">
						{" "}
						<b>{session?.user?.name} </b>{" "}
					</span>
				</div>
			</div>
		</Layout>
	);
}
