import { useState } from 'react';

export default function useVoteData() {
    const [votes, setVotes] = useState([]) as any;

    const createVote = () => {
        setVotes([...votes, { statement: '', options: [] }]);
    };

    const updateVote = (vote: any, index: number) => {
        setVotes([
            ...votes.slice(0, index),
            vote,
            ...votes.slice(index + 1)
        ]);
    };

    const deleteVote = (index: number) => {
        setVotes([
            ...votes.slice(0, index),
            ...votes.slice(index + 1)
        ]);
    }

    return { votes, createVote, updateVote, deleteVote };
}
