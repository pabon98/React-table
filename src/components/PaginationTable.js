import React, { useMemo } from "react";
import { useTable , usePagination } from "react-table";
import Mock_Data from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./table.css";

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Mock_Data, []);

  // const tableInstance = useTable({
  //   columns,
  //   data,
  // });
  // const{getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

  const { getTableProps, getTableBodyProps, headerGroups, page,nextPage,previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, state, prepareRow } =
    useTable({
      columns,
      data,
    },
    usePagination
    );
    const {pageIndex, pageSize} = state
  return (
    <div>
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
          {page.map((row) => {
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
       
      </table>
      <div>
          <span>
              Page{''}
              <strong>
                  {pageIndex + 1} of {pageOptions.length}
              </strong> {''}
          </span>
          <span>
              ! Go to page: {''}
              <input type="number" defaultValue={pageIndex + 1}
              onChange={e=>{
                  const PageNumber = e.target.value ? Number(e.target.value) -1 : 0
                  gotoPage(PageNumber)
                  
              }} 
              style={{width: '50px'}}/>
          </span>
          <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
              {
                  [10,25,50].map(pageSize=>(
                      <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                      </option>
                  ))
              }

          </select>
          <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
          <button onClick={()=> gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </div>
  );
};

export default PaginationTable;
