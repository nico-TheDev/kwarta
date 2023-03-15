import React from 'react';
import TransactionCard from './TransactionCard';

export default function TransactionCardList({ transactionList }) {
    return transactionList.map((transaction) => <TransactionCard transaction={transaction} key={transaction.id} />);
}
