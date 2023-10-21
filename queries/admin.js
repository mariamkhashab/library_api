getOverDueLoansQuery =
  "select users.name, book.title, transactions.transaction_date, transactions.transaction_state from transactions inner join users on users.id = transactions.userid inner join book on book.id = transactions.bookid where transaction_date::date + due_period +  grace_period <= current_date::date";

module.exports = { getOverDueLoansQuery };
