import React from 'react';
import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

const RepoTable = ({ repos, source }) => {
    if (!repos || repos.length === 0) {
        return
    }

    return (
        <TableContainer>
            <Table>
                <Tr>
                    <Th>Repository Names</Th>
                </Tr>
                <Thead></Thead>
                <Tbody>
                    {repos.map(repo => (
                        <Tr key={repo.full_name}>
                            <Td>{repo.full_name}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
export default RepoTable