-- Create Sequence
CREATE SEQUENCE expense_seq START WITH 1 INCREMENT BY 1;

-- Stored Procedure for Calculating Expenses
CREATE PROCEDURE calculate_event_expenses(IN eventId INT, OUT totalExpense FLOAT)
BEGIN
    SELECT SUM(amount) INTO totalExpense
    FROM Expenses
    WHERE event_id = eventId;
END;

-- Trigger to Update Total Expense
CREATE TRIGGER update_total_expense
AFTER INSERT ON Expenses
FOR EACH ROW
BEGIN
    CALL calculate_event_expenses(NEW.event_id, @totalExpense);
    UPDATE Events SET total_expense = @totalExpense WHERE event_id = NEW.event_id;
END;
