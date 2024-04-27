import { sql } from "@vercel/postgres";
import FLAGS from '../../flags.json'
/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({request}) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name !== 'god') {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${name}`;
			const userExist = usersQuery.rows.length;
			if (!userExist) {
				const insertScore = await sql`INSERT INTO score VALUES (${name}, 0); `;
				const insertFlag = await sql`INSERT INTO flag VALUES (${name}, false, false, false, false, false); `;
				if (!insertScore.rowCount) {
					return {
						success: false,
						message: 'Error inserting user!\nPlease try again!',
					}
				}
				if (!insertFlag.rowCount) {
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
	submit: async ({request}) => {
		const allFlags = FLAGS.FLAGS;
		const formData = await request.formData();
		const user = formData.get('user');
		const flag = formData.get('flag');
		const flagExist = allFlags.findIndex(f => flag.includes(f))
		console.log(`User: ${user}, Flag: ${flag}, Correct: ${flagExist}`);

		if (user !== 'god' && flagExist !== -1) {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${user}`;
			const userExist = usersQuery.rows.length;
			if (!userExist) {
				return {
					success: false,
					message: "User does not exist!",
				}
			}
			
			//check flag db
	
			const newScore = parseInt(usersQuery.rows[0].score) + 100;
			const updateScore = await sql`UPDATE score SET user_id=${user}, score=${newScore} WHERE user_id=${user};`;
			if (!updateScore.rowCount) {
				return {
					success: false,
					message: 'Error inserting user!\nPlease try again!',
				}
			}
			return {
				success: true,
			}
		}
		return {
			sucess: false,
			message: 'Wrong flag!\nPlease try again!',
		}
	}
};
