import { sql } from "@vercel/postgres";
import FLAGS from '../../flags.json';
/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({request}) => {
		const formData = await request.formData();
		const name = formData.get('name');
		if (name === 'god') {
			return {
				success: true,
				user: name,
				done: false,
			}
		}
		if (name !== 'god') {
			const usersQuery = await sql`SELECT * from score WHERE user_id=${name};`;
			const userExist = usersQuery.rows.length;
			if (!userExist) {
				const insertScore = await sql`INSERT INTO score VALUES (${name}, 0); `;
				const insertFlag = await sql`INSERT INTO flag VALUES (${name}, false, false, false, false, false);`;
				if (!insertScore.rowCount) {
					return {
						success: false,
						message: 'Error inserting user!\nPlease try again!',
						done: false,
					}
				}
				if (!insertFlag.rowCount) {
					return {
						success: false,
						message: 'Error inserting user!\nPlease try again!',
						done: false,
					}
				}
				return {
					success: true,
					user: name,
					done: false,
				}
			}
			const { score } = usersQuery.rows[0];
			console.log(score)
			if (parseInt(score) >= 500) {
				return {
					success: true,
					user: name,
					done: true,
				}
			}
			return {
				success: true,
				user: name,
				done: false,
			}
		}
	},
	submit: async ({request}) => {
		const allFlags = FLAGS.FLAGS;
		const formData = await request.formData();
		const user = formData.get('user');
		const flag = formData.get('flag');
		const flagExist = allFlags.findIndex(f => flag.includes(f))
		console.log(`User: ${user}, Flag: ${flag}, Correct: ${flagExist}`);
		if (user === 'god' || flagExist === -1) {
			return {
				sucess: false,
				message: 'Wrong flag!\nPlease try again!',
				done: false,
			}
		}

		const usersQuery = await sql`SELECT * from score WHERE user_id=${user};`;
		const userExist = usersQuery.rows.length;
		if (!userExist) {
			return {
				success: false,
				message: "User does not exist!",
				done: false,
			}
		}
		
		//check flag db
		const checkFlag = await sql`SELECT * from flag WHERE user_id=${user};`;
		if (checkFlag.rowCount) {
			let check = checkFlag.rows[0];
			let flagField = `flag${flagExist}`;
			let foundFlag = check[flagField];
			if (foundFlag) {
				return {
					success: false,
					message: 'Flag already found!',
					done: false,
				}
			}
			const updateFlag = await sql.query(`UPDATE flag SET ${flagField}=${true} WHERE user_id='${user}';`);
			if (!updateFlag) {
				return {
					success: false,
					message: 'Error inserting user!\nPlease try again!',
					done: false,
				}
			}
		}

		const newScore = parseInt(usersQuery.rows[0].score);
		const updateScore = await sql`UPDATE score SET score=${newScore} WHERE user_id=${user} RETURNING user_id, score;`;
		if (!updateScore.rowCount) {
			return {
				success: false,
				message: 'Error inserting user!\nPlease try again!',
				done: false,
			}
		}
		console.log(updateScore.rows[0])
		const { score } = updateScore.rows[0];

		if (parseInt(score) >= 500) {
			return {
				success: true,
				message: 'Congratulations on finding all the flags!',
				done: true,
			}
		}
		return {
			success: true,
			message: 'Congratulations, you found one of the flags!',
			done: false,
		}
	}
};
