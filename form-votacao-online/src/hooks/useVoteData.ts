import { useState } from 'react';

type VoteType = {
    statement: string,
    voteOptions: {
        option: string,
        count: number
    }[]
}

export default function useVoteData() {
    const [votes, setVotes] = useState<VoteType[]>([]);

    const createVote = () => {
        setVotes([...votes, { statement: '', voteOptions: [] }]);
    };

    const updateVote = (vote: VoteType, index: number) => {
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
