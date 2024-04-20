import { sql } from "@vercel/postgres";
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({request}) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name !== 'god') {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${name}`;
			const userExist = usersQuery.rows.length
			if (userExist) {
				return {
					success: false,
					message: "User already exist!",
				}
			}
			const insertUser = await sql`INSERT INTO score VALUES (${name}, 0); `;
		}
		return {
			success: true,
			user: name,
		}
	},
	// submitFlag: async ({request}) => {
	// 	const formData = await request.formData();
	// 	const name = formData.get('flag');
	// }
};
