import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function getCellStyle(cell: any) {
    return 'object' === typeof cell ? cell.style : null
}

class List extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const props = this.props;
        const headers = props.headers ?? [];
        const headerAlign = props.headerAlign ?? 'left';
        const rows = props.rows ?? [];
        const rowAlign = props.rowAlign ?? 'left';
        const cellStyle = props.cellStyle ?? {};
        const stickyHeader = props.stickyHeader ?? false;
        const head = cellStyle?.head;
        const body = cellStyle?.body;

        delete cellStyle?.head;
        delete cellStyle?.body;

        return (
            <TableContainer>
                <Table stickyHeader={stickyHeader} size="small">
                    <TableHead>
                        <TableRow>
                            {headers.length > 0 && headers.map((header: any) => (
                                <TableCell
                                    key={header}
                                    align={headerAlign}
                                    style={head}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 && rows.map((row: any) => (
                            <TableRow key={row.key} style={row.style}>
                                {row.data && row.data.length > 0 && row.data.map((cell: any) => (
                                    <TableCell
                                        key={cell}
                                        align={rowAlign}
                                        style={{
                                            ...getCellStyle(cell),
                                            ...body,
                                        }}
                                    >
                                        {(function (data) {
                                            return typeof data === 'object' ? data.text : data;
                                        })(cell)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default List;