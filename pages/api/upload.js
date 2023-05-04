import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
const bucketName = "for-the-ecommerce-photos";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
	await mongooseConnect();
	await isAdminRequest(req, res);

	const form = new multiparty.Form();
	const { fields, files } = await new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) {
				reject(err);
			}
			resolve({ fields, files });
		});
	});
	console.log("length:", files.file.length);
	// console.log(files);
	const client = new S3Client({
		region: "us-east-1",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
		logging: true,
	});

	const links = [];
	for (const file of files.file) {
		const ext = file.originalFilename.split(".").pop();
		const newFileName = `${file.fieldName}-${Date.now()}.${ext}`; // `${Date.now()}.${ext}` //   you may want to change this  go to 2:34:30 in the video line 23 to see how to do it
		// console.log("ext:", ext);
		await client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: newFileName,
				Body: fs.readFileSync(file.path),
				ACL: "public-read",
				ContentType: mime.lookup(file.path),
			})
		);
		const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
		links.push(link);
	}

	return res.json({ links });
}

export const config = {
	api: { bodyParser: false },
};
