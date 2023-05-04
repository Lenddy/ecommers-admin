import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import EmailProvider from "next-auth/providers/email";

const adminsEmails = ["leme2003@gmail.com"];

export const authOptions = {
	providers: [
		// OAuth authentication providers...
		// AppleProvider({
		// 	clientId: process.env.APPLE_ID,
		// 	clientSecret: process.env.APPLE_SECRET,
		// }),
		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_ID,
		// 	clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// Passwordless / email sign in
		// EmailProvider({
		// 	server: process.env.MAIL_SERVER,
		// 	from: "NextAuth.js <no-reply@example.com>",
		// }),
	],
	adapter: MongoDBAdapter(clientPromise),

	callbacks: {
		session: ({ session, token, user }) => {
			// console.log({ session, token, user });
			if (adminsEmails.includes(session?.user?.email)) {
				// console.log("admin  the email is leme2003@gmail.com  ");
				return session;
			} else {
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req, res) => {
	const session = await getServerSession(req, res, authOptions);
	if (!adminsEmails.includes(session?.user?.email)) {
		throw "not an admin";
	}
};
