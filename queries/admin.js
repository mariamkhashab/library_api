const getOverDueLoansQuery =
  "select users.name, book.title, transactions.transaction_date, transactions.transaction_state from transactions inner join users on users.id = transactions.userid inner join book on book.id = transactions.bookid where transaction_date::date + due_period +  grace_period <= current_date::date";

const isAdmin =
  "select *from auth right join users on users.id = userID where userID = $1 and roleID = 1";
module.exports = { getOverDueLoansQuery, isAdmin };
