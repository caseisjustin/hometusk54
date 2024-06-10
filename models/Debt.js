import db from "../config/db.js"
const createDebt = async (debtData) => {
    const { amount, description, due_date, status, userId } = debtData;
    return db.one(
        'INSERT INTO debts (amount, description, due_date, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [amount, description, due_date, status, userId]
    );
};

const getDebtsByUserId = async (userId) => {
    return db.any('SELECT * FROM debts WHERE user_id = $1', [userId]);
};

const getDebtById = async (id) => {
    return db.oneOrNone('SELECT * FROM debts WHERE id = $1', [id]);
};

const updateDebt = async (id, debtData) => {
    const { amount, description, due_date, status } = debtData;
    return db.none(
        'UPDATE debts SET amount = $1, description = $2, due_date = $3, status = $4 WHERE id = $5',
        [amount, description, due_date, status, id]
    );
};

const deleteDebt = async (id) => {
    return db.none('DELETE FROM debts WHERE id = $1', [id]);
};

export default {
    createDebt,
    getDebtsByUserId,
    getDebtById,
    updateDebt,
    deleteDebt,
};