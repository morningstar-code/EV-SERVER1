import { CircularProgress, Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import React from "react";

const columns = [
    {
        id: 'action',
        label: 'Action',
    },
    {
        id: 'amount',
        label: 'Amount',
    },
    {
        id: 'timestamp',
        label: 'Timestamp',
    }
];

interface CasinoChipBreakdownModalProps {
    show: boolean;
    handleClose: () => void;
    stateId: number;
}

export default (props: CasinoChipBreakdownModalProps) => {
    const [logs, setLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const getChipLogs = React.useCallback(async () => {
        if (props.show) {
            setLoading(true);
            const results = await nuiAction('ev-casino:ui:getChipLogs', { stateId: props.stateId }, { returnData: [] });
            if (results.meta.ok) {
                setLogs(results?.data ?? []);
                setLoading(false);
            }
        }
    }, [props.show]);

    React.useEffect(() => {
        getChipLogs();
    }, [getChipLogs]);

    return (
        <Dialog open={props.show} onClose={() => props.handleClose()} fullWidth={true}>
            <DialogContent className="modal-container">
                {loading && (
                    <div className="loading-container">
                        <CircularProgress
                            size={50}
                            thickness={2}
                            className="loading-indicator"
                            style={{ color: '#fff' }}
                        />
                    </div>
                )}
                {!loading && logs.length > 0 && (
                    <div className="modal-content">
                        <Text variant="h2" className="header-text">
                            Casino Chip Logs
                        </Text>
                        <TableContainer className="table-container">
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.log} className="log-row">
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align="left">
                                                            {row[column.id]}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={logs.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(+event.target.value);
                                setPage(0);
                            }}
                        />
                    </div>
                )}
                {!loading && logs.length <= 0 && (
                    <div className="empty-logs-container">
                        <Text variant="h2">
                            No individual logs found for this person...
                        </Text>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
};