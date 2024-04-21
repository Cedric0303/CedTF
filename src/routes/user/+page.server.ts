import { sql } from "@vercel/postgres";
import FLAGS from '../../flags.json'
/** @type {import('./$types').Actions} */
export const actions = {
	createUser: async ({request}) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name !== 'god') {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${name}`;
			const userExist = usersQuery.rows.length;
			if (!userExist) {
				const insertUser = await sql`INSERT INTO score VALUES (${name}, 0); `;
				if (!insertUser.rowCount) {
					return {
						success: false,
						message: 'Error inserting user!\nPlease try again!',
					}
				}
			}
		}
		return {
			success: true,
			user: name,
		}
	},
	submitFlag: async ({request}) => {
		const allFlags = FLAGS.FLAGS;
		const formData = await request.formData();
		const user = formData.get('user');
		const flag = formData.get('flag');
		const flagExist = (allFlags.some(f => flag.includes(f)))
		console.log(`User: ${user}, Flag: ${flag}, Correct: ${flagExist}`);
		if (user !== 'god' && flagExist) {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${user}`;
			const userExist = usersQuery.rows.length;
			if (!userExist) {
				return {
					success: false,
					message: "User does not exist!",
				}
			}
			const updateScore = await sql`UPDATE score SET score = score + 100 WHERE user_id = '${user}';`;
			if (!updateScore.rowCount) {
				return {
					success: false,
					message: 'Error inserting user!\nPlease try again!',
				}
			}
		}
		if (user === 'god' || !flagExist) {
			return {
				sucess: false,
				message: 'Wrong flag!\nPlease try again!',
			}
		}
	}
};
