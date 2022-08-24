import React, { useMemo } from "react";
import { useTable } from "react-table";
import Mock_Data from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import {Checkbox} from './Checkbox'
import "./table.css";

const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_Data, []);

  // const tableInstance = useTable({
  //   columns,
  //   data,
  // });
  // const{getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, allColumns, getToggleHideAllColumnsProps } =
    useTable({
      columns,
      data,
    });
  return (
    <div>
        <div>
            <Checkbox/>
        </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {
            footerGroups.map(footerGroup=>
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column=>
                  <td {...column.getFooterProps}>
                    {
                      column.render('Footer')
                    }
                  </td>
                )}
              </tr>
              )
          }
        </tfoot>
      </table>
    </div>
  );
};

export default ColumnHiding;
