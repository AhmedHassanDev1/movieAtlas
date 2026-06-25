

import React from 'react'

import { Avatar, Box, styled } from '@mui/material'

export const PrimaryAvatar = styled(Avatar)(() => ({
    width: "20vw",
    height: "20vw",
    maxWidth: 156,
    maxHeight: 156
}));


function UserAvatar({ avatar, user_name }: { avatar: string, user_name: string }) {

    return (
        <Box>
            {avatar ? (
                <PrimaryAvatar src={avatar} />
            ) : (
                <PrimaryAvatar>
                    {user_name?.charAt(0)}
                </PrimaryAvatar>
            )}
        </Box>
    )
}

export default UserAvatar
