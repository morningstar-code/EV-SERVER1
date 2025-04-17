import React, { FunctionComponent } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Input from '../../../../../../../components/input/input';
import Button from '../../../../../../../components/button/button';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';

const columns = [
    {
        id: 'log',
        label: 'Log',
        minWidth: 300,
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 100,
    },
];

interface LogsModalProps {
    show: boolean;
    handleClose: () => void;
    groups?: StreetGangGroup[];
}

const LogsModal: FunctionComponent<LogsModalProps> = (props) => {
    const classes = useStyles();
    const [group, setGroup] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const staffFetchGangLogs = React.useCallback(async () => {
        if (group !== '') {
            setLoading(true);
            const result = await nuiAction('ev-gangsystem:ui:staffFetchGangLogs', { groupId: group }, { returnData: {
                logs: [
                    {
                        log: 'my log',
                        date: 1324171354,
                    },
                    {
                        log: 'my log',
                        date: 1324171354,
                    }
                ]
            } });

            if (result.meta.ok) {
                setRows(result?.data?.logs ?? []);
                setLoading(false);
            }
        } 
    }, [group]);

    React.useEffect(() => {
        staffFetchGangLogs();
    }, [staffFetchGangLogs, group]);

    return (
        <Dialog open={props.show} onClose={() => props.handleClose()} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogContent className={classes.modalContent}>
                <Typography variant="h2" className={classes.headerText}>Gang Logs</Typography>
                <Input.Select
                    label="Group"
                    items={props.groups}
                    onChange={(e) => setGroup(e.target.value)}
                    value={group}
                />
                {loading ? (
                    <Typography variant="h2" className={classes.noLogs}>
                        Loading...
                    </Typography>
                ) : (
                    <>
                        <TableContainer
                            style={{
                                maxHeight: 300,
                                marginTop: '1rem'
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead
                                    style={{
                                        background: '#0b604a'
                                    }}
                                >
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                                style={{
                                                    minWidth: column.minWidth
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align="left">
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {rows.length === 0 && !loading && (
                            <Typography variant="h2" className={classes.noLogs}>
                                No Logs Found
                            </Typography>
                        )}
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, value) => setPage(value)}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(+e.target.value);
                                setPage(0);
                            }}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default LogsModal;