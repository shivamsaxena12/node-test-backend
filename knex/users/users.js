module.exports = {
  getUserById: async (id, knex) => {
    const [user] = await knex("users").select("*").where({ id });

    return user;
  },
};
